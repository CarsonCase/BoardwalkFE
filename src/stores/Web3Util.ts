import Web3 from "web3";
import Treasury from "../../smartContractDeployments/rinkeby/Treasury.json";
import type { AbiItem } from "web3-utils";
import { ref } from "vue";
import type { Contract } from "web3-eth-contract";

class Web3Util {
    public isWeb3Loaded = ref(false);
    public web3LoadedError = ref<Error | null>(null);

    public isWalletConnected = ref(false);
    public walletConnectedError = ref<Error | null>(null);

    private web3: Web3 | null = null;
    private userAddress: string | null = null;
    private treasuryContract: Contract | null = null;

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

    public async connectWallet() {
        try {
            const { address, treasuryContract } = await this.loadBlockchainData();
            this.isWalletConnected.value = true;
            this.walletConnectedError.value = null;
            this.userAddress = address;
            this.treasuryContract = treasuryContract;
        } catch (e) {
            if (e instanceof Error) {
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

    private async loadWeb3() {
        //not sure if attaching to window is needed, keeping for now
        if ((window as any).ethereum) {
            const web3 = new Web3((window as any).ethereum);
            (window as any).web3 = web3;
            await (window as any).ethereum.enable(); // hangs here waiting for user action. if metamask is X'ed out then this call fails when repeated.
            return web3;
        } else if ((window as any).web3) {
            const web3 = new Web3((window as any).web3.currentProvider);
            (window as any).web3 = web3;
            return web3;
        } else {
            return null;
        }
    }

    private async loadBlockchainData() {
        const web3 = await this.getWeb3();
        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];
        const treasuryContract = new web3.eth.Contract((Treasury.abi as AbiItem[]), Treasury.address);

        return { address, treasuryContract };
    }
}

export default new Web3Util();
