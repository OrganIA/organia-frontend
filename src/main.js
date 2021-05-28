import { createApp } from 'vue'
import App from './pages/App.vue'
import store from './store'
import router from './router'
import cookies from 'vue3-cookies'

const app = createApp(App);
app
.use(store)
.use(router)
.use(cookies)
.mount('#app')
