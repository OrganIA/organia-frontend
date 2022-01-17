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
        { path: "/administrator/user", component: () => import("./views/UserPanel") },
        { path: "/administrator/edit/user/:id", component: () => import("./views/AdministratorEditUser"), props: true },
        { path: "/actions", component: () => import("./views/ActionLogPanel")},
        { path: "/administrator/role", component: () => import("./views/RolePanel") },
        { path: "/chat", component: () => import("./views/Chat") },
        { path: "/aboutthegroup", component: () => import("./views/AboutGroup") },
        { path: "/abouttheproject", component: () => import("./views/AboutProject") },
        { path: "/useorgania", component: () => import("./views/HowToUseThePlatform") },
        { path: "/hospitals", component: () => import("./views/HospitalsPanel") },
        { path: "/hospitals/add", component: () => import("./views/NewHospital") },
        { path: "/hospitals/info/:id", component: () => import("./views/DisplayHospitalInfo"), props: true },
        { path: "/hospitals/edit/:id", component: () => import("./views/EditHospital"), props: true },
    ],
});