import {createApp} from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import cookies from 'vue3-cookies'
import Toaster from '@meforma/vue-toaster';
import VueAxios from 'vue-axios'
import axios from "./http"
import moment from 'moment';
import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
import 'vue-cal/dist/vuecal.css'

const app = createApp(App)
    .use(store)
    .use(router)
    .use(cookies)
    .use(Toaster)
    .use(VueAxios, axios)
    .use(moment)
    .use(VueTelInput)


app.config.errorHandler = () => null;
app.config.warnHandler = () => null;

app.mount('#app')