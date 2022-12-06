<script>
import HomeBanner from "@/components/HomeBanner";
//import axios from "axios";
//import {API_BASE_URL} from "@/config";
import {usePostStore} from "@/stores/post";
import {storeToRefs} from "pinia";
import {API_BASE_URL} from "@/config";
export default {
  name: 'PostDetailPage',
  components: {HomeBanner},
  setup() {
     let  baseUrl= API_BASE_URL;
    const postStore = usePostStore()
    const { name, doubleCount, count, postsList} = storeToRefs(postStore)
    const { increment, getPost } = postStore

    return {
      name,
      doubleCount,
      count,
      increment,
      getPost,
      postsList,
      baseUrl
    }
  },
  methods: {
    incrementAndPrint() {
      this.increment()
      console.log('New Count:', this.count)
    },
    getPostList() {
      this.getPost()
      console.log('Total Post Count:')
    },

  },

  created() {
    this.getPostList();
  }
}
</script>


<template>
  <HomeBanner caption="Blog Article"/>
  <section class="section blog-wrap bg-gray">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="row">
            <div class="col-12">
              <div class="card-columns">
                <div class="card" v-for="post in postsList" :key="post.id">
<!--                                    <img src="https://technext.github.io/megakit-2/images/blog/1.jpg" class="card-img-top" alt="...">-->
                  <img :src="baseUrl+post.image" alt="" class="rounded" height="238" width="350">

                  <div class="card-body">
                    <h5 class="card-title">{{post.title}}</h5>
                    <p>Post By: {{post.author.name +', '+post.createdAt}}</p>
                    <p class="card-text">{{post.description}}</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
        <div class="col-lg-4">
          <div class="sidebar-wrap">
            <div class="sidebar-widget latest-post card border-0 p-4 mb-3">
              <h5>Latest Posts</h5>

              <div class="media border-bottom py-3">
                <a href="#"><img class="mr-4" src="images/blog/bt-3.jpg" alt=""></a>
                <div class="media-body">
                  <h6 class="my-2"><a href="#">Thoughtful living in los Angeles</a></h6>
                  <span class="text-sm text-muted">03 Mar 2018</span>
                </div>
              </div>

              <div class="media border-bottom py-3">
                <a href="#"><img class="mr-4" src="images/blog/bt-2.jpg" alt=""></a>
                <div class="media-body">
                  <h6 class="my-2"><a href="#">Vivamus molestie gravida turpis.</a></h6>
                  <span class="text-sm text-muted">03 Mar 2018</span>
                </div>
              </div>

              <div class="media py-3">
                <a href="#"><img class="mr-4" src="images/blog/bt-1.jpg" alt=""></a>
                <div class="media-body">
                  <h6 class="my-2"><a href="#">Fusce lobortis lorem at ipsum semper sagittis</a></h6>
                  <span class="text-sm text-muted">03 Mar 2018</span>
                </div>
              </div>
            </div>

            <div class="sidebar-widget bg-white rounded tags p-4 mb-3">
              <h5 class="mb-4">Tags</h5>

              <a href="#">Web</a>
              <a href="#">agency</a>
              <a href="#">company</a>
              <a href="#">creative</a>
              <a href="#">html</a>
              <a href="#">Marketing</a>
              <a href="#">Social Media</a>
              <a href="#">Branding</a>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-lg-8">
          <nav class="navigation pagination py-2 d-inline-block">
            <div class="nav-links">
              <a class="prev page-numbers" href="#">Prev</a>
              <span aria-current="page" class="page-numbers current">1</span>
              <a class="page-numbers" href="#">2</a>
              <a class="next page-numbers" href="#">Next</a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (min-width: 576px){
  .card-columns {
    -webkit-column-count: 2;
    -moz-column-count: 2;
    column-count: 2;
    -webkit-column-gap: 1.25rem;
    -moz-column-gap: 1.25rem;
    column-gap: 1.25rem;
    orphans: 1;
    widows: 1;
  }
}
</style>
