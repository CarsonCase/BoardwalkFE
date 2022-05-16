<script setup lang="ts">
import { Strategy } from "@/model/Strategy";
import Web3Util from "@/stores/Web3Util";
import Web3 from "web3";
import BN from "bn.js";
import { onMounted, ref } from "vue";
import type { Contract } from "web3-eth-contract";

const props = defineProps({
    strategy: {
        type: Strategy,
        required: true
    }
});

const tvl = ref("--");
const balance = ref("--");
const isApproved = ref(false);
const isStreaming = ref(false);
const amountString = ref("");
const isComplete = ref(false);

let stratContract: Contract;

onMounted(async () => {
    stratContract = await Web3Util.getStrategyContractInstance(props.strategy);
    const invested = await stratContract.methods.underlyingInvested().call();
    const exposed = await stratContract.methods.underlyingExposedToSwaps().call();
    tvl.value = Web3.utils.fromWei(exposed);
    balance.value = Web3.utils.fromWei(new BN(invested).sub(new BN(exposed)));
    const allowance = await Web3Util.getAllowanceForStrategy(props.strategy);
    isApproved.value = new BN(allowance).gtn(1); // should this be > 0?
});

async function startStream() {
    await Web3Util.createSuperFluidFlow(amountString.value, stratContract);
    isStreaming.value = true;
}

async function approveSwap() {
    await Web3Util.approveSwap(props.strategy.address);
    isApproved.value = true;
}

async function buySwap() {
    await Web3Util.buySwap(stratContract, amountString.value);
    isComplete.value = true;
}
</script>

<template>
    <div class="card bg-light bg-gradient">
        <div class="card-body">
            <h5 class="card-title">{{ strategy.name }}</h5>
            <ul>
                <li>Balance: {{ balance }}</li>
                <li>TVL: {{ tvl }}</li>
                <li>Approved?: {{ isApproved }}</li>
                <li>Streaming?: {{ strategy.isStreaming }}</li>
            </ul>
            <div v-if="!isStreaming" class="input-group mb-3">
                <input v-model.trim="amountString" type="number" class="form-control" placeholder="Amount">
                <button @click="startStream" class="btn btn-secondary" type="button">
                    Stream
                    <i class="fa-brands fa-ethereum"></i>
                </button>
            </div>
            <div v-if="!isApproved && isStreaming">
                <button @click="approveSwap" class="btn btn-secondary" type="button">
                    Approve <i class="fa-solid fa-check"></i>
                </button>
            </div>
            <div v-if="isApproved && isStreaming && !isComplete">
                <button @click="buySwap" class="btn btn-secondary" type="button">
                    Buy
                </button>
            </div>
            <div v-if="isComplete">
                <span>Acquired {{amountString}}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-body {
    border: black;
    border-width: medium;
}
</style>