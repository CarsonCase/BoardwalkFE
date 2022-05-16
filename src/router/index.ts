import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
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
            path: "/about",
            name: "about",

            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: AboutView,
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
