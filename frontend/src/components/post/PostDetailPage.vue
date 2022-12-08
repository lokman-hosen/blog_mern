<script>
import {usePostStore} from "@/stores/post";

export default {
  name: 'PostDetailPage',

  setup(){
    const postStore = usePostStore();
    const { postDetail } = postStore;
    return{
      postDetail
    }
  },

  methods:{
    getSinglePost(){
      //console.log(this.$route.params.id)
      console.log(this.postDetail(this.$route.params.id))
    }
  },

  created() {
    this.getSinglePost(this.$route.params.id)
  }
}
</script>

<template>
<h3>Post Detail {{$route.params.id}}</h3>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
