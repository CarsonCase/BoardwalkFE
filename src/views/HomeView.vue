<script setup lang="ts">

</script>

<template>
    <div class="px-4 py-5 text-center bg-white">
        <img class="d-block mx-auto mb-4" src="@/assets/game-board.png" height="100">
        <h1 class="display-5 fw-bold">Welcome to Boardwalk</h1>
        <div class="col-lg-6 mx-auto">
            <p class="lead mb-4">DeFi Platform for Total Return Swap Trading</p>
        </div>
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
                On lending platforms in DeFi you need upwards of 100% collateral. With a Total Return Swap you need much
                less, and pay a stream of interest on the assets you’re leveraging.
                <br>
                An ETH holding strategy could be done with TRSs with only 10% collateral. That’s 10x leverage in DeFi!
            </p>

            <h2 class="fw-bold">What is a Total Return Swap (TRS)?</h2>
            <p class="lead">
                A TRS is an agreement to “swap” incomes. Swapping basic income (ex. $5 a month) with the “total return”
                of an asset. (ex. $10 if an ETH portfolio increases by $10).
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