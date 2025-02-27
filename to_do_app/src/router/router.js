import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/LoginView.vue';
import Main from '@/views/MainView.vue';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/home',
        name: 'Main',
        component: Main,
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import('@/views/HomeView.vue')
            },
            {
                path: 'about',
                name: 'About',
                component: () => import('@/views/AboutView.vue')
            }
        ]
    }
    // Add more routes here
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;