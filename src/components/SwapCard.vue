<script setup lang="ts">
import { Strategy } from "@/model/Strategy";

defineProps({
    strategy: Strategy,
});
</script>

<template>
    <div class="card bg-secondary">
        <div class="card-body">
            <h5 class="card-title">{{ strategy.name }}</h5>
            <ul>
                <li>Balance: {{ strategy.balance }}</li>
                <li>TVL: {{ strategy.tvl }}</li>
                <li>Approved?: {{ strategy.isApproved }}</li>
                <li>Streaming?: {{ strategy.isStreaming }}</li>
            </ul>
            <button class="btn btn-primary">
                Buy Swap
            </button>
        </div>
    </div>
</template>
