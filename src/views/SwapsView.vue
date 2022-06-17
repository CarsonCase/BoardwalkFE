<script setup lang="ts">
import WalletConnectionInit from "@/components/WalletConnectionInit.vue";
import { ref, watch, watchEffect } from "vue";
import { Strategy } from "@/model/Strategy";
import SwapCard from "@/components/SwapCard.vue";
import Web3Util from "@/stores/Web3Util";

const strategies = ref([
    new Strategy("ETH Holding", "0xC87E8550E55CC1dB0EB9c35518D0C356c34165A1")
]);
const availableCollateral = ref<string | null>(null);

watchEffect(async () => {
    const isConnected = Web3Util.isWalletConnected.value;
    if (isConnected) {
        try {
            availableCollateral.value = await Web3Util.getUserAvailableCollateral();
        } catch (e) {
            console.error(e);
        }
    }
});
</script>

<template>
    <div class="px-4 py-3 text-center" style="background-color: var(--boardwalk-blue)">
        <h1 class="display-5 fw-bold text-light" style="text-shadow: -2px 2px black;">Swap Trading</h1>
        <div class="col-lg-6 mx-auto">
            <p class="lead fw-bold">View available strategies below</p>
        </div>
    </div>

    <div class="container-lg">
        <h2 v-if="!Web3Util.isWalletConnected.value" class="my-3">Connect wallet to view & start trading swaps</h2>
        <h3> What's going on here? </h3>
        <p class="lead">This is an example swap running on the Rinkeby Testnet. This swap is issued on a plain ETH investment. But note that swaps can be issued on any 
        strategy ranging from simple eth holding like this to complex yearn vault style governance submitted strategies.
        
        Swap payments are made using Superfluid, a protocol that allows special wrapped stablecoins to stream steadily overtime according to an rate, in this case the APR.</p>
        <p>click <a href="https://app.superfluid.finance/dashboard">here</a> to get your xDAI tokens needed to stream your swap payments. Note you can also see your active streams here and cancel them.
        <p>Those xDAI tokens are also used to provide your minimum 10% collateral. We use 10% mimum collateral for ETH Holding here as it was showin in a Value At Risk model to be sufficent in 95% of market conditions.</p>
        <p>Now set up a swap! You will need to connect your wallet, decide the amount of ETH you want to purchase a swap on, start a stream, approve collateral, then begin the swap </p>
        <p>Now it's time to change the price of the ETH (wish we could do that on mainnet huh?) You can see the current price of 1 (1e18) ETH (in xDAI) and change it <a href="https://rinkeby.etherscan.io/address/0x80cf0e0d515f78cD6EDE4D0F07F0C574BeC09664#readContract">here</a>
        <P>A swap is settled upon termination. Either party may terminate it, but for testing we let you do it. Head back to the superfluid dashboard and cancel your swap. The resulting tx should include your settlement, or reduce your colalteral in the treasury contract <a href="https://rinkeby.etherscan.io/address/0x512a98Fc56fE78d88B837883b47192c0DE4D7831#readContract">seen here</a></p>
        <WalletConnectionInit />
        <div v-if="availableCollateral">
            <div class="card col-md-6 col-xl-4 my-3">
                <div class="card-body">
                    <h4 v-if="Web3Util.isWalletConnected.value" class="mb-0">
                        Available Collateral: ${{ availableCollateral }}
                    </h4>
                </div>
            </div>
        </div>

        <div v-if="Web3Util.isWalletConnected.value">
            <div class="row">
                <div class="col-md-6 col-xl-4">
                    <SwapCard :strategy="strategies[0]" />
                </div>
            </div>
        </div>
    </div>
</template>
