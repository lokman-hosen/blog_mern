import {computed, ref} from "vue";
import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', () => {
    const count = ref(10)
    const name = ref('Eduardo')
    const doubleCount = computed(() => count.value * 2)
    function incrementNumber() {
        count.value++
    }
    console.log(incrementNumber)

    return { count, name, doubleCount, incrementNumber }
})