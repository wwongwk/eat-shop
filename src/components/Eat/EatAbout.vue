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
    <span id="openHours"> Opening Hours:</span> <span>{{ openHours }}</span>
    <p>{{ address }}</p>

    <div class="map">
      <iframe
        id="gMap"
        :src="mapSrc"
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
      mapSrc:""
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
      this.openHours = shop["openingHours"];
      this.address = shop["address"];
      this.mapSrc=shop["mapSrc"];
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

.map {
  margin-bottom: 20px;
}

</style>