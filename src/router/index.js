import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/home-view.vue'
import SignUp from '../views/signUp-view.vue'
import SignIn from '../views/signIn-view.vue'
import Profile from '../views/profile-view.vue'
import TaskPage from '../views/task-view.vue'


const routes = [ 
    {
        path: '/',
        name: "Home",
        component: Home
    },
    {
        path: '/SignUp',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/SignIn',
        name: 'SignIn',
        component: SignIn
    },
    {
        path: '/Profile/:userId?',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/Task/:id?',
        name: "Task",
        component: TaskPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;