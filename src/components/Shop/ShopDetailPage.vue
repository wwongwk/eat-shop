<template>
  <div>
    <app-header></app-header>
    <h1>SHOP</h1>
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
      <button id="about" v-on:click="toggleAbout()">About</button>
      <button id="product" v-on:click="toggleProduct()">Products</button>
      <button id="review" v-on:click="toggleReview()">Reviews</button>
      <button id="enquiry" v-on:click="toggleEnquiry()">Get In Touch</button>
    </div>
    <div class="favName">
      <h2 id="name">{{ shopName }} &nbsp;</h2>
      <button id="favorite" v-on:click="addFavorite()">Favorite &#9825;</button>
     </div>

    <div id="body" v-show="About">
      <shop-about v-bind:shop = "shop" ></shop-about>
    </div>

    <div id="body" v-show="Product">
      <shop-product v-bind:shop = "shop" ></shop-product>
    </div>

    <div id="body" v-show="Review">
      <shop-reviews v-bind:shop = "shop" uid="uid" :loggedIn="loggedIn"></shop-reviews>
    </div>

    <div id="body" v-show="Enquiry">
      <shop-enquiry v-bind:shop = "shop" uid="uid" :loggedIn="loggedIn"></shop-enquiry>
    </div>

  </div>
</template>

<script>
import Header from "../Header.vue";
import ShopAbout from "./ShopAbout.vue";
import ShopProduct from "./ShopProduct.vue";
import ShopReviews from "./ShopReview.vue";
import ShopEnquiry from "./ShopEnquiry.vue";
import database from '../../firebase';
import firebase from 'firebase';

export default {
  components: {
    AppHeader: Header,
    ShopAbout: ShopAbout,
    ShopProduct: ShopProduct,
    ShopReviews: ShopReviews,
    ShopEnquiry: ShopEnquiry
  },
  data() {
    return {
      About: true,
      Product: false,
      Review: false,
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
      //window.history.scrollRestoration = "manual"
      this.About = true;
      this.Product = false;
      this.Review = false;
      this.Enquiry = false;
      document.getElementById("about").style.backgroundColor="#ED83A7";
      document.getElementById("about").style.color="white";
      document.getElementById("review").style.backgroundColor="white";
      document.getElementById("review").style.color="black";
      document.getElementById("product").style.backgroundColor="white";
      document.getElementById("product").style.color="black";
      document.getElementById("enquiry").style.backgroundColor="white";
      document.getElementById("enquiry").style.color="black";
    },
    toggleProduct: function () {
      //window.history.scrollRestoration = "manual"
      this.About = false;
      this.Product = true;
      this.Review = false;
      this.Enquiry = false;
      document.getElementById("product").style.backgroundColor="#ED83A7";
      document.getElementById("product").style.color="white";
      document.getElementById("review").style.backgroundColor="white";
      document.getElementById("review").style.color="black";
      document.getElementById("about").style.backgroundColor="white";
      document.getElementById("about").style.color="black";
      document.getElementById("enquiry").style.backgroundColor="white";
      document.getElementById("enquiry").style.color="black";
    },
    toggleReview: function () {
      //window.history.scrollRestoration = "manual"
      this.About = false;
      this.Product = false;
      this.Review = true;
      this.Enquiry = false;
      document.getElementById("review").style.backgroundColor="#ED83A7";
      document.getElementById("review").style.color="white";
      document.getElementById("about").style.backgroundColor="white";
      document.getElementById("about").style.color="black";
      document.getElementById("product").style.backgroundColor="white";
      document.getElementById("product").style.color="black";
      document.getElementById("enquiry").style.backgroundColor="white";
      document.getElementById("enquiry").style.color="black";
    },
    toggleEnquiry: function () {
      //window.history.scrollRestoration = "manual"
      this.About = false;
      this.Product = false;
      this.Review = false;
      this.Enquiry = true;
      document.getElementById("enquiry").style.backgroundColor="#ED83A7";
      document.getElementById("enquiry").style.color="white";
      document.getElementById("review").style.backgroundColor="white";
      document.getElementById("review").style.color="black";
      document.getElementById("product").style.backgroundColor="white";
      document.getElementById("product").style.color="black";
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
    },
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
  color: rgb(0, 0, 0); /* White text */
  padding: 10px 24px; /* Some padding */
  cursor: pointer; /* Pointer/hand icon */
  float: left; /* Float the buttons side by side */
  font-size: 18px;
  margin-right: 5px;
  border: none;
  border-radius: 5px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0);
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

/* Add a background color on hover */
.btn-group button:hover {
  background-color: #ED83A7;
  color: rgb(255, 255, 255);
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.5);
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