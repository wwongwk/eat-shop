<template>
  <div class='aboutContainer'>
    <b>Brand Story</b>

    <p id="para">
      {{ description }}
      <br /><br /><br />
      Tel +65 {{ mobile }}
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
  data() {
    return {
      About: true,
      Review: false,
      Reservation: false,
      description: "",
      mobile: "",
      openHours: "", 
      address: "", 
      mapSrc:""
    };
  },

  methods: {
    get: function() {
      this.description = this.shop["description"];
      this.mobile = this.shop["mobile"];
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
.aboutContainer {
  width: 100%;
  margin-left: 20px;
}

#body {
  text-align: left;
  margin-left: 15px;
  margin: 0;
  padding: 0;
}

#openHours {
  background-color: aquamarine;
  border-radius: 10px;
}

.map {
  margin-bottom: 20px;
}

</style>