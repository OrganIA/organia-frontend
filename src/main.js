import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import cookies from 'vue3-cookies'
import Toaster from '@meforma/vue-toaster';

const app = createApp(App);
app.use(store)
.use(router)
.use(cookies)
.use(Toaster)
.mount('#app')
