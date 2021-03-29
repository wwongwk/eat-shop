<template>
  <div>
    <app-header></app-header>
    <h1>EAT</h1>
    <div id="carousel">
      <ul>
        <li v-for="image in resImages" :key="image.index">
          <div class="slide">
            <img
              :src="image"
              width="600px"
              height="400px"
            />
          </div>
        </li>
      </ul>
    </div>
    <br />

    <div class="btn-group">
      <button v-on:click="toggleAbout()">About</button>
      <button v-on:click="toggleReview()">Reviews</button>
      <button v-on:click="toggleReservation()">Reservation</button>
    </div>
    <h2>{{ shopName }}</h2>
    <div id="body" v-show="About">
      <eat-about v-bind:shop = "shop" ></eat-about>
    </div>

    <div id="body" v-show="Review">
      <eat-reviews v-bind:shop = "shop" ></eat-reviews>
    </div>

    <div id="body" v-show="Reservation">
      <eat-reservation v-bind:shop = "shop" ></eat-reservation>
    </div>
  </div>
</template>

<script>
import Header from "../Header.vue";
import EatAbout from "./EatAbout.vue";
import EatReservation from "./EatReservation.vue";
import EatReviews from "./EatReviews.vue";

export default {
  components: {
    AppHeader: Header,
    EatAbout: EatAbout,
    EatReservation: EatReservation,
    EatReviews: EatReviews,
  },
  data() {
    return {
      About: true,
      Review: false,
      Reservation: false,
      shopName: "",
      resImages: [],
      shop:{}

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
      this.shopName = shop["name"];
      this.resImages = shop["resImages"]
    }
  },
  created() {
      //this.get();
      console.log(this.$route.params);
      this.shop = this.$route.params;
      this.shopName = this.shop["name"];
      this.resImages = this.shop["resImages"]
  },
  destroyed() {
      localStorage.clear();
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 5px;
  margin-bottom: 10px;
  height: 69px;
  width: 100%;
  font-size: 55px;
  letter-spacing: 0.1em;
}

h2 {
  margin-left: 20px;
  text-align: left;
}

img {
  margin-left: 2px;
}

#carousel {
  width: 100%;
  height: 400px;
  overflow: scroll;
  white-space: nowrap;
  align-content: center;
}

#carousel .slide {
  display: inline-block;
}

::-webkit-scrollbar {
  display: none;
}

#body {
  text-align: justify;
  text-size-adjust: 90%;
  margin-right: 20%;
  margin-left: 20px;
}

#openHours {
  background-color: aquamarine;
  border-radius: 10px;
}

.btn-group {
  margin-left: 15px;
}

.btn-group button {
  background-color: transparent;
  border: 1px solid rgb(0, 0, 0); /* Green border */
  color: rgb(0, 0, 0); /* White text */
  padding: 10px 24px; /* Some padding */
  cursor: pointer; /* Pointer/hand icon */
  float: left; /* Float the buttons side by side */
  border-top: none;
  font-size: 18px;
}

.btn-group button:not(:last-child) {
  border-right: none; /* Prevent double borders */
}
.btn-group button:is(:first-child) {
  border-left: none; /* Prevent double borders */
}
.btn-group button:is(:last-child) {
  border-right: none; /* Prevent double borders */
}

/* Clear floats (clearfix hack) */
.btn-group:after {
  content: "";
  clear: both;
  display: table;
}

/* Add a background color on hover */
.btn-group button:hover {
  background-color: #ED83A7;
  color: rgb(255, 255, 255);
}

ul{
  list-style-type: none;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
}

li{
 flex: 1;
}
</style>