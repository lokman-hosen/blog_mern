import {ref} from "vue";
import { defineStore } from 'pinia'
import axios from "axios";
import {API_BASE_URL} from "@/config";

export const usePostStore = defineStore('post', () => {
    let posts = ref({});
    //let post = ref({});
    let currentPage = ref(1);
    let totalRecord = ref(0);
    // get post list
    function getPost(){
        axios.get(API_BASE_URL+'api/posts?page='+currentPage.value, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGU3YzkzYjY1NGYzMDE0NzdhYmEwMSIsInVzZXJfdHlwZSI6ImFkbWluIiwiaWF0IjoxNjcwMzIwNDM3LCJleHAiOjE2NzAzMzg0Mzd9.DTF3KetVK7OltfCC3KfR0MdvUmwp0lRZLNsUoVkySAo'
            },
        }).then(response => {
                posts.value = response.data.data;
                totalRecord.value = response.data.totalRecord;
                //this.totalPage = Number.isInteger(response.data.totalRecord/10) ? response.data.totalRecord/10 : response.data.totalRecord/10 +1
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });

    }

    function postDetail(postId){
        console.log(postId)
        //return posts;
    }

    function pagination (pageNumber){
        console.log('current page-'+ pageNumber)
        currentPage.value = pageNumber;
        getPost();
    }

    return { posts, getPost, totalRecord, pagination, currentPage, postDetail}
})