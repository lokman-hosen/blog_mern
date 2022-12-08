<script>
export default {
  props: ['posts', 'baseUrl'],
  name: "PostComponent"
}
</script>

<template>
  <router-link to="post/635ccb0fd23ddaeb32ec2cfb" >
    <div class="card" v-for="post in this.posts" :key="post.id">
      <img :src="baseUrl+post.image" alt="" class="rounded" height="238" width="350">
      <div class="card-body">
        <h5 class="card-title">{{post.title}}</h5>
        <p>Post By: {{post.author.name +', '+post.createdAt}}</p>
        <p class="card-text">{{post.description}}</p>
      </div>
    </div>
  </router-link>
</template>

<style scoped>

</style>