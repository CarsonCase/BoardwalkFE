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
                Boardwalk is a DAO that issues Total Return Swaps (TRS), a derivative for leveraging positions. In defi
                it’s very difficult to find leverage over 100% as most lending protocols require upwards of 150%
                collateral. And considering that the users of DeFi have a near infinite appetite for risk, many
                protocols have risen to the challenge of offering more tools for users to leverage. At the same time,
                larger actors like institutions and DAOs have a hard time avoiding risk even with stablecoin staking.
                The Total Return Swap allows us to exchange the power of a large treasury with stability and income from
                risk seeking investors.
                <br><br>
                On lending platforms in DeFi you need upwards of 100% collateral. And for most derivative or under collateralized lending based yield systems, the yield earner is taking
                on more risk, not less. But not with the TRS, here users can get leverage while the providers of capital are receiving downside protection.
            </p>

            <h2 class="fw-bold">What is a Total Return Swap (TRS)?</h2>
            <p class="lead">
                A TRS is an agreement to “swap” incomes. Swapping basic income (ex. $5 a month) with the “total return”
                of an asset. (Ex. earning $10 if an asset increases by $10) or (Ex. paying $5 if it decreases $5).
                <br><br>
                Let’s use an easy to understand example with houses:
            </p>
            <ul class="lead">
                <li>
                    Bob has a rental property worth $200,000 that cashflows $2,500 a month.
                    <ul>
                        <li>But he is afraid of a dip in the housing market.</li>
                    </ul>
                </li>
                <li>
                    Lisa has some extra income ($2,000 a month) and want’s to invest in real estate.
                    <ul>
                        <li>But she doesn’t have $200,000 to put down on a house</li>
                    </ul>
                </li>
    
            </ul>
            Bob could issue Lisa a TRS. This way Lisa pays her $2,000/m to Bob (12% APR on the $200,000 house). And in exchange, Lisa is paid, or pays 
            the difference in value later when the house is refinanced.
            Here's two scenarios after a year.
            <ul class="lead">
                <li>
                The house is worth $5,000 less, Lisa owes Bob $5,000 so he has been protected
                from the market downturn he feared.
                </li>
                <li>
                The market booms and the house is worth $50,000 more. Bob pays lisa the $50,000, which he doesn't mind as he gets to keep a now $250,000 house.
                Especially since he was still earning the $2,000 a month swap payments from Lisa over the year.
                </li>
            </ul>
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