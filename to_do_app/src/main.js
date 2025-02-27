import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router/router.js'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives
});
const app = createApp(App);

app.use(vuetify);
app.use(router);

app.mount('#app')
