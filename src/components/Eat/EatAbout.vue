<template>
  <div>
    <b>Brand Story</b>

    <p id="para">
      {{ description }}
      <br /><br /><br />
      Tel +65 {{ telephone }}
    </p>
    <br /><br />

    <b>Address</b> <br />
    <span id="openHours"> Opening Hours: </span> <span>{{ openHours }}</span>
    <p>{{ address }}</p>

    <div class="map">
      <iframe
        id="gMap"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7796589646164!2d103.85417521404425!3d1.307396999046445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19b25f661e0b%3A0xae1f2871fd73a0f9!2sSum%20Dim%20Sum!5e0!3m2!1sen!2ssg!4v1616766985854!5m2!1sen!2ssg"
        width="800"
        height="500"
        style="border: 0"
        allowfullscreen=""
        loading="lazy">
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      About: true,
      Review: false,
      Reservation: false,
      description: "",
      telephone: "",
      openHours: "", 
      address: "", 
    };
  },
  methods: {
    toggleAbout: function () {
      //window.history.scrollRestoration = "manual"
      this.About = true;
      this.Review = false;
      this.Reservation = false;
    },
    toggleReview: function () {
      //window.history.scrollRestoration = "manual"
      this.About = false;
      this.Review = true;
      this.Reservation = false;
    },
    toggleReservation: function () {
      //window.history.scrollRestoration = "manual"
      this.About = false;
      this.Review = false;
      this.Reservation = true;
    },
    get: function() {
      var shop = JSON.parse(localStorage.getItem("KEY"));
      console.log(shop)
      this.description = shop["description"];
      this.telephone = shop["telephone"];
      this.openHours = shop["openHours"];
      this.address = shop["address"];
    },
  },
  created() {
    this.get();
  }

};
</script>

<style scoped>

#body {
  text-align: justify;
  text-size-adjust: 90%;
  margin-right: 20%;
  margin-left: 15px;
}

#openHours {
  background-color: aquamarine;
  border-radius: 10px;
}

</style>