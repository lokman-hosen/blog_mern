<script>
import {ref} from "vue";
import {useAuthStore} from "@/stores/auth";

export default {
  name: 'ProfilePage',
  setup(){
    const authStore = useAuthStore();
    const {user} = authStore;
    const activeTab = ref('profile')
    const name = ref('')
    const email = ref('')
    return {activeTab, user, name, email}
  },
  methods:{
    handleTab(currentTab){
      this.activeTab = currentTab

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
              <li class="nav-link" id="v-pills-settings-tab" data-toggle="pill" data-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Logout</li>
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
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
