<script>
export default {
  props: ['totalRecord', 'currentPage'],
  name: 'PaginationPage',

  data() {
    return{
      pages: 1,
      //totalPageNumber: 0,
      //currentPage: this.currentPage,
      //totalRecord: this.totalRecord,
    }
  },
  methods: {
      totalPages() {
       this.pages = 5;
       console.log(Number.isInteger(this.totalRecord/5) ? this.totalRecord/5 : this.totalRecord/5 +1)
       //const pageNumbers = Number.isInteger(this.totalRecord/5) ? this.totalRecord/5 : this.totalRecord/5 +1;
       //this.pages = 9/5;
       //const pageNumbers = [];
       //let totalPageNumber = Number.isInteger(this.totalRecord/5) ? this.totalRecord/5 : this.totalRecord/5 +1;
      //  for (let i = 1; i <= 5; i++) {
      //    pageNumbers.push(i);
      // }

       //console.log('pageNumbers'+pageNumbers);
       //this.pages = pageNumbers
    },


  },
  async created() {
    await this.totalPages()
  }

}
</script>


<template>
  <nav class="navigation pagination py-2 d-inline-block">
    <div class="nav-links">
      <a class="prev page-numbers" href="#">Prev</a>
          <a role="button" v-for="page in pages" :key="page" class="page-numbers">
            <span aria-current="page" :class="`page-numbers ${page == currentPage ? 'current' : ''}`">{{page}}</span>
          </a>
      <a class="next page-numbers" href="#">Next</a>
    </div>
  </nav>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
