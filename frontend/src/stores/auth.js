import {defineStore} from "pinia";
import axios from "axios";
import {API_BASE_URL} from "@/config";
import router from "@/components/router";
import {ref} from "vue";


export const useAuthStore = defineStore('auth', {
    state: () => ({
            baseUrl: API_BASE_URL,
            showLoading: 'yes',
            loggedIn: localStorage.getItem('loggedIn') ? localStorage.getItem('loggedIn') : 'no',
            user:ref({
                id: localStorage.getItem('id'),
                name: localStorage.getItem('name'),
                email: localStorage.getItem('email'),
                password: '',
                token: localStorage.getItem('token'),
                }),
            userPosts: ref([]),
            totalRecord: ref(0),
            currentPage: ref(1),
            categories: ref([]),
            post : ref({
                'id' : '',
                'title' : '',
                'description' : '',
                'categories' : [],
                'status' : 0,
                'image' : '',
                'author' : '',
                'file_upload' : true,
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

        updateUser(){
            console.log(this.user)
            axios.put(API_BASE_URL+'api/users/'+this.user.id, this.user,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.user.token
                }
            }).then((response) => {
                if (response.data.status) {
                   // set data to local storage
                    localStorage.setItem('name', response.data.data.name);
                    localStorage.setItem('email', response.data.data.email);

                    // set data to local state
                    this.user.name = response.data.data.name;
                    this.user.email = response.data.data.email;
                    this.user.password = '';
                }
            }).catch((err) => {
                console.log(err)
            })
        },


        getLoginUserPost(){
            this.showLoading = 'yes';
            axios.get(API_BASE_URL+'api/posts?page='+this.currentPage+'&userId='+this.user.id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGU3YzkzYjY1NGYzMDE0NzdhYmEwMSIsInVzZXJfdHlwZSI6ImFkbWluIiwiaWF0IjoxNjcwMzIwNDM3LCJleHAiOjE2NzAzMzg0Mzd9.DTF3KetVK7OltfCC3KfR0MdvUmwp0lRZLNsUoVkySAo'
                },
            }).then(response => {
                this.userPosts = response.data.data;
                this.totalRecord = response.data.totalRecord;
                this.showLoading = 'no'
            })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        },

        getCategory(){
            this.showLoading = 'yes';
            axios.get(API_BASE_URL+'api/categories?page=all', {
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => {
                this.categories = response.data.data;
                this.showLoading = 'no';
            }).catch(function (error) {
                // handle error
                console.log(error);
            });
        },

        savePost(post){
            axios.post(API_BASE_URL+'api/posts', post,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer '+this.user.token
                }
            }).then((response) => {
                if (response.data.status) {
                    // reset form value
                    this.resetFormValue();
                    // get updated post list
                    this.getLoginUserPost()
                }
            }).catch((err) => {
                console.log(err)
            })
        },

        updatePost(){
            axios.put(API_BASE_URL+'api/posts/'+this.post.id, this.post,{
                headers: {
                    'Content-Type': this.post.file_upload ? 'multipart/form-data' : 'application/json',
                    'Authorization': 'Bearer '+this.user.token
                }
            }).then((response) => {
                if (response.data.status) {
                    // reset post
                   this.resetFormValue();
                    // get updated posts
                    this.getLoginUserPost();
                }
            }).catch((err) => {
                console.log(err)
            })
        },

        getPostById(postId){
            this.showLoading = 'yes';
            axios.get(API_BASE_URL+'api/posts/'+postId, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    //'Authorization': 'Bearer '+token
                }
            }).then((response) => {
                if (response.data.status) {
                    this.post.id = response.data.data._id;
                    this.post.title = response.data.data.title;
                    this.post.description = response.data.data.description;
                    this.post.categories = this.processCategoryId(response.data.data.categories);
                    this.post.status = response.data.data.status == 1 ? 1 : 0;
                    this.post.author = response.data.data.author._id;
                    this.post.image = '';
                    this.post.file_upload = false;

                    this.showLoading = 'no';
                }
            }).catch((err) => {
                console.log(err)
            })
        },

        // make categoryId array
        processCategoryId(categories){
            const categoryIds = []
            categories.forEach(function (category){
                categoryIds.push(category._id)
            })
            return categoryIds;
        },

        pagination (pageNumber){
            this.currentPage = pageNumber;
            this.getLoginUserPost();
        },

        // Reset form value
        resetFormValue(editMode){
            this.post.id = '';
            this.post.title = '';
            this.post.description = '';
            this.post.categories = [];
            this.post.status = editMode == 'no' ? 0 : this.post.status;
            this.post.author = editMode == 'no' ? this.user.id : this.post.author;
            this.post.image = '';
            this.post.file_upload = true;
        }

    },
})