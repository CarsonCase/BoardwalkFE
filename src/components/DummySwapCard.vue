<script setup lang="ts">
import { Strategy } from "@/model/Strategy";
import { onMounted, ref } from "vue";
import type { Contract } from "web3-eth-contract";

const props = defineProps({
    strategy: {
        type: Strategy,
        required: true
    }
});

const totalInvested = ref("--");
const tvl = ref("--");
const balance = ref("--");
const isApproved = ref(false);
const isStreaming = ref(false);
const amountString = ref("");
const isComplete = ref(false);
const isProcessing = ref(false);
const percentUsed = ref(0);

let stratContract: Contract;
const toastErrorMessage = ref("");

onMounted(async () => {
    totalInvested.value = "2011";
    tvl.value = "1234";
    balance.value = "777";
    isApproved.value = false;
    percentUsed.value = 69;
});

async function startStream() {
    isStreaming.value = true;
}

async function approveSwap() {
    isApproved.value = true;
}

async function buySwap() {
    isComplete.value = true;
}

</script>

<template>
    <div class="monopoly-card">
        <div class="monopoly-content">
            <div class="monopoly-title">
                <p class="m-0">Strategy</p>
                <h2>{{ strategy.name }}</h2>
            </div>
            <p class="mt-1"><b>Strategy Capacity</b></p>
            <div class="progress position-relative w-100">
                <div class="progress-bar" role="progressbar" :style="{width: percentUsed +'%'}"></div>
                <small class="justify-content-center d-flex position-absolute w-100 fw-bold">
                    {{ tvl }} / {{ totalInvested }}
                </small>
            </div>

            <div class="monopoly-details">
                <div class="monopoly-rents">
                    <p>Balance Remaining</p>
                    <p>{{ balance }} <i class="fa-brands fa-ethereum"></i></p>
                </div>
                <div class="monopoly-rents">
                    <p>TVL</p>
                    <p>{{ tvl }} <i class="fa-brands fa-ethereum"></i></p>
                </div>
                <div class="monopoly-rents">
                    <p>APR</p>
                    <p>12%</p>
                </div>
                <div class="monopoly-rents">
                    <p>Approved</p>
                    <p>{{ isApproved }}</p>
                </div>

                <template v-if="isProcessing">
                    <div class="spinner-border mt-3"></div>
                </template>
                <template v-else>
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
                            Complete Purchase
                        </button>
                    </template>

                    <div v-if="isComplete">
                        <span>Acquired {{ amountString }}</span>
                    </div>
                </template>
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