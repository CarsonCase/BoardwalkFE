<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="container-lg">
            <a class="navbar-brand h1 mb-0" href="#">Boardwalk</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarContent">
                <div class="navbar-nav">
                    <RouterLink class="nav-link" to="/" active-class="active">Home</RouterLink>
                    <RouterLink class="nav-link" to="/about" active-class="active">About</RouterLink>
                </div>
            </div>
        </div>
    </nav>

    <RouterView />
</template>

<style>
/*@import "@/assets/base.css";*/
</style>
