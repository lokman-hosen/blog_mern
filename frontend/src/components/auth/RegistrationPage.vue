<script>
import {useAuthStore} from "@/stores/auth";
import {storeToRefs} from "pinia";

export default {
  name: 'RegistrationPage',
  setup(){
    const authStore = useAuthStore();
    const {user, validationErrors} = storeToRefs(authStore);
    const {register} = authStore;

    return {user, register, validationErrors}
  },
  methods:{
    handleSubmit(){
      this.register()
    },

    validationMessage(message){
      return 'The '+ message.replace(/[`"]+/g, '');
    },
  }
}
</script>

<template>
  <div class="row">
    <div class="col-lg-6 col-md-12 col-sm-12 m-auto">
      <form id="contact-form" class="contact__form" @submit.prevent="handleSubmit">
        <h3 class="text-md my-4">Register Here</h3>
        <div class="form-group">
          <input name="name" v-model="user.name" type="text" class="form-control" :class="{ 'is-invalid': validationErrors.name }" placeholder="Your Name">
          <span v-if="validationErrors.name" id="exampleInputEmail1-error" class="error invalid-feedback">
            {{validationMessage(validationErrors.name.message.substring(4))}}
          </span>
        </div>
        <div class="form-group">
          <input name="email" v-model="user.email" type="email" class="form-control" :class="{ 'is-invalid': validationErrors.email }" autocomplete="chrome-off" placeholder="Email Address">
          <span v-if="validationErrors.email" class="error invalid-feedback">{{validationMessage(validationErrors.email.message.substring(4))}}</span>
        </div>
        <div class="form-group">
          <input name="password" v-model="user.password" type="password" class="form-control" :class="{ 'is-invalid': validationErrors.password }" placeholder="Password">
          <span v-if="validationErrors.password" class="error invalid-feedback">{{validationMessage(validationErrors.password.message.substring(4))}}</span>
        </div>
        <button class="btn btn-main" name="submit" type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
