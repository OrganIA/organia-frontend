import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {path: "/landing", component: () => import("./views/LandingPage.vue")},
    {path: "/", component: () => import("./views/Auth/Login.vue")},
    {path: "/vitrine", component: () => import("./views/Vitrine.vue")},
    {path: "/receivers", component: () => import("./views/ReceiversPanel.vue")},
    {path: "/donors", component: () => import("./views/DonorsPanel.vue")},
    {path: "/login", component: () => import("./views/Auth/Login.vue")},
    {path: "/register", component: () => import("./views/Auth/Register.vue")},
    {path: "/administrator", component: () => import("./views/AdministratorPanel.vue")},
    {path: "/administrator/role", component: () => import("./views/RolePanel.vue")},
    {path: "/eventcalendar", component: () => import("./views/Events/EventCalendar.vue")},
    {path: "/eventlist", component: () => import("./views/Events/EventPanel.vue")},
    {path: "/useorgania", component: () => import("./views/HowToUseThePlatform.vue")},
    {path: "/searchmap", component: () => import("./views/Hospitals/SearchMap.vue")},
    {path: "/hospitals", component: () => import("./views/Hospitals/HospitalsPanel.vue")},
    {path: "/account", component: () => import("./views/Account.vue")},
    {path: "/chat", component: () => import("./views/Chat.vue")},
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
