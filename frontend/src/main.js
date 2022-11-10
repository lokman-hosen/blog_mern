import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import AboutPage from "@/components/AboutPage";
import PostPage from "@/components/PostPage";
import LoginPage from "@/components/LoginPage";
import RegistrationPage from "@/components/RegistrationPage";
import PostDetailPage from "@/components/PostDetailPage";
const routes = [
    { path: '/', component: PostPage },
    { path: '/post', component: PostPage },
    { path: '/post/:id', component: PostDetailPage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegistrationPage },
    { path: '/about', component: AboutPage },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

createApp(App).use(router).mount('#app')
