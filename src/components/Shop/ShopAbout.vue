<template>
  <div>
    <b>Brand Story</b>

    <p id="para">
      {{ description }}
      <br /><br /><br />
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
  props: {
    shop: []
  },

  components: {
  },
  data() {
    return {
      About: true,
      Review: false,
      Reservation: false,
      description: "",
      openHours: "", 
      address: "", 
      mapSrc:""
    };
  },
  methods: {
    
    get: function() {

      this.description = this.shop["description"];
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