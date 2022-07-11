<script setup lang="ts">
import Web3Util from "@/stores/Web3Util";
import { onMounted, ref } from "vue";

const totalValueInSwaps = ref<string | null>(null);

onMounted(async () => {
    totalValueInSwaps.value = await Web3Util.getTotalValueInSwaps();
});
</script>

<template>
    <div class="px-4 py-5 text-center bg-white">
        <img class="d-block mx-auto mb-4" src="@/assets/game-board.png" height="100">
        <h1 class="display-5 fw-bold">Welcome to Boardwalk</h1>
        <div class="col-lg-6 mx-auto">
            <p class="lead mb-4">DeFi Platform for Total Return Swap Trading</p>
        </div>
    </div>

    <div class="px-4 py-2 text-center text-light" style="background-color: var(--boardwalk-blue)">
        <h1>Total Value Held in Swaps</h1>
        <h1 v-if="Web3Util.isWeb3Loaded.value">{{ totalValueInSwaps }} <i class="fa-brands fa-ethereum"></i></h1>
        <p v-else class="lead mb-4">
            (MetaMask or another Web3 enabled browser is required to view swap data)
        </p>
    </div>
    <div class="section-divider"></div>

    <div class="px-4 py-5 bg-white">
        <div class="col-lg-8 mx-auto">
            <h2 class="fw-bold">What is Boardwalk?</h2>
            <p class="lead mb-4">
                Boardwalk is a DAO that issues Total Return Swaps, a derivative from traditional finance that allow users to swap insurance + a fee for the total return of an asset. 
                This essentially allows for 1 party to turn anything into a stable yield bearing asset while the other party can receive undercollateralized leverage for a fee.
                <br><br>
                On lending platforms in DeFi you need upwards of 100% collateral. And Stablecoins are no longer considered safe enough to be the only low-risk asset in DeFi.
                The Total Return Swap solves these issues by swapping flexable, powerful leverage to one party and price stability with passive income to another.
            </p>

            <h2 class="fw-bold">ELIF Total Return Swaps</h2>
            <p class="lead">
                Let’s use an easy to understand example with a hotel to understand the flow of cash in a TRS, as well as why someone would enter one:
            </p>
            <img src="../assets/HotelAnalogy.drawio.png">
            <p class="lead mb-4">
                A landlord owns a Hotel and collects rent payments from the hotel manager. The hotel manager rents out to guests and gets to keep all the profits of the hotel. Meanwhile, if a rowdy guest breaks something in the hotel, the manager has to fix it as he’s doing something risky by letting all sorts of people stay there.
                <br><br>
                Notice the landlord SWAPPED out his risk of damages, as well as all potential profits in return for his rent checks. He decided he’d rather let someone else collect the profits as long as they also deal with all the problems guests bring.
                <br>
                Now imagine that instead of a hotel you had some onchain investment. You could make this whole process automated by a smart contract! That's Boardwalk. A protocol where you can choose to be the profit seeking hotel manager
                who must pay out of pocket for the investments poor performance, but also get's it's returns when it preforms well. Or you can be the careful landlord who will sacrifice your investment's profits for the sake of trusty passive income.
            </p>
        </div>
    </div>
</template>

<style scoped>
.section-divider {
    height: 3rem;
    background-color: rgba(0, 0, 0, .1);
    border: solid rgba(0, 0, 0, .15);
    border-width: 1px 0;
    box-shadow: inset 0 0.5em 1.5em rgb(0 0 0 / 10%), inset 0 0.125em 0.5em rgb(0 0 0 / 15%);
}
</style>