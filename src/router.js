import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  { path: "/landing", component: () => import("./views/LandingPage.vue")},
  { path: "/", component: () => import("./Home.vue")},  { path: "/vitrine", component: () => import("./views/Vitrine.vue") },
  { path: "/receivers", component: () => import("./views/Receivers/ReceiversPanel.vue") },
  { path: "/receivers/add", component: () => import("./views/Receivers/NewReceiver.vue") },
  { path: "/receivers/edit/:id", component: () => import("./views/Receivers/EditReceiversPanel.vue"), props: true },
  { path: "/dialyse", component: () => import("./views/Receivers/DialysePanel.vue") },
  { path: "/tumor", component: () => import("./views/Receivers/TumorPanel.vue") },
  { path: "/donors", component: () => import("./views/Donors/DonorsPanel.vue") },
  { path: "/donors/add", component: () => import("./views/Donors/NewDonors.vue") },
  { path: "/donors/edit/:id", component: () => import("./views/Donors/EditDonorsPanel.vue"), props: true },
  { path: "/login", component: () => import("./views/Auth/Login.vue") },
  { path: "/register", component: () => import("./views/Auth/Register.vue") },
  { path: "/invitations", component: () => import("./views/Auth/Invitations.vue") },
  { path: "/administrator", component: () => import("./views/Administrator/AdministratorPanel.vue") },
  { path: "/administrator/user", component: () => import("./views/Administrator/UserPanel.vue") },
  { path: "/administrator/edit/user/:id", component: () => import("./views/Administrator/AdministratorEditUser.vue"), props: true },
  { path: "/actions", component: () => import("./views/Administrator/ActionLogPanel.vue") },
  { path: "/administrator/role", component: () => import("./views/Roles/RolePanel.vue") },
  { path: "/administrator/role/add", component: () => import("./views/Roles/NewRoles.vue") },
  { path: "/eventcalendar", component: () => import("./views/Events/EventCalendar.vue") },
  { path: "/eventlist", component: () => import("./views/Events/EventPanel.vue") },
  { path: "/eventlist/add", component: () => import("./views/Events/NewEvent.vue") },
  { path: "/eventlist/edit/:id", component: () => import("./views/Events/EditEventPanel.vue"), props: true },
  { path: "/chat", component: () => import("./views/Chat.vue") },
  { path: "/useorgania", component: () => import("./views/HowToUseThePlatform.vue") },
  { path: "/searchmap", component: () => import("./views/Hospitals/SearchMap.vue") },
  { path: "/hospitals", component: () => import("./views/Hospitals/HospitalsPanel.vue") },
  { path: "/hospitals/add", component: () => import("./views/Hospitals/NewHospital.vue") },
  { path: "/hospitals/info/:id", component: () => import("./views/Hospitals/DisplayHospitalInfo.vue"), props: true },
  { path: "/hospitals/edit/:id", component: () => import("./views/Hospitals/EditHospital.vue"), props: true },
  { path: "/account", component: () => import("./views/Account.vue") },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
