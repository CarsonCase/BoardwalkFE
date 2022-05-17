<script setup lang="ts">
import WalletConnectionInit from "@/components/WalletConnectionInit.vue";
import { ref } from "vue";
import { Strategy } from "@/model/Strategy";
import DummySwapCard from "@/components/DummySwapCard.vue";
import Web3Util from "@/stores/Web3Util";

const strategies = ref([
    new Strategy("ETH Holding", "0x4e706CbbE94B2867BA35A989fbe9859bEC045759")
]);
const availableCollateral = ref<string | null>("15");
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
                    <DummySwapCard :strategy="strategies[0]" />
                </div>
            </div>
        </div>
    </div>
</template>
