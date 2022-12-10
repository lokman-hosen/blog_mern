<script>
export default {
  props: ['posts', 'baseUrl'],
  name: "PostComponent"
}
</script>

<template>

    <div class="card" v-for="post in this.posts" :key="post._id">
      <router-link :to="'post/' + post._id">
      <img :src="baseUrl+post.image" alt="" class="rounded" height="238" width="350">
      <div class="card-body">
        <h5 class="card-title">{{post.title}}</h5>
        <p>Post By: {{post.author.name +', '+post.createdAt}}</p>
        <p class="card-text">{{post.description}}</p>
      </div>
      </router-link>
    </div>

</template>

<style scoped>

</style>