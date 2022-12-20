<template>
  <AppNavbar/>
  <div class="main-wrapper">
  <router-view></router-view>
  </div>
  <AppFooter/>
</template>

<script>
import AppNavbar from "@/components/common/AppNavbar";
import AppFooter from "@/components/common/AppFooter";

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
