import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { showToast, showConfirmDialog } from 'vant'
import 'vant/lib/index.css'
import 'element-plus/dist/index.css'
import './style.css'

const app = createApp(App)
app.use(router)
app.config.globalProperties.showToast = showToast
app.config.globalProperties.showConfirmDialog = showConfirmDialog
app.mount('#app')
