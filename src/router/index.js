import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import { auth } from '../firebaseconfig.js'

const routes = [
{
path: '/',
redirect: '/login',
},
{
path: '/login',
name: 'Login',
component: Login,
},
{
path: '/dashboard',
name: 'Dashboard',
component: Dashboard,
meta: { requiresAuth: true }, // 🔐 Protect this route
},
]

const router = createRouter({
history: createWebHistory(),
routes,
})

// Route Guard Logic
router.beforeEach((to, from, next) => {
const isAuth = auth.currentUser
if (to.meta.requiresAuth && !isAuth) {
next('/login')
} else {
next()
}
})

export default router