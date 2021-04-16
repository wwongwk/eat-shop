<template>
  <div>
    <div class="home">
      <app-header></app-header>
      <img id="homeImg" src="../assets/HomeImg.png" />
    </div>
    <div id="display">
      
      <p><span>EAT</span></p>
      <div id="eat">
        <ul>
          <li v-for="restaurant in filteredRestaurants" :key="restaurant.id">
            <div class="polaroid" v-on:click="sendData(restaurant.id, 1)">
              <img v-bind:src="restaurant.imageURL" /><br />
              <div class="container">
                <button id="names">
                  {{ restaurant.name }}
                </button>
              </div>
            </div>
          </li>
          <button id="seeMore" v-on:click="GoToEat">SEE MORE</button>
        </ul>
      </div>
      <p><span>SHOP</span></p>
      <div id="shops">
        <ul>
          <li v-for="shop in filteredShops" :key="shop.id">
            <div class="polaroid" v-on:click="sendData(shop.id, 2)">
              <img v-bind:src="shop.imageURL" /><br />
              <div class="container">
                <button id="names">
                  {{ shop.name }}
                </button>
              </div>
            </div>
          </li>
          <router-link to="/shop" tag="button" id="seeMore"
            >SEE MORE</router-link
          >
        </ul>
      </div>
      <p><span>PLAY</span></p>
      <div id="play">
        <ul>
          <li v-for="play in activities" :key="play.id">
            <div class="polaroid">
              <img v-bind:src="play.imageURL" /><br />
              <div class="container">
                <router-link to="/cart" exact id="names">{{
                  play.name
                }}</router-link>
              </div>
            </div>
          </li>
          <button id="seeMore">SEE MORE</button>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import database from "../firebase.js";
export default {
  components: {
    AppHeader: Header,
  },
  data() {
    return {
      restaurants: [],
      clicks: 0,
      shopsList: [],
      totalClicks : 0,
      activities: [
        {
          id: "#004",
          name: "Hi-roller indoor skating rink",
          imageURL:
            "https://thesmartlocal.com/wp-content/uploads/2020/08/image2.jpg",
        },
        {
          id: "#008",
          name: "Pottery Workshop at Thow Kwang Pottery Jungle",
          imageURL:
            "https://thesmartlocal.com/wp-content/uploads/2019/12/101-things-to-do-in-Singapore-2019-37.jpg",
        },
        {
          id: "#007",
          name: "The Little Things Cooking Workshop",
          imageURL:
            "https://sf2.mariefranceasia.com/wp-content/uploads/sites/7/2018/05/the-little-things-1-547x410.jpg",
        },
      ],
    };
  },

  methods: {
    fetchRestaurants: function () {
      database
        .collection("eat")
        .get()
        .then((snapshot) => {
          let restaurant = {};
          snapshot.forEach((doc) => {
            restaurant = doc.data();
            restaurant.id = doc.id;
            this.restaurants.push(restaurant);
          });
        });
    },

    fetchShops: function () {
      database
        .collection("shop")
        .get()
        .then((snapshot) => {
          let shop = {};
          snapshot.forEach((doc) => {
            shop = doc.data();
            shop.id = doc.id;
            this.shopsList.push(shop);
          });
        });
    },

    GoToEat: function () {
      this.$router.push("/eat");
    },

    //find the correct shop object and send the details to the detail page of the shop/resturant
    sendData: function (id, type) {
      if (type === 1) {
        for (var x of this.restaurants) {
          if (x["id"] === id) {
            x["menu_str"] = JSON.stringify(x["menu"]);
            this.increaseCounter(x);
            this.$router.push({ path: "/eatDetail", query: x });
            break;
          }
        }
      } else {
        for (var y of this.shopsList) {
          if (y["id"] === id) {
            y["menu_str"] = JSON.stringify(y["menu"]);
            this.$router.push({ path: "/shopDetail", query: y });
            break;
          }
        }
      }
    },

    //update the monthly clicks in the database
    increaseCounter: function (x) {
      var today = new Date();
      var month = today.getMonth(); //January is 0
      var year = today.getFullYear();

      var yearlyClicks = [];
      database
        .collection(x["type"])
        .doc(x["document_id"])
        .get()
        .then((doc) => {
          var done = false;
          console.log(doc.data().totalClicks);
          var currentArray = [];
          currentArray = doc.data().totalClicks[year];
          for (var i = 0; i < currentArray.length; i++) {
            yearlyClicks.push(currentArray[i]);
            if (i === month) {
              //clicks for that month is already added into the array
              yearlyClicks[i] += 1;
              done = true;
            }
          }
          if (!done) {
            //month clicks is not added yet -- start of the month
            yearlyClicks.push(1);
            done = true;
          }
          this.totalClicks = doc.data().totalClicks;
          this.totalClicks[year] = yearlyClicks;
          console.log(this.totalClicks);
        })
        .then(() => {
          database.collection(x["type"]).doc(x["document_id"]).update({
            totalClicks: this.totalClicks,
          });
        });
    },
  },

  computed: {
    filteredRestaurants() {
      return this.restaurants.slice(0, 3);
    },
    filteredShops() {
      return this.shopsList.slice(0, 3);
    },
  },

  created() {
    this.fetchRestaurants();
    this.fetchShops();
  },
};
</script>

<style scoped>
#homeImg {
  width: 90%;
  height: auto;
  border-radius: 0px;
}
#display {
  margin: 50px;
}

#eat {
  width: 100%;
  max-width: 90%;
  margin: 0px;
  padding: 0 px;
  box-sizing: border-box;
}

#shops {
  width: 100%;
  max-width: 90%;
  margin: 0px;
  padding: 0 px;
  box-sizing: border-box;
}

#play {
  width: 100%;
  max-width: 90%;
  margin: 0px;
  padding: 0 px;
  box-sizing: border-box;
}

ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0px;
  height: 100%;
  width: 100%;
  margin-left: 50px;
}

li {
  flex-grow: 1;
  flex-basis: 50px;
  text-align: center;
  padding: 10px;
  margin: 10px;
  font-size: 25px;
  text-align: center;
  font-weight: 10;
  //font-family: Avenir, Helvetica, Arial, sans-serif;
}
img {
  height: 200px;
  width: 100%;
  background-size: 80% 50%;
  //border-radius: 10px;
  margin: 0px;
}

div.polaroid {
  width: 250px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 20px;
  //border-radius: 10px;
  cursor: pointer;
  height: 300px;
}
div.container {
  text-align: center;
  align-content: center;
  //border-radius: 10px;
  margin: 0px;
  align-self: center;
  padding-bottom: 10px;
  width: 250px;
  height: 300px;
}
p {
  text-align: center;
  padding-left: 5%;
  font-size: 30px;
  letter-spacing: 0.1em;
  overflow: hidden;
}
p > span{
    position: relative;
    display: inline-block;
}
p > span:before, p > span:after{
    content: '';
    position: absolute;
    top: 50%;
    border-bottom: 2px solid;
    width: 100vw;
    margin: 0 20px;
}
p > span:before{
    right: 100%;
}
p > span:after{
    left: 100%;
}
#seeMore {
  font-family: Futura;
  margin-top: 90px;
  height: 40px;
  text-align: center;
  //font-family: "Avenir", Helvetica, Arial, sans-serif;
  background: #ED83A7;
  //color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  border: 0;
  transition: all 0.5s;
  border-radius: 10px;
  width: auto;
  position: relative;
}
  #seeMore::after {
    content: '\00bb';
    font-family: "Font Awesome 5 Pro";
    font-weight: 400;
    position: absolute;
    left: 85%;
    top: 31%;
    right: 5%;
    bottom: 0;
    opacity: 0;
  }
  
  #seeMore:hover {
    background: #D25A7e;
    transition: all 0.5s;
    border-radius: 10px;
    box-shadow: 0px 6px 15px #ED83A7;
    padding-right: 20px;
  }
  #seeMore:hover::after {
    opacity: 1;
    transition: all 0.5s;
  }
  


#names {
  background-color: white;
  font-size: 16px;
  border-radius: 8px;
  color: #403939;
  border: none;
  cursor: pointer;
  text-decoration: none;
  margin-left: 5px;
}
</style>