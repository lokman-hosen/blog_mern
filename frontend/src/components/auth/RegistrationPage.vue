<script>
import {useAuthStore} from "@/stores/auth";
import {ref} from "vue";

export default {
  name: 'RegistrationPage',
  setup(){
    const authStore = useAuthStore();
    const {register} = authStore;
    const name = ref('')
    const email = ref('')
    const password = ref('')
    return {name, email, password, register}
  },
  methods:{
    handleSubmit(){
      this.register({
        name: this.name,
        email: this.email,
        password: this.password,
      })
    }
  }
}
</script>

<template>
  <div class="row">
    <div class="col-lg-6 col-md-12 col-sm-12 m-auto">
      <form id="contact-form" class="contact__form"
            @submit.prevent="handleSubmit"
      >
        <!-- form message -->
        <div class="row">
          <div class="col-12">
            <div class="alert alert-success contact__msg" style="display: none" role="alert">
              Your message was sent successfully.
            </div>
          </div>
        </div>
        <!-- end message -->
        <h3 class="text-md my-4">Register Here</h3>
        <div class="form-group">
          <input name="name" v-model="name" type="text" class="form-control" placeholder="Your Name">
        </div>
        <div class="form-group">
          <input name="email" v-model="email" type="email" class="form-control" autocomplete="chrome-off" placeholder="Email Address">
        </div>
        <div class="form-group">
          <input name="password" v-model="password" type="password" class="form-control" placeholder="Password">
        </div>
        <button class="btn btn-main" name="submit" type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
