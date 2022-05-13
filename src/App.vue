<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="container-lg">
            <RouterLink class="navbar-brand h1 mb-0" to="/" active-class="active">Boardwalk</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarContent">
                <div class="navbar-nav">
                    <RouterLink class="nav-link" to="/about" active-class="active">About</RouterLink>
                    <RouterLink class="nav-link" to="/swaps" active-class="active">Swaps</RouterLink>
                </div>
            </div>
        </div>
    </nav>

    <RouterView />
</template>

<style>
/*@import "@/assets/base.css";*/
</style>
