
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import App from './App.vue'
import router from './router'

const app = createApp(App);
app.config.globalProperties.$userid = '3000'
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBalcjU4VxaPNSKc4EzSUh7NH4ewIc7WAE',
        libraries: "places"
    },
})
app.use(createPinia())
app.use(router);
window.userid=999;
app.mount('#app')
