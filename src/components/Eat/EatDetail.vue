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
      <button v-on:click="toggleMenu()">Menu</button>
      <button v-on:click="toggleReview()">Reviews</button>
      <button v-on:click="toggleReservation()">Reservation</button>
      
    </div>
    <div class="favName">
      <h2 id="name">{{ shopName }} &nbsp;</h2>
      <button id="favorite" v-on:click="addFavorite()">Favorite &#9825;</button>
    </div>
    <div id="body" v-show="About">
      <eat-about v-bind:shop = "shop" ></eat-about>
    </div>

    <div id="body" v-show="Review">
      <eat-reviews v-bind:shop = "shop" uid="uid" :loggedIn="loggedIn" ></eat-reviews>
    </div>

    <div id="body" v-show="Reservation">
      <eat-reservation v-bind:shop="shop" :uid="uid" :loggedIn="loggedIn" ></eat-reservation>
    </div>

    <div id="body" v-show="Menu">
      <eat-menu v-bind:shop = "shop"></eat-menu>
    </div>

  </div>
</template>

<script>
import Header from "../Header.vue";
import EatAbout from "./EatAbout.vue";
import EatReservation from "./EatReservation.vue";
import EatReviews from "./EatReviews.vue";
import EatMenu from "./EatMenu.vue";
import database from '../../firebase';
import firebase from 'firebase'

export default {
  components: {
    AppHeader: Header,
    EatAbout: EatAbout,
    EatReservation: EatReservation,
    EatReviews: EatReviews,
    EatMenu: EatMenu,
  },
  data() {
    return {
      About: true,
      Review: false,
      Reservation: false,
      Menu: false,
      shopName: "",
      resImages: [],
      shop:{},
      loggedIn: false,
      added:false,
      uid:"",
      fav:{}
    };
  },
  methods: {
    fetchDetails() {
      try {
        this.uid = firebase.auth().currentUser.uid;
        database
          .collection("users")
          .doc(this.uid)
          .get()
          .then((doc) => {
            this.loggedIn = true;
            this.fav=doc.data().favorites
            if (this.fav[this.shop["document_id"]]!=null) {
              this.added=true;
              document.getElementById("favorite").innerHTML="Favorite &#9829;";
            }
          });
      } catch (err) {
        this.loggedIn = false;
      }
    },
    toggleAbout: function () {
      this.About = true;
      this.Review = false;
      this.Reservation = false;
      this.Menu = false;
    },
    toggleReview: function () {
      this.About = false;
      this.Review = true;
      this.Reservation = false;
      this.Menu = false;
    },
    toggleReservation: function () {
      this.About = false;
      this.Review = false;
      this.Reservation = true;
      this.Menu = false;
    },
    toggleMenu: function () {
      this.About = false;
      this.Review = false;
      this.Reservation = false;
      this.Menu = true;
    },
   
    addFavorite: function () {
      //if user is not logged in,
      //alert pop-up to remind user to log in before favoriting
      if (this.loggedIn === false) {
        alert("Please log in to favorite it!");
      } else {
        if (this.added===false) {
          document.getElementById("favorite").innerHTML="Favorite &#9829;";
          this.added=true;
        } else {
          document.getElementById("favorite").innerHTML="Favorite &#9825;";
          this.added=false
        }
      }
    }
  },
  created() {
      this.shop = this.$route.query;
      this.shopName = this.shop["name"];
      this.resImages = this.shop["resImages"]
      this.fetchDetails();

  },
  destroyed() {
    if (this.loggedIn === true) {
      var document_id =this.shop["document_id"]
      if (this.added===true) {
        this.fav[document_id]={imageURL:this.shop["imageURL"], name:this.shopName, overallRating:this.shop.overallRating, type:this.shop.type} 

      } else {
        delete this.fav[document_id];
      }
        database.collection("users").doc(this.uid).update({
              //favorites: firebase.firestore.FieldValue.arrayUnion(this.fav)   
              favorites : this.fav
        });
    }
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

.favName h2 {
  margin-left: 20px;
  margin-right: 10px;
}
.favName {
  float: left;
  margin-bottom: 20px;
  white-space: nowrap;
}
.favName button, 
.favName h2 {
  display: inline-block;
}

.favName button {
  color: #ED83A7;
  font-size: 18px;
  border: none;
  background: none;
  cursor: pointer;
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
  clear: both;
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