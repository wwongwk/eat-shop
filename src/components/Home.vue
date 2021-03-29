<template>
  <div>
    <div class="home">
      <app-header></app-header>
      <img id="homeImg" src="../assets/TopPic.png" />
    </div>
    <div id='display'>
    <h3>EAT</h3>
    <div id="eat">
      <ul>
        <li v-for="restaurant in filteredRestaurants" :key="restaurant.id">
          <div class="polaroid">
            <img v-bind:src="restaurant.imageURL" /><br />
            <div class="container">
              <router-link to="/eatDetailTemplate" exact>
                <button id="names" v-on:click="sendData(restaurant.id)">
                {{ restaurant.name }}
                </button>
              </router-link>
            </div>
          </div>
        </li>
        <button id="seeMore" v-on:click="GoToEat">See More</button>
      </ul>
    </div>
    <h3>SHOP</h3>
    <div id="shops">
      <ul>
        <li v-for="shop in shopsList" :key="shop.id">
          <div class="polaroid">
            <img v-bind:src="shop.imageURL" /><br />
            <div class="container">
              <router-link to="/cart" exact id="names">{{ shop.name }}</router-link>
            </div>
          </div>
        </li>
        <button id="seeMore">See More</button>
      </ul>
    </div>
    <h3>PLAY</h3>
    <div id="play">
      <ul>
        <li v-for="play in activities" :key="play.id">
          <div class="polaroid">
            <img v-bind:src="play.imageURL" /><br />
            <div class="container">
              <router-link to="/cart" exact id="names">{{ play.name }}</router-link>
            </div>
          </div>
        </li>
        <button id="seeMore">See More</button>
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

      shopsList: [
        {
          id: "#003",
          name: "Overjoyed",
          imageURL:
            "https://thesmartlocal.com/images/easyblog_articles/6880/b2ap3_large_crafts---overjoyed.png",
        },
        {
          id: "#005",
          name: "Curious Creatures",
          imageURL:
            "https://static.thehoneycombers.com/wp-content/uploads/sites/2/2018/08/curious-creatures.png",
        },
        {
          id: "#004",
          name: "The Tinsel Rack",
          imageURL:
            "https://static.thehoneycombers.com/wp-content/uploads/sites/2/2020/03/the-tinsel-rack.png",
        },
      ],
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
            //console.log(doc.data());
            localStorage.clear();
          });
        });
    },

    GoToEat: function () {
      this.$router.push("/eat");
    },

    sendData: function (id) {
      //console.log(id);
      for (var x of this.restaurants) {
        //console.log(x)
        if (x["id"] === id) {
          console.log(x);
          localStorage.setItem("KEY", JSON.stringify(x));
        }
      }
    },
  },

  computed: {
    filteredRestaurants() {
      return this.restaurants.slice(0, 3);
    },
  },

  created() {
    this.fetchRestaurants();
  },
};
</script>

<style scoped>
#homeImg {
  width: 90%;
  height: auto;
}
#display {
  margin: 20px;;
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
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  margin: 10px;
  font-size: 25px;
  text-align: center;
  font-weight: 10;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

img {
  height: 150px;
  width: 100%;
  background-size: 80% 50%;
  border-radius: 10px;
  margin: 0px;
}

div.polaroid {
  width: 200px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 10px;
  border-radius: 10px;

}
div.container {
  text-align: center;
  align-content: center;
  border-radius: 10px;
  margin: 0px;
  align-self: center;
  padding-bottom:10px;
  width: 200px;
}
h3 {
  text-align: left;
  padding-left: 5%;
  color: #ED83A7;
  font-size: 30px;
  letter-spacing: 0.1em;
}
#seeMore {
  background-color: #ED83A7;
  border: none;
  color: #403939;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  font-size: 15px;
  padding-right: 10px;
  margin-top: 90px;
  height: 50px;
  cursor: pointer;
}

#names {
  background-color: white;
  font-size: 13px;
  border-radius: 8px;
  color: #403939;
  border: none;
  cursor: pointer;
  text-decoration: none;
  margin-left: 5px;;

}
</style>