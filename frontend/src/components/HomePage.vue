<script>
import {usePostStore} from "@/stores/post";
import {storeToRefs} from "pinia/dist/pinia";
import {API_BASE_URL} from "@/config";

export default {
  name: "HomePage",
  setup(){
    let  baseUrl= API_BASE_URL;
    const postStore = usePostStore();
    const {getLatestPost } = postStore;
    const {showLoading, latestPosts } = storeToRefs(postStore);

    return{
      showLoading,
      getLatestPost,
      latestPosts,
      baseUrl
    }
  },

  methods: {
    limitSentence(text) {
      return text.substring(0,22) + '...'
    }

  },

  created() {
    this.getLatestPost();
  },
}
</script>
<template>
  <div class="main-wrapper ">
    <!-- Slider Start -->
    <section class="slider">
      <div class="container">
        <div class="row">
          <div class="col-lg-9 col-md-10">
            <div class="block">
              <span class="d-block mb-3 text-white text-capitalize">Prepare for new future</span>
              <h1 class="animated fadeInUp mb-5">Our work is <br>presentation of our <br>capabilities.</h1>
              <a href="#" target="_blank" class="btn btn-main animated fadeInUp btn-round-full" >Get started<i class="btn-icon fa fa-angle-right ml-2"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Section Intro Start -->

    <section class="section latest-blog bg-2">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-7 text-center">
            <div class="section-title">
              <span class="h6 text-color">Latest News</span>
              <h2 class="mt-3 content-title text-white">Latest articles to enrich knowledge</h2>
            </div>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-6 mb-5"
               v-for="latestPost in latestPosts" :key="latestPost._id"
          >
            <div class="card bg-transparent border-0">
              <img :src="baseUrl+latestPost.image" height="238" width="350"  alt="" class="rounded">

              <div class="card-body mt-2">
                <div class="blog-item-meta">
                  <a href="#" class="text-white-50 ml-2"><i class="fa fa-user mr-2"></i>{{latestPost.author.name}}<span class="ml-2 mr-2">/</span></a>
                  <a href="#" class="text-white-50"><i class="fa fa-clock mr-2"></i> {{latestPost.createdAt}}</a>
                </div>

                <h3 class="mt-3 mb-3 lh-36"><a href="#" class="text-white ">{{limitSentence(latestPost.title)}}</a></h3>
                <router-link class="btn btn-small btn-solid-border btn-round-full text-white" :to="'post/' + latestPost._id">Read More</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-70 position-relative">
      <div class="container">
        <div class="cta-block-2 bg-gray p-5 rounded border-1">
          <div class="row justify-content-center align-items-center ">
            <div class="col-lg-7">
              <span class="text-color">For Every type business</span>
              <h2 class="mt-2 mb-4 mb-lg-0">Entrust Your Project to Our Best Team of Professionals</h2>
            </div>
            <div class="col-lg-4">
              <a href="contact.html" class="btn btn-main btn-round-full float-lg-right ">Contact Us</a>
            </div>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>


<style scoped>
.slider {
  background: url('https://themewagon.github.io/megakit-2/images/bg/home-1.jpg') no-repeat;
  background-size: cover;
  background-position: 10% 0%;
  padding: 200px 0 280px 0;
  position: relative;
}
</style>