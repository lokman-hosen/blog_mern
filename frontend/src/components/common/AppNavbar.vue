<script>
import {useAuthStore} from "@/stores/auth";
import {storeToRefs} from "pinia";

export default {
  name: 'AppNavbar',
  setup(){
    const authStore = useAuthStore();
    const {user, loggedIn} = storeToRefs(authStore);
    return {user, loggedIn};
  }
}
</script>

<template>
  <header class="navigation">
    <div class="header-top ">
      <div class="container">
        <div class="row justify-content-between align-items-center">
          <div class="col-lg-2 col-md-4">
            <div class="header-top-socials text-center text-lg-left text-md-left">
              <a href="https://www.facebook.com/themefisher" target="_blank"><i class="ti-facebook"></i></a>
              <a href="https://twitter.com/themefisher" target="_blank"><i class="ti-twitter"></i></a>
              <a href="https://github.com/themefisher/" target="_blank"><i class="ti-github"></i></a>
            </div>
          </div>
          <div class="col-lg-10 col-md-8 text-center text-lg-right text-md-right">
            <div class="header-top-info">
              <a href="tel:+23-345-67890">Call Us : <span>+23-345-67890</span></a>
              <a href="mailto:support@gmail.com" ><i class="fa fa-envelope mr-2"></i><span>support@gmail.com</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg  py-4" id="navbar">
      <div class="container">
        <a class="navbar-brand" href="index.html">
          Write<span>read.</span>
        </a>

        <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
          <span class="fa fa-bars"></span>
        </button>

        <div class="collapse navbar-collapse text-center" id="navbarsExample09">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
<!--              <a class="nav-link" href="index.html">Home <span class="sr-only">(current)</span></a>-->
            </li>
            <li class="nav-item dropdown">
              <router-link to="/about" class="nav-link">About</router-link>

            </li>
            <router-link to="/post" class="nav-link">Blog</router-link>
            <router-link to="/contact" class="nav-link">Contact</router-link>
            <li class="nav-item" v-if="loggedIn == 'no'">
              <router-link to="/register" class="nav-link">Register</router-link>
            </li>

            <li class="nav-item" v-if="loggedIn == 'yes'">
              <router-link  to="/profile" class="nav-link">Profile</router-link>
            </li>
            <li class="nav-item" v-if="loggedIn == 'no'">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
          </ul>

          <form class="form-lg-inline my-2 my-md-0 ml-lg-4 text-center">
            <router-link to="/contact" class="btn btn-solid-border btn-round-full">Get a Quote</router-link>
          </form>
        </div>
      </div>
    </nav>
  </header>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
