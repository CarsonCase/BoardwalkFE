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
const allowance = ref("--");
const isApproved = ref(false);
const isStreaming = ref(false);
const amountString = ref("");
const isComplete = ref(false);

let stratContract: Contract;
const toastErrorMessage = ref("");

onMounted(async () => {
    stratContract = await Web3Util.getStrategyContractInstance(props.strategy);
    const invested = await stratContract.methods.underlyingInvested().call();
    const exposed = await stratContract.methods.underlyingExposedToSwaps().call();
    tvl.value = Web3.utils.fromWei(exposed);
    balance.value = Web3.utils.fromWei(new BN(invested).sub(new BN(exposed)));
    allowance.value = await Web3Util.getAllowanceForStrategy(props.strategy);
    isApproved.value = new BN(allowance.value).gtn(1); // should this be > 0?
});

async function startStream() {
    try {
        await Web3Util.createSuperFluidFlow(amountString.value, stratContract);
        isStreaming.value = true;
    } catch (e) {
        showErrorToast(extractErrorMessage(e));
    }
}

async function approveSwap() {
    try {
        await Web3Util.approveSwap(props.strategy.address);
        isApproved.value = true;
    } catch (e) {
        showErrorToast(extractErrorMessage(e));
    }
}

async function buySwap() {
    try {
        await Web3Util.buySwap(stratContract, amountString.value);
        isComplete.value = true;
    } catch (e) {
        showErrorToast(extractErrorMessage(e));
    }
}

function showErrorToast(message: string) {
    const toastElement = document.getElementById("errorToast");
    toastErrorMessage.value = message;
    // eslint-disable-next-line no-undef
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}

function extractErrorMessage(error: any): string {
    if (error.errorObject && error.errorObject.errorObject && error.errorObject.errorObject.reason) {
        return error.errorObject.errorObject.reason;
    }
    if (error.message) {
        return error.message;
    }
    return JSON.stringify(error);
}

</script>

<template>
    <div class="monopoly-card">
        <div class="monopoly-content">
            <div class="monopoly-title">
                <p class="m-0">Strategy</p>
                <h2>{{ strategy.name }}</h2>
            </div>
            <p class="mt-1"><b>ETH | xDAI</b></p>
            <div class="monopoly-details">
                <div class="monopoly-rents">
                    <p>Balance Invested</p>
                    <p>{{ balance }} <i class="fa-brands fa-ethereum"></i></p>
                </div>
                <div class="monopoly-rents">
                    <p>TVL</p>
                    <p>{{ tvl }} <i class="fa-brands fa-ethereum"></i></p>
                </div>
                <div class="monopoly-rents">
                    <p>Allowance</p>
                    <p>{{ allowance }} <i class="fa-brands fa-ethereum"></i></p>
                </div>

                <template v-if="!isStreaming">
                    <p class="extra">
                        <b>Create Steam to Invest</b>
                    </p>
                    <div class="input-group">
                        <input v-model.trim="amountString" type="number" class="form-control" placeholder="Amount">
                        <button @click="startStream" class="btn btn-secondary" type="button">
                            Stream
                            <i class="fa-brands fa-ethereum"></i>
                        </button>
                    </div>
                </template>

                <template v-if="!isApproved && isStreaming">
                    <p class="extra">
                        <b>Amount</b>
                        {{ amountString }} <i class="fa-brands fa-ethereum"></i>
                    </p>
                    <p class="extra">
                        <b>SmartContract requires funds approval</b>
                    </p>
                    <button @click="approveSwap" class="btn btn-success" type="button">
                        Approve SmartContract Access <i class="fa-solid fa-check"></i>
                    </button>
                </template>

                <template v-if="isApproved && isStreaming && !isComplete">
                    <p class="extra">
                        <b>Amount</b>
                        {{ amountString }} <i class="fa-brands fa-ethereum"></i>
                    </p>
                    <p class="extra">
                        <b>Approved</b>
                    </p>
                    <button @click="buySwap" class="btn btn-primary" type="button">
                        Complete Transaction
                    </button>
                </template>

                <div v-if="isComplete">
                    <span>Acquired {{ amountString }}</span>
                </div>
            </div>
        </div>
    </div>

    <div class="position-absolute p-3 top-0 start-0" style="margin-top: 56px">
        <div id="errorToast" class="toast bg-danger" data-bs-autohide="false">
            <div class="toast-header">
                <strong class="me-auto">Error</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body fw-bold">
                {{ toastErrorMessage }}
            </div>
        </div>
    </div>
</template>
