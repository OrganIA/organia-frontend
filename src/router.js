import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: () => import("./views/LandingPage") },
        { path: "/receivers", component: () => import("./views/ReceiversPanel.vue") },
        { path: "/receivers/edit/:id", component: () => import("./views/EditReceiversPanel.vue"), props: true },
        { path: "/receivers/add", component: () => import("./views/NewReceiver.vue") },
        { path: "/donors", component: () => import("./views/DonorsPanel.vue") },
        { path: "/donors/add", component: () => import("./views/NewDonors.vue") },
        { path: "/donors/edit/:id", component: () => import("./views/EditDonorsPanel.vue"), props: true },
        { path: "/login", component: () => import("./views/Login.vue") },
        { path: "/register", component: () => import("./views/Register.vue") },
        { path: "/administrator", component: () => import("./views/AdministratorPanel") },
        { path: "/administrator/edit/user/:id", component: () => import("./views/AdministratorEditUser"), props: true },
        { path: "/actions", component: () => import("./views/ActionLogPanel")},
    ],
});