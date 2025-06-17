import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { auth } from './firebaseconfig.js'
import { onAuthStateChanged } from 'firebase/auth'

// ✅ Toastification import
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

let app

// ⏱ Wait until Firebase auth state is known
onAuthStateChanged(auth, () => {
if (!app) {
app = createApp(App)
app.use(router)
app.use(Toast, {
position: POSITION.TOP_RIGHT,
timeout: 3000,
closeOnClick: true,
pauseOnHover: true,
})
app.mount('#app')
}
})