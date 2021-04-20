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
    
    <div class="container">
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
      address: "",
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
      this.resImages = this.shop["resImages"];
      this.address = this.shop["address"];
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
  overflow: hidden;
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