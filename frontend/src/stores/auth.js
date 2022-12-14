import {defineStore} from "pinia";
import axios from "axios";
import {API_BASE_URL} from "@/config";
import router from "@/components/router";


export const useAuthStore = defineStore('auth', {
    state: () => ({
        baseUrl: API_BASE_URL,
        loggedIn: localStorage.getItem('loggedIn') ? localStorage.getItem('loggedIn') : 'no',
        user:{
            id: localStorage.getItem('id'),
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            token: localStorage.getItem('token')
            }
        }),
    getters: {
        //doubleCount: (state) => state.count * 2,
    },
    actions: {
        // user registration
        register(formData){
            axios.post(this.baseUrl+'api/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            }).then((response) => {
                if (response.data.status) {
                    router.push("/login")
                }
            }).catch((err) => {
                console.log(err)

            })
        },
        // user login
        login(formData) {
            axios.post(this.baseUrl+'api/auth/login', {
                email: formData.email,
                password: formData.password,
            }).then((response) => {
                if (response.data.status) {
                    //save to local store because if user refresh page then lost stare data and take from local store
                    localStorage.setItem('id', response.data.data._id);
                    localStorage.setItem('name', response.data.data.name);
                    localStorage.setItem('email', response.data.data.email);
                    localStorage.setItem('loggedIn', 'yes');
                    localStorage.setItem('token', response.data.token);

                    // set to state to get instance change
                    this.user.id = response.data.data._id;
                    this.user.name = response.data.data.name;
                    this.user.email = response.data.data.email;
                    this.user.token = response.data.token;
                    this.loggedIn = 'yes';

                    router.push("/profile")
                }
            }).catch((err) => {
                    console.log(err)

                })
        },

        logoutUser(){
            localStorage.setItem('id', '');
            localStorage.setItem('name', '');
            localStorage.setItem('email', '');
            localStorage.setItem('loggedIn', 'no');
            localStorage.setItem('token', '');

            this.user.id = '';
            this.user.name = '';
            this.user.email = '';
            this.user.token = '';
            this.loggedIn = 'no';

            router.push("/")
        }
    },
})