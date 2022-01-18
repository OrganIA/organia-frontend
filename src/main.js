import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import cookies from 'vue3-cookies'
import Toaster from '@meforma/vue-toaster';
import VueAxios from 'vue-axios'
import axios from "./http"
import VCalendar from "v-calendar";
import moment from 'moment';

const app = createApp(App);
app.use(store)
.use(router)
.use(cookies)
.use(Toaster)
.use(VueAxios, axios)
.use(VCalendar)
.use(moment)
.mount('#app')
