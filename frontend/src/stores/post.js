import {computed, ref} from "vue";
import { defineStore } from 'pinia'
import axios from "axios";
import {API_BASE_URL} from "@/config";
//import {API_BASE_URL} from "@/config";

export const usePostStore = defineStore('post', () => {
    const count = ref(10)
    let name = ref('Eduardo')
    let postsList = ref({});
    const doubleCount = computed(() => count.value * 2)
    function increment() {
        count.value++
    }

    function getPost(){
        axios.get(API_BASE_URL+'api/posts?page='+this.currentPage, {
            // axios.get(`${API_BASE_URL}api/posts`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGU3YzkzYjY1NGYzMDE0NzdhYmEwMSIsInVzZXJfdHlwZSI6ImFkbWluIiwiaWF0IjoxNjcwMzIwNDM3LCJleHAiOjE2NzAzMzg0Mzd9.DTF3KetVK7OltfCC3KfR0MdvUmwp0lRZLNsUoVkySAo'
            },
        })
            .then(response => {
                postsList.value = response.data.data;
                //this.totalRecord = response.data.totalRecord;
                //this.totalPage = Number.isInteger(response.data.totalRecord/10) ? response.data.totalRecord/10 : response.data.totalRecord/10 +1
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });

    }
   // console.log(increment)

    return { count, name, doubleCount, postsList, increment, getPost}
})