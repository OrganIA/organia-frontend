import {createRouter, createWebHistory} from "vue-router";

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: () => import("./pages/App.vue") },
        { path: "/receivers", component: () => import("./pages/ReceiversPanel.vue") },
        { path: "/donors", component: () => import("./pages/DonorsPanel.vue") },
    ],
});