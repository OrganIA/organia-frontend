import {createRouter, createWebHistory} from "vue-router";

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: () => import("./App.vue") },
        { path: "/index", component: () => import("./components/Index.vue") },
        { path: '*', redirect: '/index' }
    ],
});