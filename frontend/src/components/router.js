import PostPage from "@/components/post/PostPage";
import PostDetailPage from "@/components/post/PostDetailPage";
import LoginPage from "@/components/auth/LoginPage";
import RegistrationPage from "@/components/auth/RegistrationPage";
import AboutPage from "@/components/AboutPage";
import ProfilePage from "@/components/ProfilePage";
import {createRouter, createWebHistory} from "vue-router/dist/vue-router";

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
export default router;