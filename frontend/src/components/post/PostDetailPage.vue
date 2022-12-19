<script>
import {usePostStore} from "@/stores/post";
import {storeToRefs} from "pinia";
import {API_BASE_URL} from "@/config";
import PageLoader from "@/components/common/PageLoader";

export default {
  name: 'PostDetailPage',
  components: {PageLoader},
  setup(){
    let  baseUrl= API_BASE_URL;
    const postStore = usePostStore();
    const { postDetail } = postStore;
    const { post, posts, showLoading } = storeToRefs(postStore);
    return{
      postDetail,
      post,
      baseUrl,
      posts,
      showLoading
    }
  },

  methods:{
    getSinglePost(){
      this.postDetail(this.$route.params.id)
    },
    // load new post detail when click on sidebar Latest post
    singlePost(postId){
      // change url
      this.$router.push("/post/"+postId);
      this.postDetail(postId);
    }
  },

  created() {
    this.getSinglePost(this.$route.params.id)
  },
}
</script>

<template>
  <section class="section blog-wrap bg-gray">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="row" v-if="showLoading == 'no' ">
            <div class="col-lg-12 mb-5">
              <div class="single-blog-item">
                <img :src="baseUrl+post.image" alt="" class="img-fluid rounded">

                <div class="blog-item-content bg-white p-5">
                  <div class="blog-item-meta bg-gray py-1 px-2">
                    <span class="text-muted text-capitalize mr-3"><i class="ti-pencil-alt mr-2"></i>Post By: {{post.author.name}}</span>
                    <span class="text-muted text-capitalize mr-3"><i class="ti-comment mr-2"></i>5 Comments</span>
                    <span class="text-black text-capitalize mr-3"><i class="ti-time mr-1"></i> Posted On: {{post.createdAt}}</span>
                  </div>

                  <h2 class="mt-3 mb-4">{{post.title}}</h2>
                  <p>{{post.description}}</p>

                  <div class="tag-option mt-5 clearfix">
                    <ul class="float-left list-inline">
                      <li>Categories:</li>
                      <li class="list-inline-item" v-for="(category, index) in post.categories" :key="category._id">
                        <a href="#" rel="tag">{{index+1}}. {{category.title}}</a>
                      </li>
                    </ul>

                    <ul class="float-right list-inline">
                      <li class="list-inline-item"> Share: </li>
                      <li class="list-inline-item"><a href="#" target="_blank"><i class="fab fa-facebook-f" aria-hidden="true"></i></a></li>
                      <li class="list-inline-item"><a href="#" target="_blank"><i class="fab fa-twitter" aria-hidden="true"></i></a></li>
                      <li class="list-inline-item"><a href="#" target="_blank"><i class="fab fa-pinterest-p" aria-hidden="true"></i></a></li>
                      <li class="list-inline-item"><a href="#" target="_blank"><i class="fab fa-google-plus" aria-hidden="true"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-12 mb-5">
              <div class="comment-area card border-0 p-5">
                <h4 class="mb-4">2 Comments</h4>
                <ul class="comment-tree list-unstyled">
                  <li class="mb-5">
                    <div class="comment-area-box">
                      <img alt="" src="images/blog/test1.jpg" class="img-fluid float-left mr-3 mt-2">

                      <h5 class="mb-1">Philip W</h5>
                      <span>United Kingdom</span>

                      <div class="comment-meta mt-4 mt-lg-0 mt-md-0 float-lg-right float-md-right">
                        <a href="#"><i class="icofont-reply mr-2 text-muted"></i>Reply |</a>
                        <span class="date-comm">Posted October 7, 2018 </span>
                      </div>

                      <div class="comment-content mt-3">
                        <p>Some consultants are employed indirectly by the client via a consultancy staffing company, a company that provides consultants on an agency basis. </p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div class="comment-area-box">
                      <img alt="" src="images/blog/test2.jpg" class="mt-2 img-fluid float-left mr-3">

                      <h5 class="mb-1">Philip W</h5>
                      <span>United Kingdom</span>

                      <div class="comment-meta mt-4 mt-lg-0 mt-md-0 float-lg-right float-md-right">
                        <a href="#"><i class="icofont-reply mr-2 text-muted"></i>Reply |</a>
                        <span class="date-comm">Posted October 7, 2018</span>
                      </div>

                      <div class="comment-content mt-3">
                        <p>Some consultants are employed indirectly by the client via a consultancy staffing company, a company that provides consultants on an agency basis. </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-lg-12">
              <form class="contact-form bg-white rounded p-5" id="comment-form">
                <h4 class="mb-4">Write a comment</h4>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <input class="form-control" type="text" name="name" id="name" placeholder="Name:">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <input class="form-control" type="text" name="mail" id="mail" placeholder="Email:">
                    </div>
                  </div>
                </div>


                <textarea class="form-control mb-3" name="comment" id="comment" cols="30" rows="5" placeholder="Comment"></textarea>

                <input class="btn btn-main btn-round-full" type="submit" name="submit-contact" id="submit_contact" value="Submit Message">
              </form>
            </div>
          </div>

          <div class="row" v-else>
            <PageLoader></PageLoader>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="sidebar-wrap">
            <div class="sidebar-widget card border-0 mb-3">
              <img src="https://technext.github.io/megakit-2/images/blog/blog-author.jpg" alt="" class="img-fluid">
              <div class="card-body p-4 text-center">
                <h5 class="mb-0 mt-4">{{post.author.name}}</h5>
                <p>Author</p>
                <p>Email: {{post.author.email}}</p>

                <ul class="list-inline author-socials">
                  <li class="list-inline-item mr-3">
                    <a href="#"><i class="fab fa-facebook-f text-muted"></i></a>
                  </li>
                  <li class="list-inline-item mr-3">
                    <a href="#"><i class="fab fa-twitter text-muted"></i></a>
                  </li>
                  <li class="list-inline-item mr-3">
                    <a href="#"><i class="fab fa-linkedin-in text-muted"></i></a>
                  </li>
                  <li class="list-inline-item mr-3">
                    <a href="#"><i class="fab fa-pinterest text-muted"></i></a>
                  </li>
                  <li class="list-inline-item mr-3">
                    <a href="#"><i class="fab fa-behance text-muted"></i></a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="sidebar-widget latest-post card border-0 p-4 mb-3">
              <h5>Latest Posts</h5>

              <div v-if="posts.length > 0">
                <div class="media border-bottom py-3" v-for="(latestPost, index) in posts" :key="latestPost._id" >
                  <a v-if="index <= 4" @click="singlePost(latestPost._id)">
                    <img class="mr-4" :src="baseUrl+latestPost.image" width="87" height="70" alt="">

                    <div class="media-body">
                      <h6 class="my-2"><a href="#">{{latestPost.title}}</a></h6>
                      <span class="text-sm text-muted">{{latestPost.createdAt}}</span>
                    </div>
                  </a>
                </div>
              </div>

              <div v-else>
                <PageLoader></PageLoader>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
