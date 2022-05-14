<script setup lang="ts">
import { ref } from "vue";
import Web3Util from "@/stores/Web3Util";

const error = ref<string | null>(null);

async function connectWallet() {
    try {
        await Web3Util.connectWallet();
    } catch (e) {
        if (e instanceof Error) {
            error.value = e.message;
        } else {
            error.value = String(e);
        }
    }
}
</script>

<template>
    <h2 v-if="!error">Connect Wallet to start using Swaps</h2>
    <template v-if="error">
        <h2>Could not connect to wallet:</h2>
        <h3>{{error}}</h3>
    </template>
    <template v-if="Web3Util.isWalletConnected.value">
        <h2>Connected to Wallet</h2>
    </template>
    <button @click="connectWallet" v-if="!error" type="button" class="btn btn-primary">
        Connect Wallet
    </button>
    <button @click="connectWallet" v-if="error" type="button" class="btn btn-warning">
        Retry Connect Wallet
    </button>
</template>
