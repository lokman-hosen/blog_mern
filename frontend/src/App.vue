<template>
  <AppNavbar/>
  <div class="main-wrapper">
  <HomeBanner/>
  <BlogContainer/>
  </div>
  <AppFooter/>
</template>

<script>
import AppNavbar from "@/components/AppNavbar";
import AppFooter from "@/components/AppFooter";
import HomeBanner from "@/components/HomeBanner";
import BlogContainer from "@/components/BlogContainer";

export default {
  name: 'App',
  components: {
    BlogContainer,
    HomeBanner,
    AppFooter,
    AppNavbar,
  }
}
</script>

<style>
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
</style>
