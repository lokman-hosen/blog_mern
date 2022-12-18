<script>
import {ref} from "vue";
import {useAuthStore} from "@/stores/auth";
import {storeToRefs} from "pinia";
import {API_BASE_URL} from "@/config";
import PaginationPage from "@/components/PaginationPage";
import PageLoader from "@/components/PageLoader";

export default {
  name: 'ProfilePage',
  components: {PageLoader, PaginationPage},
  setup(){
    let baseUrl= API_BASE_URL;
    const authStore = useAuthStore();
    const {user, userPosts, totalRecord, currentPage, categories, post} = storeToRefs(authStore);
    const {logoutUser, getLoginUserPost, pagination, getCategory, savePost, getPostById, updatePost, resetFormValue} = authStore;

    const activeTab = ref('profile');
    const name = ref('');
    const email = ref('');
    const modalVisibility = ref('none');

    const editMode = ref('no');

    return {activeTab, user, name, email, logoutUser, getLoginUserPost, userPosts, baseUrl, totalRecord, currentPage,
      pagination, modalVisibility, post, getCategory, categories, savePost, getPostById, updatePost, editMode, resetFormValue}
  },
  methods:{
    // tab activation
    handleTab(currentTab){
      this.activeTab = currentTab;
      if (currentTab == 'post'){
        this.getLoginUserPost()
      }
    },
    logout(){
      this.logoutUser();
    },
    // pagination
    changePage(page){
      this.pagination(page);
    },
    // post create modal
    openModal(){
      //this.$refs.inputFile.value = null;
      if (this.modalVisibility == 'block'){
        this.resetFormValue(this.editMode);
        this.modalVisibility = 'none';
      }else {
        // set author and get post category list
        this.resetFormValue(this.editMode);
          //this.post.file_upload = true;
        this.getCategory();
        this.modalVisibility = 'block';
      }
    },
    // handle post file
    handleFile($event){
      this.post.image = $event.target.files[0];
      this.post.file_upload = true;
    },
    // handle post submit to save post
     handlePostSubmit(){
      if (this.editMode == 'no'){
        this.savePost(this.post);
      }else{
        this.updatePost();
      }
      this.modalVisibility = 'none'
    },
    editPost(postId){
      this.editMode = 'yes'
      this.getCategory()
      this.getPostById(postId);
      // this.post = {
      //   'title' : this.post.title,
      //   'description' : this.post.description,
      //   'categories' : [],
      //   'status' : this.post.status,
      //   'image' : '',
      //   'author' : JSON.stringify(this.post.author._id)
      // }

      this.modalVisibility = 'block'
    }
  },
  created() {
    this.name = this.user.name;
    this.email = this.user.email;
  }

}
</script>

<template>
  <div class="section blog-wrap bg-gray">

      <div class="container">
        <div class="card">
          <h5 class="card-header">DashBoard: Welcome Back, {{user.name}} !!</h5>
          <div class="card-body">
            <div class="row">
              <div class="col-3">
                <ul class="nav flex-column nav-pills border" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <div>
                    <img src="https://technext.github.io/megakit-2/images/blog/blog-author.jpg" class="card-img-top" alt="...">
                  </div>
                  <li class="nav-link"
                      :class="{ active: activeTab == 'profile' }"
                      @click="handleTab('profile')"
                      id="v-pills-profile-tab" data-toggle="pill" data-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">
                    Profile
                  </li>

                  <li class="nav-link"
                      :class="{ active: activeTab == 'post' }"
                      @click="handleTab('post')"
                      id="v-pills-post-tab" data-toggle="pill" data-target="#v-pills-post" type="button" role="tab" aria-controls="v-pills-post" aria-selected="true">Post</li>
                  <button class="btn btn-info" @click="logout">Logout</button>
                </ul>
              </div>
              <div class="col-9">
                <div class="tab-content" id="v-pills-tabContent">
                  <div class="tab-pane fade"
                       :class="{ 'show active': activeTab == 'profile' }"
                       id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                    <form id="contact-form" class="contact__form" method="post" action="mail.php">
                      <!-- form message -->
                      <div class="row">
                        <div class="col-12">
                          <div class="alert alert-success contact__msg" style="display: none" role="alert">
                            Your message was sent successfully.
                          </div>
                        </div>
                      </div>
                      <!-- end message -->
                      <div class="form-group">
                        <input name="name" type="text" v-model="name" class="form-control" placeholder="Your Name">
                      </div>
                      <div class="form-group">
                        <input name="email" type="email" v-model="email" class="form-control" placeholder="Email Address">
                      </div>
                      <div class="form-group">
                        <input name="password" type="password" class="form-control" placeholder="Password">
                      </div>
                      <button class="btn btn-main" name="submit" type="submit">Update Profile</button>
                    </form>
                  </div>

                  <div class="tab-pane fade"
                       :class="{ 'show active': activeTab == 'post' }"
                       id="v-pills-post" role="tabpanel" aria-labelledby="v-pills-post-tab">
                    <div class="text-right mb-3">
                      <button class="btn btn-info" @click="openModal">Create New</button>
                    </div>
                    <div v-if="userPosts.length > 0">
                      <table class="table table-bordered table-sm">
                        <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Img</th>
                          <th scope="col">Title</th>
                          <th scope="col">Author</th>
                          <th scope="col">Status</th>
                          <th scope="col">Published At</th>
                          <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr  v-for="(post, index) in userPosts" :key="post._id">
                          <th scope="row">{{index+1}}</th>
                          <td><img :src="baseUrl+post.image" alt="" class="rounded" height="50" width="50"></td>
                          <td>{{post.title}}</td>
                          <td>{{post.author.name}}</td>
                          <td>{{post.status == 1 ? 'Published' : 'Pending'}}</td>
                          <td>{{post.createdAt}}</td>
                          <td>
                            <router-link :to="'post/' + post._id">
                              <button class="btn btn-sm btn-info p-1"><i class="fa fa-eye"></i></button>
                            </router-link>
                            <button class="btn btn-sm btn-warning p-1 ml-1" @click="editPost(post._id)"><i class="fa fa-edit"></i></button>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                      <PaginationPage :totalRecord="totalRecord" @change-page="changePage" :currentPage="currentPage"/>
                    </div>
                    <div v-else>
                      <PageLoader></PageLoader>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
  </div>

  <!-- Modal -->
  <div class="modal" :style="{ display: modalVisibility }" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" @click="openModal" aria-label="Close">X</button>
        </div>
        <form @submit.prevent="handlePostSubmit">
        <div class="modal-body" style="min-height: 25rem">
            <div class="row" v-if="categories.length > 0">
              <div class="col-md-6">
                <div class="form-group mb-3">
                  <label>Title<span class="text-danger">*</span></label>
                  <input type="text" name="title" v-model="post.title" class="form-control" placeholder="Enter Title">
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group mb-3">
                  <label htmlFor="formFile" class="form-label">Image<span class="text-danger">*</span></label>
                  <input class="form-control" name="image"
                         ref="inputFile"
                         @change="handleFile($event)"
                         type="file" id="formFile">
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-group mb-3">
                  <label>Select Categories<span class="text-danger">*</span></label>
                  <select class="form-select form-control multiselect"
                          name="categories[]"
                          v-model="post.categories"
                          multiple
                          aria-label="multiple select example">
                    <option v-for="category in categories" :value=category._id :key="category._id" style="padding-top: 4px">{{category.title}}</option>
                  </select>

                </div>
              </div>

              <div class="col-md-12">
                <div class="form-group mb-3">
                  <label>Description<span class="text-danger">*</span></label>
                  <textarea name="description" class="form-control" v-model="post.description" placeholder="Enter Description"></textarea>
                </div>
              </div>

            </div>
            <div class="row" v-else>
              <PageLoader></PageLoader>
            </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="openModal">Close</button>
          <button type="submit" class="btn btn-primary">Save changes</button>
        </div>
        </form>
      </div>
    </div>
  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .multiselect option{
    padding-top: 3px;
    padding-bottom: 3px;
    border-bottom: 1px solid #dddddda1;
  }
  .multiselect option:hover{
    background: #dddddda1;
  }
</style>
