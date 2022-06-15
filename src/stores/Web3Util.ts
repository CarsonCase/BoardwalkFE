import Web3 from "web3";
import Treasury from "../../smartContractDeployments/rinkeby/Treasury.json";
import IERC20 from "../../smartContractDeployments/rinkeby/GovernanceToken.json";
import StrategyFactory from "../../smartContractDeployments/rinkeby/ETHHODLStrategy.json";
import type { AbiItem } from "web3-utils";
import { ref } from "vue";
import type { Contract } from "web3-eth-contract";
import type { Strategy } from "@/model/Strategy";
import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import BN from "bn.js";

const SWAPS_ADDRESS = "0x02A71165447028cA575990416aBb6E10350225c4";

class Web3Util {
    public isWeb3Loaded = ref(false);
    public web3LoadedError = ref<Error | null>(null);

    public isWalletConnected = ref(false);
    public walletConnectedError = ref<Error | null>(null);

    private web3: Web3 | null = null;
    private userAddress: string | null = null;
    private treasuryContract: Contract | null = null;
    private stableCoinContract: Contract | null = null;

    public async initWeb3() {
        const web3 = await this.getWeb3();
        const accounts = await web3.currentProvider.request({ method: "eth_accounts" });
        if (accounts[0]) {
            // wallet is already connected, mark as such
            await this.connectWallet();
        }
    }

    public async connectWallet() {
        try {
            const web3 = await this.getWeb3();
            const accounts = await web3.currentProvider.request({ method: "eth_requestAccounts" });
            this.isWalletConnected.value = true;
            this.walletConnectedError.value = null;
            this.userAddress = accounts[0];
        } catch (e) {
            if (e.code === 4001) {
                this.isWalletConnected.value = false;
                this.walletConnectedError.value = new Error("Connection Rejected, retry and approve the connection next time.");
                throw this.walletConnectedError.value;
            } else if (e instanceof Error) {
                this.isWalletConnected.value = false;
                this.walletConnectedError.value = e;
                throw e;
            } else {
                console.error("Unexpected error in connecting wallet");
                console.error(e);
                this.isWalletConnected.value = false;
                this.walletConnectedError.value = new Error("Unexpected Error");
                throw e;
            }
        }
    }

    public async getStrategyContractInstance(strat: Strategy) {
        const web3 = await this.getWeb3();

        return new web3.eth.Contract((StrategyFactory.abi as AbiItem[]), strat.address);
    }

    public async getAllowanceForStrategy(strat: Strategy) {
        const stableCoinContract = await this.getStableCoinContract();
        return await stableCoinContract.methods.allowance(this.userAddress, strat.address).call();
    }

    private async getWeb3() {
        if (this.web3) {
            return this.web3;
        } else {
            const web3 = await this.loadWeb3();
            if (web3) {
                this.web3 = web3;
                this.isWeb3Loaded.value = true;
                return this.web3;
            } else {
                this.isWeb3Loaded.value = false;
                this.web3LoadedError.value = new Error("No Ethereum support detected in browser. Consider using MetaMask!");
                throw this.web3LoadedError.value;
            }
        }
    }

    private async getTreasuryContract() {
        if (this.treasuryContract) {
            return this.treasuryContract;
        }
        try {
            const web3 = await this.getWeb3();
            this.treasuryContract = new web3.eth.Contract((Treasury.abi as AbiItem[]), Treasury.address);
            return this.treasuryContract;
        } catch (e) {
            console.error(e);
            throw new Error("Unable to create Treasury Contract instance");
        }
    }

    private async getStableCoinContract() {
        if (this.stableCoinContract) {
            return this.stableCoinContract;
        }
        try {
            const web3 = await this.getWeb3();
            const stableCoinAddress = await (await this.getTreasuryContract()).methods.stablecoin().call();
            this.stableCoinContract = new web3.eth.Contract((IERC20.abi as AbiItem[]), stableCoinAddress);
        } catch (e) {
            console.error(e);
            throw new Error("Unable to create Stable Coin Contract instance");
        }

        return this.stableCoinContract;
    }

    private async loadWeb3() {
        if ((window as any).ethereum) {
            const web3 = new Web3((window as any).ethereum);
            (window as any).web3 = web3;
            return web3;
        } else if ((window as any).web3) {
            const web3 = new Web3((window as any).web3.currentProvider);
            (window as any).web3 = web3;
            return web3;
        } else {
            return null;
        }
    }

    public async createSuperFluidFlow(amount: string, stratContract: Contract) {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        const web3 = await this.getWeb3();

        const signer = provider.getSigner();
        console.log("createFlow Amount: ", web3.utils.toWei(amount).toString())
        const flowRate = await stratContract.methods.getFlowRate(web3.utils.toWei(amount)).call();

        const chainId = await (window as any).ethereum.request({ method: "eth_chainId" });
        const sf = await Framework.create({
            chainId: Number(chainId),
            provider: provider
        });
        const DAIxContract = await sf.loadSuperToken("fDAIx");
        const DAIx = DAIxContract.address;
        try {
            const createFlowOperation = sf.cfaV1.createFlow({
                receiver: SWAPS_ADDRESS,
                flowRate: flowRate,
                superToken: DAIx
            });
            console.log("Creating your stream...");
            const result = await createFlowOperation.exec(signer);
            console.log(result);

            console.log(
                `Congrats - you've just created a money stream!
                View Your Stream At: https://app.superfluid.finance/dashboard/${SWAPS_ADDRESS}
                Network: Kovan
                Super Token: DAIx
                Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
                Receiver: ${SWAPS_ADDRESS},
                FlowRate: ${flowRate}
                `
            );
        } catch (error) {
            console.log("Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!");
            console.error(error);
            throw error;
        }
    }

    public async approveSwap(strategyAddress: string) {
        const stableCoinContract = await this.getStableCoinContract();
        const largestUint256 = new BN(2).pow(new BN(256)).sub(new BN(1)).toString();
        await stableCoinContract.methods.approve(strategyAddress, largestUint256)
            .send({ from: this.userAddress });
    }

    public async buySwap(strategyContract: Contract, amount: string) {
        console.log("BuySwap Amount: ", amount.toString());
        await strategyContract.methods.buySwap(amount).send({ from: this.userAddress });
    }

    public async getTotalValueInSwaps() {
        const treasuryContract = await this.getTreasuryContract();
        const stableCoinContract = await this.getStableCoinContract();
        const balance = await stableCoinContract.methods.balanceOf(treasuryContract._address).call();
        return Web3.utils.fromWei(balance);
    }

    public async getUserAvailableCollateral() {
        const treasuryContract = await this.getTreasuryContract();
        const availableCollateral = await treasuryContract.methods.availableCollateral(this.userAddress).call();
        return availableCollateral;
    }
}

export default new Web3Util();
