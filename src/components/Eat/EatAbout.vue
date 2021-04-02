<template>
  <div class='container'>
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
  props: ['shop'],

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
    
    get: function() {
      /* var shop = JSON.parse(localStorage.getItem("KEY"));*/

      this.description = this.shop["description"];
      this.telephone = this.shop["telephone"];
      this.openHours = this.shop["openingHours"];
      this.address = this.shop["address"];
      this.mapSrc=this.shop["mapSrc"];
    },
  },
  created() {
    this.get();


  }

};
</script>

<style scoped>
.container {
  margin-left: 20px;
}

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