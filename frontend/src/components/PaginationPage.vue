<script>
export default {
  props: ['totalRecord', 'currentPage'],
  name: 'PaginationPage',

  data() {
    return{
      pages: [],
    }
  },
  methods: {
      totalPages() {
       const pageNumbers = [];
       let totalPageNumber = Number.isInteger(this.totalRecord/5) ? this.totalRecord/5 : (this.totalRecord/5 +1).toString().split(".")[0];
       for (let i = 1; i <= totalPageNumber; i++) {
         pageNumbers.push(i);
      }
       this.pages = pageNumbers
    },

  },

  created() {
      this.totalPages()
  },
  beforeUpdate() {
    this.totalPages()
  },

}
</script>


<template>
  <nav class="navigation pagination py-2 d-inline-block">
    <div class="nav-links">
      <a class="prev page-numbers" href="#">Prev</a>
          <a role="button" v-for="page in pages" :key="page" class="page-numbers" @click="$emit('changePage', page)">
            <span aria-current="page" :class="`page-numbers ${page == currentPage ? 'current' : ''}`">{{page}}</span>
          </a>
      <a class="next page-numbers" href="#">Next</a>
    </div>
  </nav>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-numbers:hover{
  cursor: pointer;
}
</style>
