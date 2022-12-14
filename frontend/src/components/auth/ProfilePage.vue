<script>
import {ref} from "vue";
import {useAuthStore} from "@/stores/auth";
import {storeToRefs} from "pinia";
import {API_BASE_URL} from "@/config";
import PaginationPage from "@/components/PaginationPage";

export default {
  name: 'ProfilePage',
  components: {PaginationPage},
  setup(){
    let baseUrl= API_BASE_URL;
    const authStore = useAuthStore();
    const {user, userPosts, totalRecord, currentPage, postCategories} = storeToRefs(authStore);
    const {logoutUser, getLoginUserPost, pagination, getPostCategory} = authStore;
    const activeTab = ref('post');
    const name = ref('');
    const email = ref('');
    const modalVisibility = ref('none');
    const postData = ref({
      'title' : 'A',
      'description' : 'A',
      'categories' : 'A',
      'status' : 0,
      'image' : '',
    });

    return {activeTab, user, name, email, logoutUser, getLoginUserPost, userPosts, baseUrl, totalRecord, currentPage,
      pagination, modalVisibility, postData, getPostCategory, postCategories}
  },
  methods:{
    handleTab(currentTab){
      this.activeTab = currentTab;
      if (currentTab == 'post'){
        console.log('Lokman')
        this.getLoginUserPost()
      }
    },
    logout(){
      this.logoutUser();
    },
    changePage(page){
      console.log(page)
      this.pagination(page);
    },
    openModal(){
      if (this.modalVisibility == 'block'){
        this.modalVisibility = 'none'
      }else {
        this.modalVisibility = 'block'
      }
      this.getPostCategory()
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
                  <tr v-for="(post, index) in userPosts" :key="post._id">
                    <th scope="row">{{index+1}}</th>
                    <td><img :src="baseUrl+post.image" alt="" class="rounded" height="50" width="50"></td>
                    <td>{{post.title}}</td>
                    <td>{{post.author.name}}</td>
                    <td>{{post.status == 1 ? 'Published' : 'Pending'}}</td>
                    <td>{{post.createdAt}}</td>
                    <td>
                      <router-link :to="'post/' + post._id">
                        <i class="fa fa-eye"></i>
                      </router-link>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <PaginationPage :totalRecord="totalRecord" @change-page="changePage" :currentPage="currentPage"/>
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
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <div class="form-group mb-3">
                <label>Title<span class="text-danger">*</span></label>
                <input type="text" name="title" v-model="postData.title" class="form-control">
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group mb-3">
                <label>Categories<span class="text-danger">*</span></label>
                <select class="form-select form-control multiselect"
                        name="categories[]"
                        v-model="postData.categories"
                        multiple
                        aria-label="multiple select example">
                  <option value="">Select A</option>
                  <option value="">Select B</option>
                </select>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group mb-3">
                <label>Description<span class="text-danger">*</span></label>
                <textarea name="description" class="form-control" v-model="postData.description"></textarea>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group mb-3">
                <label htmlFor="formFile" class="form-label">Image<span class="text-danger">*</span></label>
                <input class="form-control" name="image" type="file" id="formFile">
              </div>
            </div>

          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="openModal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
