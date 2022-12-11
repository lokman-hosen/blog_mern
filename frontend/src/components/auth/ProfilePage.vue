<script>
export default {
  name: 'ProfilePage',
}
</script>

<template>
  <div class="section blog-wrap bg-gray">
      <div class="container">
<!--        <div class="row">-->
<!--          <div class="col-3">-->
<!--            <div class="card bg-transparent">-->
<!--              <img src="https://technext.github.io/megakit-2/images/blog/blog-author.jpg" class="card-img-top" alt="...">-->
<!--              <div class="card-body">-->
<!--                <h5 class="card-title">Card title</h5>-->
<!--                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>-->
<!--              </div>-->
<!--              <ul class="list-group list-group-flush">-->
<!--                <li class="list-group-item">An item</li>-->
<!--                <li class="list-group-item">A second item</li>-->
<!--                <li class="list-group-item">A third item</li>-->
<!--              </ul>-->
<!--              <div class="card-body">-->
<!--                <a href="#" class="card-link">Card link</a>-->
<!--                <a href="#" class="card-link">Another link</a>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="col-9">-->
<!--            <div>-->
<!--              <ul class="nav nav-tabs" id="myTab" role="tablist">-->
<!--                <li class="nav-item" role="presentation">-->
<!--                  <button class="nav-link active" id="home-tab" data-toggle="tab" data-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>-->
<!--                </li>-->
<!--                <li class="nav-item" role="presentation">-->
<!--                  <button class="nav-link" id="profile-tab" data-toggle="tab" data-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>-->
<!--                </li>-->
<!--                <li class="nav-item" role="presentation">-->
<!--                  <button class="nav-link" id="contact-tab" data-toggle="tab" data-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Contact</button>-->
<!--                </li>-->
<!--              </ul>-->
<!--              <div class="tab-content" id="myTabContent">-->
<!--                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">-->
<!--                  <table class="table table-bordered">-->
<!--                    <thead>-->
<!--                    <tr>-->
<!--                      <th scope="col">#</th>-->
<!--                      <th scope="col">First</th>-->
<!--                      <th scope="col">Last</th>-->
<!--                      <th scope="col">Handle</th>-->
<!--                    </tr>-->
<!--                    </thead>-->
<!--                    <tbody>-->
<!--                    <tr>-->
<!--                      <th scope="row">1</th>-->
<!--                      <td>Mark</td>-->
<!--                      <td>Otto</td>-->
<!--                      <td>@mdo</td>-->
<!--                    </tr>-->
<!--                    <tr>-->
<!--                      <th scope="row">2</th>-->
<!--                      <td>Jacob</td>-->
<!--                      <td>Thornton</td>-->
<!--                      <td>@fat</td>-->
<!--                    </tr>-->
<!--                    <tr>-->
<!--                      <th scope="row">3</th>-->
<!--                      <td colspan="2">Larry the Bird</td>-->
<!--                      <td>@twitter</td>-->
<!--                    </tr>-->
<!--                    </tbody>-->
<!--                  </table>-->
<!--                </div>-->
<!--                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>-->
<!--                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>-->
<!--              </div>-->

<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <div class="row">
          <div class="col-3">
            <ul class="nav flex-column nav-pills border" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <div>
                <img src="https://technext.github.io/megakit-2/images/blog/blog-author.jpg" class="card-img-top" alt="...">
              </div>
              <li class="nav-link active" id="v-pills-post-tab" data-toggle="pill" data-target="#v-pills-post" type="button" role="tab" aria-controls="v-pills-post" aria-selected="true">Post</li>
              <li class="nav-link" id="v-pills-profile-tab" data-toggle="pill" data-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</li>
              <li class="nav-link" id="v-pills-messages-tab" data-toggle="pill" data-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</li>
              <li class="nav-link" id="v-pills-settings-tab" data-toggle="pill" data-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Logout</li>
            </ul>
          </div>
          <div class="col-9">
            <div class="tab-content" id="v-pills-tabContent">
              <div class="tab-pane fade show active" id="v-pills-post" role="tabpanel" aria-labelledby="v-pills-post-tab">
                <table class="table table-bordered table-sm">
                  <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
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
                  <div class="form-group">
                    <input name="name" type="text" class="form-control" placeholder="Your Name">
                  </div>
                  <div class="form-group">
                    <input name="email" type="email" class="form-control" placeholder="Email Address">
                  </div>
                  <div class="form-group">
                    <input name="password" type="password" class="form-control" placeholder="Password">
                  </div>
                  <div class="form-group-2 mb-4">
                    <textarea name="message" class="form-control" rows="4" placeholder="Your Message"></textarea>
                  </div>
                  <button class="btn btn-main" name="submit" type="submit">Submit</button>
                </form>
              </div>
              <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
              <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
