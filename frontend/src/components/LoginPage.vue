<template>
  <div class="row">
    <div class="col-lg-6 col-md-12 col-sm-12 m-auto">
      <form id="contact-form" class="contact__form" method="post" action="mail.php">
        <!-- form message -->
        <div class="row">
          <div class="col-12">
            <div class="alert alert-success contact__msg" style="display: none" role="alert">
              Your message was sent successfully.
            </div>
          </div>
        </div>
        <!-- end message -->
        <h3 class="text-md my-5">Login Here</h3>
        <div class="form-group">
          <input name="email" type="email" class="form-control" placeholder="Email Address">
        </div>
        <div class="form-group">
          <input name="password" type="password" class="form-control" placeholder="Password">
        </div>
        <button class="btn btn-main" name="submit" type="submit">Submit</button>
      </form>
    </div>
  </div>

</template>

<script>
export default {
  name: 'LoginPage',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
