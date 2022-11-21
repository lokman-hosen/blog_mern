import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import AboutPage from "@/components/AboutPage";
import PostPage from "@/components/PostPage";
import LoginPage from "@/components/LoginPage";
import RegistrationPage from "@/components/RegistrationPage";
import PostDetailPage from "@/components/PostDetailPage";
import ProfilePage from "@/components/ProfilePage";

const routes = [
    { path: '/', component: PostPage },
    { path: '/post', component: PostPage },
    { path: '/post/:id', component: PostDetailPage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegistrationPage },
    { path: '/about', component: AboutPage },
    { path: '/profile', component: ProfilePage },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
    linkExactActiveClass: "active"
})

createApp(App).use(router).mount('#app')
