<template>
  <div class="page-loader">
    <i class="fas fa-spinner fa-spin fa-3x"></i>
  </div>
</template>

<script>
export default {
  name: 'PageLoader',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-loader{
  left: 30%;
  top: 10vw;
  position: absolute;
  z-index: 99999999;
}


</style>
