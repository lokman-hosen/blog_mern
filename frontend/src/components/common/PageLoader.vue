<template>
  <div class="overlay">
    <div class="page-loader text-center">
      <i class="fas fa-spinner fa-spin fa-3x"></i>
      <h3 class="mt-3">Loading!</h3>
    </div>
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
  left: 45%;
  top: 30%;
  position: absolute;
  z-index: 99999999;
}

.fa-spinner{
  color: white;
}

.overlay {
  position: fixed;
  /*display: none;*/
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99;
  cursor: pointer;
  user-select: none;
}


</style>
