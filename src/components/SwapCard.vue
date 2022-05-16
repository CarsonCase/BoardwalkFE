<script setup lang="ts">
import { Strategy } from "@/model/Strategy";
import Web3Util from "@/stores/Web3Util";
import Web3 from "web3";
import BN from "bn.js";
import { onMounted, ref } from "vue";

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

onMounted(async () => {
    const stratContract = await Web3Util.getStrategyContractInstance(props.strategy);
    const invested = await stratContract.methods.underlyingInvested().call();
    const exposed = await stratContract.methods.underlyingExposedToSwaps().call();
    tvl.value = Web3.utils.fromWei(exposed);
    balance.value = Web3.utils.fromWei(new BN(invested).sub(new BN(exposed)));
    const allowance = await Web3Util.getAllowanceForStrategy(props.strategy);
    isApproved.value = new BN(allowance).gtn(1); // should this be > 0?
});

function startStream() {

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
                <input v-model="amountString" type="number" class="form-control" placeholder="Amount">
                <button @click="startStream" class="btn btn-secondary" type="button">
                    Stream
                    <i class="fa-brands fa-ethereum"></i>
                </button>
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