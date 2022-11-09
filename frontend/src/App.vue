<template>
  <AppNavbar/>
  <div class="main-wrapper">
  <router-view></router-view>
  </div>
  <AppFooter/>
</template>

<script>
import AppNavbar from "@/components/AppNavbar";
import AppFooter from "@/components/AppFooter";

export default {
  name: 'App',
  components: {
    AppFooter,
    AppNavbar,
  }
}
</script>

<style>
/*z*/
</style>
