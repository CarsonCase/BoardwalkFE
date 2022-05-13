<script setup lang="ts">
import { ref } from "vue";
import Web3 from "web3";

const error = ref<string | null>(null);
const connected = ref(false);

async function connectWallet() {
    const web3 = await loadWeb3();
    if (!web3) {
        error.value = "No Ethereum support detected in browser. Consider using MetaMask!";
        return;
    }
    error.value = null;
    connected.value = true;
}

async function loadWeb3() {
    //not sure if attaching to window is needed, keeping for now

    if ((window as any).ethereum) {
        const web3 = new Web3((window as any).ethereum);
        (window as any).web3 = web3;
        await (window as any).ethereum.enable();
        return web3;
    } else if ((window as any).web3) {
        const web3 = new Web3((window as any).web3.currentProvider);
        (window as any).web3 = web3;
        return web3;
    } else {
        return null;
    }
}
</script>

<template>
    <h2 v-if="!error">Connect Wallet to start using Swaps</h2>
    <template v-if="error">
        <h2>Could not connect to wallet:</h2>
        <h3>{{error}}</h3>
    </template>
    <button @click="connectWallet" v-if="!error" type="button" class="btn btn-primary">
        Connect Wallet
    </button>
    <button @click="connectWallet" v-if="error" type="button" class="btn btn-warning">
        Retry Connect Wallet
    </button>
</template>
