import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  { path: "/landing", component: () => import("./views/LandingPage.vue")},
  { path: "/", component: () => import("./views/Auth/Login.vue")},
  { path: "/vitrine", component: () => import("./views/Vitrine.vue") },
  { path: "/receivers", component: () => import("./views/Receivers/ReceiversPanel.vue") },
  { path: "/dialyse", component: () => import("./views/Receivers/DialysePanel.vue") },
  { path: "/tumor", component: () => import("./views/Receivers/TumorPanel.vue") },
  { path: "/donors", component: () => import("./views/Donors/DonorsPanel.vue") },
  { path: "/login", component: () => import("./views/Auth/Login.vue") },
  { path: "/register", component: () => import("./views/Auth/Register.vue") },
  { path: "/invitations", component: () => import("./views/Auth/Invitations.vue") },
  { path: "/administrator", component: () => import("./views/Administrator/AdministratorPanel.vue") },
  { path: "/administrator/user", component: () => import("./views/Administrator/UserPanel.vue") },
  { path: "/actions", component: () => import("./views/Administrator/ActionLogPanel.vue") },
  { path: "/administrator/role", component: () => import("./views/Roles/RolePanel.vue") },
  { path: "/administrator/role/add", component: () => import("./views/Roles/NewRoles.vue") },
  { path: "/eventcalendar", component: () => import("./views/Events/EventCalendar.vue") },
  { path: "/eventlist", component: () => import("./views/Events/EventPanel.vue") },
  { path: "/useorgania", component: () => import("./views/HowToUseThePlatform.vue") },
  { path: "/searchmap", component: () => import("./views/Hospitals/SearchMap.vue") },
  { path: "/hospitals", component: () => import("./views/Hospitals/HospitalsPanel.vue") },
  { path: "/account", component: () => import("./views/Account.vue") },
  { path: "/chat", component: () => import("./views/Chat.vue") },
  // { path: "/:pathMatch(.*)*", component: () => import("./views/NotFound.vue") },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
