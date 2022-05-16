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
    <div class="card col-md-6">
        <div class="card-header">
            <template v-if="!error">
                Connect Wallet with <b>Boardwalk</b>
            </template>
            <template v-else>
                Problem Connecting Wallet
            </template>
        </div>
        <div class="card-body">
            <button @click="connectWallet" v-if="!error" type="button" class="btn btn-primary mb-2">
                Connect Wallet <i class="fa-solid fa-wallet"></i>
            </button>
            <template v-else>
                <p class="card-text">
                    {{error}}
                </p>
                <button @click="connectWallet" type="button" class="btn btn-warning">
                    Retry Connect Wallet <i class="fa-solid fa-wallet"></i>
                </button>
            </template>
            <p class="card-text text-muted">(Compatible browser or addon required)</p>
        </div>
    </div>
</template>
