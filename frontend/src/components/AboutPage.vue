<script>
import HomeBanner from "@/components/HomeBanner";
export default {
  name: 'AboutPage',
  components: {HomeBanner},
}
</script>

<template>
  <HomeBanner caption="Our blog" title="Blog Articles" breadCamp="Our blog"></HomeBanner>
  <section class="section about-2 position-relative">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-6">
          <div class="about-item pr-3 mb-5 mb-lg-0">
            <span class="h6 text-color">What we are</span>
            <h2 class="mt-3 mb-4 position-relative content-title">We are dynamic team of creative people</h2>
            <p class="mb-5">We provide consulting services in the area of IFRS and management reporting, helping companies to reach their highest level. We optimize business processes, making them easier.</p>

            <a href="#" class="btn btn-main btn-round-full">Get started</a>
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <div class="about-item-img">
            <img src="https://themewagon.github.io/megakit-2/images/about/home-7.jpg" alt="" class="img-fluid">
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="about-info section pt-0">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-4 col-md-6 col-sm-6">
          <div class="about-info-item mb-4 mb-lg-0">
            <h3 class="mb-3"><span class="text-color mr-2 text-md ">01.</span>Our Mission</h3>
            <p>llum similique ducimus accusamus laudantium praesentium, impedit quaerat, itaque maxime sunt deleniti voluptas distinctio .</p>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-6">
          <div class="about-info-item mb-4 mb-lg-0">
            <h3 class="mb-3"><span class="text-color mr-2 text-md">02.</span>Vission</h3>
            <p>llum similique ducimus accusamus laudantium praesentium, impedit quaerat, itaque maxime sunt deleniti voluptas distinctio .</p>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-6">
          <div class="about-info-item mb-4 mb-lg-0">
            <h3 class="mb-3"><span class="text-color mr-2 text-md">03.</span>Our Approach</h3>
            <p>llum similique ducimus accusamus laudantium praesentium, impedit quaerat, itaque maxime sunt deleniti voluptas distinctio .</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
