<script>
import HomeBanner from "@/components/HomeBanner";
//import axios from "axios";
//import {API_BASE_URL} from "@/config";
import {usePostStore} from "@/stores/post";
import {storeToRefs} from "pinia";
import {API_BASE_URL} from "@/config";
import PaginationPage from "@/components/PaginationPage";
import PageLoader from "@/components/PageLoader";
import PostComponent from "@/components/post/PostComponent";
export default {
  name: 'PostDetailPage',
  components: {PostComponent, PageLoader, PaginationPage, HomeBanner},
  setup() {
    let baseUrl= API_BASE_URL;
    const postStore = usePostStore();
    const {posts, totalRecord, currentPage} = storeToRefs(postStore);
    const { getPost, pagination } = postStore;

    return {
      getPost,
      posts,
      totalRecord,
      pagination,
      currentPage,
      baseUrl
    }
  },
  methods: {
    getPostList() {
      this.getPost();
    },
    changePage(page){
      this.pagination(page);
    }
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
              <template v-if="posts.length > 0">
                <div class="card-columns">
                  <PostComponent :posts="posts" :baseUrl="baseUrl"/>
                </div>
                <PaginationPage :totalRecord="totalRecord" @change-page="changePage" :currentPage="currentPage"/>
              </template>
              <div v-else>
              <PageLoader/>
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
