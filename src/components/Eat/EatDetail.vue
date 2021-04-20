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
    <div class="container">
      <div class="btn-group">
        <button id="about" v-on:click="toggleAbout()">About</button>
        <button id="menu" v-on:click="toggleMenu()">Menu</button>
        <button id="review" v-on:click="toggleReview()">Reviews</button>
        <button id="reservation" v-on:click="toggleReservation()">Reservation</button>
        <button id="enquiry" v-on:click="toggleEnquiry()">Get In Touch</button>
      </div>
      <div class="favName">
        <h2 id="body">{{ shopName }} &nbsp;</h2>
        <button id="favorite" v-on:click="addFavorite()">Favorite &#9825;</button>
      </div><br>

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

      <div id="body" v-show="Enquiry">
        <eat-enquiry v-bind:shop = "shop"></eat-enquiry>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../Header.vue";
import EatAbout from "./EatAbout.vue";
import EatReservation from "./EatReservation.vue";
import EatReviews from "./EatReviews.vue";
import EatMenu from "./EatMenu.vue";
import EatEnquiry from "./EatEnquiry.vue";
import database from '../../firebase';
import firebase from 'firebase'

export default {
  components: {
    AppHeader: Header,
    EatAbout: EatAbout,
    EatReservation: EatReservation,
    EatReviews: EatReviews,
    EatMenu: EatMenu,
    EatEnquiry: EatEnquiry,
  },
  data() {
    return {
      About: true,
      Review: false,
      Reservation: false,
      Menu: false,
      Enquiry: false,

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
      this.Enquiry = false;
      document.getElementById("about").style.backgroundColor="#ED83A7";
      document.getElementById("about").style.color="white";
      document.getElementById("review").style.backgroundColor="white";
      document.getElementById("review").style.color="black";
      document.getElementById("reservation").style.backgroundColor="white";
      document.getElementById("reservation").style.color="black";
      document.getElementById("menu").style.backgroundColor="white";
      document.getElementById("menu").style.color="black";
      document.getElementById("enquiry").style.backgroundColor="white";
      document.getElementById("enquiry").style.color="black";
    },
    toggleReview: function () {
      this.About = false;
      this.Review = true;
      this.Reservation = false;
      this.Menu = false;
      this.Enquiry = false;
      document.getElementById("review").style.backgroundColor="#ED83A7";
      document.getElementById("review").style.color="white";
      document.getElementById("about").style.backgroundColor="white";
      document.getElementById("about").style.color="black";
      document.getElementById("reservation").style.backgroundColor="white";
      document.getElementById("reservation").style.color="black";
      document.getElementById("menu").style.backgroundColor="white";
      document.getElementById("menu").style.color="black";
      document.getElementById("enquiry").style.backgroundColor="white";
      document.getElementById("enquiry").style.color="black";
    },
    toggleReservation: function () {
      this.About = false;
      this.Review = false;
      this.Reservation = true;
      this.Menu = false;
      this.Enquiry = false;
      document.getElementById("reservation").style.backgroundColor="#ED83A7";
      document.getElementById("reservation").style.color="white";
      document.getElementById("review").style.backgroundColor="white";
      document.getElementById("review").style.color="black";
      document.getElementById("about").style.backgroundColor="white";
      document.getElementById("about").style.color="black";
      document.getElementById("menu").style.backgroundColor="white";
      document.getElementById("menu").style.color="black";
      document.getElementById("enquiry").style.backgroundColor="white";
      document.getElementById("enquiry").style.color="black";
    },
    toggleMenu: function () {
      this.About = false;
      this.Review = false;
      this.Reservation = false;
      this.Menu = true;
      this.Enquiry = false;
      document.getElementById("menu").style.backgroundColor="#ED83A7";
      document.getElementById("menu").style.color="white";
      document.getElementById("review").style.backgroundColor="white";
      document.getElementById("review").style.color="black";
      document.getElementById("reservation").style.backgroundColor="white";
      document.getElementById("reservation").style.color="black";
      document.getElementById("about").style.backgroundColor="white";
      document.getElementById("about").style.color="black";
      document.getElementById("enquiry").style.backgroundColor="white";
      document.getElementById("enquiry").style.color="black";
    },
    toggleEnquiry: function() {
      this.About = false;
      this.Review = false;
      this.Reservation = false;
      this.Menu = false;
      this.Enquiry = true;
      document.getElementById("enquiry").style.backgroundColor="#ED83A7";
      document.getElementById("enquiry").style.color="white";
      document.getElementById("review").style.backgroundColor="white";
      document.getElementById("review").style.color="black";
      document.getElementById("reservation").style.backgroundColor="white";
      document.getElementById("reservation").style.color="black";
      document.getElementById("menu").style.backgroundColor="white";
      document.getElementById("menu").style.color="black";
      document.getElementById("about").style.backgroundColor="white";
      document.getElementById("about").style.color="black";
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
      this.resImages = this.shop["resImages"];
      this.fetchDetails();

  },
  beforeDestroy() {
    if (this.loggedIn === true) {
      var document_id =this.shop["document_id"]
      if (this.added===true) {
        this.fav[document_id]={imageURL:this.shop["imageURL"], name:this.shopName, overallRating:this.shop.overallRating, type:this.shop.type} 
      } else {
        delete this.fav[document_id];
      }
      database.collection("users").doc(this.uid).update({
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
.belowName {
  display: flex;
  text-align: left;
  clear:both;
  margin-bottom: 20px;
  margin-left: 20px;
}
#mapIcon {
  width: 15px;
  height: 15px;
  vertical-align: middle;
  margin-left: 20px;
}
img {
  margin-left: 2px;
  width: 500px;
}

#carousel {
  width: 90%;
  height: 400px;
  overflow: scroll;
  white-space: nowrap;
  align-content: center;
  margin-left: 70px;
}

#carousel .slide {
  display: inline-block;
}

::-webkit-scrollbar {
  display: none;
}
.container {
  width: 90%;
  margin-left:60px;
}
#body {
  text-align: justify;
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
  color: rgb(0, 0, 0); 
  padding: 10px 20px; 
  cursor: pointer; 
  float: left; 
  font-size: 18px;
  margin-right: 5px;
  border: none;
  border-radius: 5px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  height: 40px;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
  border: 0;
  transition: all 0.5s;
  border-radius: 10px;
  width: auto;
  position: relative;
}
  .btn-group button::after {
    font-weight: 400;
    position: absolute;
    left: 85%;
    top: 31%;
    right: 5%;
    bottom: 0;
    opacity: 0;
    
  }
  
  .btn-group button:hover {
    background: #D25A7e;
    transition: all 0.5s;
    border-radius: 10px;
    box-shadow: 0px 6px 15px #ED83A7;
    padding-right: 10px;
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .btn-group button:hover::after {
    opacity: 1;
    transition: all 0.5s;
    
  }

#about {
  background-color: #ED83A7;
  color: #fff;
}

/* Clear floats (clearfix hack) */
.btn-group:after {
  content: "";
  clear: both;
  display: table;
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