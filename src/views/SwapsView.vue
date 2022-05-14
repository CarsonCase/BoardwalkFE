<script setup lang="ts">
import WalletConnectionInit from "@/components/WalletConnectionInit.vue";
import { ref } from "vue";
import { Strategy } from "@/model/Strategy";
import SwapCard from "@/components/SwapCard.vue";

const strategies = ref([
    new Strategy("ETH Holding", "0x4e706CbbE94B2867BA35A989fbe9859bEC045759")
]);
</script>

<template>
    <div class="container-lg">
        <h1>This is the Swaps view</h1>
        <WalletConnectionInit />
    </div>
    <div class="container-lg">
        <div class="row">
            <div class="col-4">
                <SwapCard :strategy="strategies[0]" />
            </div>
        </div>
    </div>
</template>
