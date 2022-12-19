import {ref} from "vue";
import { defineStore } from 'pinia'
import axios from "axios";
import {API_BASE_URL} from "@/config";

export const usePostStore = defineStore('post', () => {
    const showLoading = ref('yes');
    let posts = ref([]);
    let post = ref({});
    let currentPage = ref(1);
    let totalRecord = ref(0);
    // get post list
    function getPost(){
        showLoading.value = 'yes';
        axios.get(API_BASE_URL+'api/posts?page='+currentPage.value, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGU3YzkzYjY1NGYzMDE0NzdhYmEwMSIsInVzZXJfdHlwZSI6ImFkbWluIiwiaWF0IjoxNjcwMzIwNDM3LCJleHAiOjE2NzAzMzg0Mzd9.DTF3KetVK7OltfCC3KfR0MdvUmwp0lRZLNsUoVkySAo'
            },
        }).then(response => {
                posts.value = response.data.data;
                totalRecord.value = response.data.totalRecord;
            showLoading.value = 'no';
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });

    }

    function postDetail(postId){
        //  posts.value.find(currentPost=>{
        //      if (currentPost._id === postId){
        //          post.value = currentPost;
        //      }
        // });
        showLoading.value = 'yes';

        axios.get(API_BASE_URL+'api/posts/'+postId, {
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer '+token
            }
        }).then( function (response) {
            // handle success
            console.log(response.data.status)
            if (response.data.status){
                post.value = response.data.data;
                showLoading.value = 'no';
            }

        }).catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }


    function pagination (pageNumber){
        currentPage.value = pageNumber;
        getPost();
    }

    return { posts, getPost, totalRecord, pagination, currentPage, postDetail, post, showLoading}
})