import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import UserDashboard from '../views/UserDashboard.vue';

const routes = [
{
path: '/',
redirect: '/login'
},
{
path: '/login',
name: 'Login',
component: Login
},
{
path: '/dashboard',
name: 'UserDashboard',
component: UserDashboard
}
];

const router = createRouter({
history: createWebHistory(),
routes
});

export default router;