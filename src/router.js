import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: () => import("./components/LandingPage") },
        { path: "/receivers", component: () => import("./components/ReceiversPanel.vue") },
        { path: "/receivers/edit/:id", component: () => import("./components/EditReceiversPanel.vue"), props: true },
        { path: "/donors", component: () => import("./components/DonorsPanel.vue") },
        { path: "/login", component: () => import("./components/Login.vue") },
        { path: "/register", component: () => import("./components/Register.vue") },
    ],
});