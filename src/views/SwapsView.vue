<script setup lang="ts">
import { ref } from "vue";
import WalletConnectionInit from "@/components/WalletConnectionInit.vue";

const isWalletConnected = ref(false);
</script>

<template>
    <div class="container-lg">
        <h1>This is the Swaps view {{ isWalletConnected }}</h1>

        <WalletConnectionInit />
    </div>
</template>
