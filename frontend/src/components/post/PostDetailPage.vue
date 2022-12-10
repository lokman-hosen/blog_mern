<script>
import {usePostStore} from "@/stores/post";
import {storeToRefs} from "pinia";

export default {
  name: 'PostDetailPage',

  setup(){
    const postStore = usePostStore();
    const { postDetail } = postStore;
    const { post } = storeToRefs(postStore);
    return{
      postDetail,
      post
    }
  },

  methods:{
    getSinglePost(){
      this.postDetail(this.$route.params.id)
      //console.log(this.$route.params.id)
      //console.log(this.postDetail(this.$route.params.id))

    }
  },

  created() {
    this.getSinglePost(this.$route.params.id)
    //this.postDetail(this.$route.params.id)
  },
  updated() {
    this.getSinglePost(this.$route.params.id)
    //console.log('dadasdds'+this.postDetail)
  }
}
</script>

<template>
<h3>Post Detail {{$route.params.id}}</h3>
<h3>Post Detail {{post.title}}</h3>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
