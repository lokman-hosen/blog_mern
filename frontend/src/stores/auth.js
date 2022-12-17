import {defineStore} from "pinia";
import axios from "axios";
import {API_BASE_URL} from "@/config";
import router from "@/components/router";
import {ref} from "vue";


export const useAuthStore = defineStore('auth', {
    state: () => ({
        baseUrl: API_BASE_URL,
        loggedIn: localStorage.getItem('loggedIn') ? localStorage.getItem('loggedIn') : 'no',
        user:{
            id: localStorage.getItem('id'),
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            token: localStorage.getItem('token')
            },
        userPosts: ref([]),
        totalRecord: ref(0),
        currentPage: ref(1),
        categories: ref([]),
        post : ref({
            'title' : 'A',
            'description' : 'A',
            'categories' : [],
            'status' : 0,
            'image' : '',
            'author' : ''
        }),

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
        },


        getLoginUserPost(){
            axios.get(API_BASE_URL+'api/posts?page='+this.currentPage+'&userId='+this.user.id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGU3YzkzYjY1NGYzMDE0NzdhYmEwMSIsInVzZXJfdHlwZSI6ImFkbWluIiwiaWF0IjoxNjcwMzIwNDM3LCJleHAiOjE2NzAzMzg0Mzd9.DTF3KetVK7OltfCC3KfR0MdvUmwp0lRZLNsUoVkySAo'
                },
            }).then(response => {
                this.userPosts = response.data.data;
                this.totalRecord = response.data.totalRecord;
            })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        },

        getCategory(){
            axios.get(API_BASE_URL+'api/categories?page=all', {
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => {
                this.categories = response.data.data;
            }).catch(function (error) {
                // handle error
                console.log(error);
            });
        },

        savePost(post){
            axios.post(API_BASE_URL+'api/posts', post,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    //'Authorization': 'Bearer '+token
                }
            }).then((response) => {
                if (response.data.status) {
                   this.getLoginUserPost()
                }
            }).catch((err) => {
                console.log(err)
            })

        },

        getPostById(postId){
            axios.get(API_BASE_URL+'api/posts/'+postId, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    //'Authorization': 'Bearer '+token
                }
            }).then((response) => {
                if (response.data.status) {
                    this.post.title = response.data.data.title;
                    this.post.description = response.data.data.description;
                    this.post.categories = response.data.categories;
                    this.post.status = response.data.status;
                    this.post.author = '';
                }
            }).catch((err) => {
                console.log(err)
            })

        },



        pagination (pageNumber){
            this.currentPage = pageNumber;
            this.getLoginUserPost();
        }

    },
})