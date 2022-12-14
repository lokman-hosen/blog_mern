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
    const {user, userPosts, totalRecord, currentPage} = storeToRefs(authStore);
    const {logoutUser, getLoginUserPost, pagination} = authStore;
    const activeTab = ref('profile')
    const name = ref('')
    const email = ref('')

    return {activeTab, user, name, email, logoutUser, getLoginUserPost, userPosts, baseUrl, totalRecord, currentPage, pagination}
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
                <table class="table table-bordered table-sm">
                  <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Img</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Status</th>
                    <th scope="col">Published At</th>
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
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
