<template>
  <div>
    <Header></Header>
    <h3>RESTAURANTS</h3>
    <div id="searchBar">
      <h4><label>What restaurant are you looking for today?</label></h4>
      <input
        type="text"
        name="name"
        v-model.lazy="search"
        placeholder="Enter Restaurant's Name"
        v-on:keyup.enter="findRestaurant()"
      />
      <button id="resetBtn" v-on:click = "reset()">RESET</button>
    </div>
    <div id="errorMessage" v-show="errorShown">
      {{ error }}
    </div>
    <div id="food" v-show="allRestaurants">
      <ul>
        <li v-for="restaurant in restaurants" :key="restaurant.id">
          <img v-bind:src="restaurant.imageURL" /><br />
          <router-link to="/eatDetail" exact>{{ restaurant.name }}</router-link>
        </li>
      </ul>
    </div>
    <div id="selectedFood" v-show="selectedRestaurants">
      <ul>
        <li v-for="restaurant in selected" :key="restaurant.id">
          <img v-bind:src="restaurant.imageURL" /><br />
          <router-link to="/eatDetail" exact>{{ restaurant.name }}</router-link>
        </li>
      </ul>
    </div>
    <div id="recommendedFood" v-show="recommendedRestaurants">
      <div id="msg">We think you may like the following as well: </div>
      <ul>
        <li v-for="restaurant in recommended" :key="restaurant.id">
          <img v-bind:src="restaurant.imageURL" /><br />
          <router-link to="/eatDetail" exact>{{ restaurant.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from "../Header.vue";
import database from "../../firebase.js";

export default {
  components: {
    Header: Header,
  },
  data() {
    return {
      restaurants: [],
      selected: [],
      recommended: [],
      search: "",
      allRestaurants: true,
      selectedRestaurants: false,
      errorShown: false,
      error: "",
      recommendedRestaurants: false,
    };
  },
  methods: {
    fetchRestaurants: function () {
      database
        .collection("eat")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.restaurants.push(doc.data());
          });
        });
    },
    findRestaurant: function () {
      if (this.selected.length > 0) {
        this.selected.length = 0;
      }
      if (this.recommended.length > 0) {
        this.recommended.length = 0;
      }
      var found = false;
      for (let i = 0; i < this.restaurants.length; i++) {
        var restaurant = this.restaurants[i];
        if (restaurant.name.toLowerCase().includes(this.search.toLowerCase())) {
          this.selected.push(restaurant);
          var cuisine = restaurant.cuisine;
          for (let j = 0; j < this.restaurants.length; j++) {
            var current = this.restaurants[j];
            if (current.cuisine === cuisine && current.name != restaurant.name) {
              //other restaurants of similar cuisine 
              //push to recommended restaurants array
              this.recommended.push(current);
            }
          }
          this.allRestaurants = false;
          this.selectedRestaurants = true;
          this.recommendedRestaurants = true;
          this.errorShown = false;
          found = true;
          break;
        }
      }
      if (!found) {
        this.error = "Sorry, we couldn't find anything. Looking for these?";
        this.selectedRestaurants = false;
        this.errorShown = true;
        this.allRestaurants = true;
        this.recommendedRestaurants = false;
      }
    },
    reset: function() {
      this.errorShown = false;
      this.recommendedRestaurants = false;
      this.selectedRestaurants = false;
      this.allRestaurants = true;
    }
  },
  created() {
    this.fetchRestaurants();
  },
};
</script>

<style scoped>
#food {
  width: 100%;
  max-width: 80%;
  margin: 0px;
  padding: 0 px;
  box-sizing: border-box;
}

#selectedFood {
  width: 100%;
  max-width: 80%;
  margin: 0px;
  padding: 0 px;
  box-sizing: border-box;
}

ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  height: 100%;
  width: 100%;
}

li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  margin: 10px;
  padding: 10px;
  font-size: 25px;
  text-align: center;
  font-weight: 10;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

img {
  height: 200px;
  width: 250px;
  background-size: 80% 50%;
  border-radius: 10px;
}

#foodName {
  font-size: 25px;
  text-align: center;
  font-weight: 10;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#searchBar {
  float: right;
  margin-right: 50px;
  max-width: 20%;
  top: 0;
}

#errorMessage {
  font-size: 20px;
  text-align: center;
}
h3 {
  text-align: left;
  padding-left: 5%;
  color: hotpink;
  font-size: 30px;
  font-family: monospace;
}

#msg {
  text-align: left;
  padding-left: 5%;
  color: black;
  font-size: 25px;
}

h1 {
  font-family: monospace;
  font-size: 50px;
}
</style>