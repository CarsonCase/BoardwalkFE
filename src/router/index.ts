import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SwapsView from "../views/SwapsView.vue";
import DummySwapsView from "../views/DummySwapsView.vue";

// route level code-splitting: caused issues when accessing globals like window in route components

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/swaps",
            name: "swaps",
            component: SwapsView,
        },
        {
            path: "/dummySwaps",
            name: "dummySwaps",
            component: DummySwapsView,
        },
    ],
});

export default router;
