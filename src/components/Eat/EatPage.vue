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
      <button id="resetBtn" v-on:click="reset()">RESET</button>
    </div>
       <div id="ratingFilter">
      <p>Sort By:</p>
      <v-select
        label="criteria"
        :options="sortByOptions"
        :value="selectedCriteria"
        :clearable="false"
        v-model="chosenCriteria"
        @input="sortFood"
      >
        <template slot="option" slot-scope="option">
          {{ option.criteria }}
        </template>
      </v-select>
    </div>
    <div id="filterDropdown">
      <p>Cuisine Type:</p>
      <v-select
        label="cuisineType"
        :options="dropdownOptions"
        :value="selectedCuisine"
        :clearable="false"
        v-model="selected"
        @input="filterFood"
      >
        <template slot="option" slot-scope="option">
          {{ option.cuisineType }}
        </template>
      </v-select>
    </div>
 
    <div id="errorMessage" v-show="errorShown">
      {{ error }}
    </div>
    <div id="food" v-show="allRestaurants">
      <ul>
        <li v-for="restaurant in restaurants" :key="restaurant.id">
          <div class="polaroid">
            <img v-bind:src="restaurant.imageURL" /><br />
            <div class="container">
              <router-link to="/eatDetailTemplate" exact>
                <button v-on:click="sendData(restaurant.id)" id="names">
                  {{ restaurant.name }}
                </button>
              </router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div id="selectedFood" v-show="selectedRestaurants">
      <ul>
        <li v-for="restaurant in selectedFood" :key="restaurant.id">
          <div class="polaroid">
            <img v-bind:src="restaurant.imageURL" /><br />
            <div class="container">
              <router-link to="/eatDetailTemplate" exact>
                <button v-on:click="sendData(restaurant.id)" id="selectedNames">
                  {{ restaurant.name }}
                </button>
              </router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div id="recommendedFood" v-show="recommendedRestaurants">
      <div id="msg">We think you may like the following as well:</div>
      <ul>
        <li v-for="restaurant in recommended" :key="restaurant.id">
          <div class="polaroid">
            <img v-bind:src="restaurant.imageURL" /><br />
            <div class="container">
              <router-link to="/eatDetailTemplate" exact>
                <button
                  v-on:click="sendData(restaurant.id)"
                  id="recommendedNames"
                >
                  {{ restaurant.name }}
                </button>
              </router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div id="filteredFood" v-show="filteredRestaurants">
      <ul>
        <li v-for="restaurant in filtered" :key="restaurant.id">
          <div class="polaroid">
            <img v-bind:src="restaurant.imageURL" /><br />
            <div class="container">
              <router-link to="/eatDetailTemplate" exact>
                <button v-on:click="sendData(restaurant.id)" id="filteredNames">
                  {{ restaurant.name }}
                </button>
              </router-link>
            </div>
          </div>
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
      selectedFood: [],
      recommended: [],
      filtered: [],
      search: "",
      selectedCuisine: "",
      selectedCriteria: "",
      allRestaurants: true,
      selectedRestaurants: false,
      errorShown: false,
      error: "",
      recommendedRestaurants: false,
      filteredRestaurants: false,
      dropdownOptions: [
        { code: "CHI", cuisineType: "Chinese" },
        { code: "JAP", cuisineType: "Japanese" },
        { code: "WEST", cuisineType: "Western" },
        { code: "ALL", cuisineType: "All" },
      ],
      sortByOptions: [{ code: "1", criteria: "Best reviewed" }],
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
            localStorage.clear();
          });
        });
    },
    findRestaurant: function () {
      if (this.selectedFood.length > 0) {
        this.selectedFood.length = 0;
      }
      if (this.recommended.length > 0) {
        this.recommended.length = 0;
      }
      if (this.search === "") {
        this.allRestaurants = true;
        this.selectedRestaurants = false;
        this.recommendedRestaurants = false;
        this.errorShown = false;
      } else {
        var found = false;
        for (let i = 0; i < this.restaurants.length; i++) {
          var restaurant = this.restaurants[i];
          if (
            restaurant.name.toLowerCase().includes(this.search.toLowerCase())
          ) {
            this.selectedFood.push(restaurant);
            var cuisine = restaurant.cuisine;
            for (let j = 0; j < this.restaurants.length; j++) {
              var current = this.restaurants[j];
              if (
                current.cuisine === cuisine &&
                current.name != restaurant.name
              ) {
                //other restaurants of similar cuisine
                //push to recommended restaurants array
                this.recommended.push(current);
              }
            }
            this.allRestaurants = false;
            this.selectedRestaurants = true;
            this.recommendedRestaurants = true;
            this.errorShown = false;
            this.filteredRestaurants = false;
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
          this.filteredRestaurants = false;
        }
      }
    },
    reset: function () {
      this.errorShown = false;
      this.recommendedRestaurants = false;
      this.selectedRestaurants = false;
      this.allRestaurants = true;
      this.search = "";
      this.filteredRestaurants = false;
    },
    sendData: function (id) {
      for (var x of this.restaurants) {
        if (x["id"] === id) {
          console.log(x);
          localStorage.setItem("KEY", JSON.stringify(x));
        }
      }
    },
    filterFood: function (value) {
      if (this.filtered.length > 0) {
        this.filtered.length = 0;
      }
      if (value.cuisineType === "All") {
        this.allRestaurants = true;
      }
      for (let i = 0; i < this.restaurants.length; i++) {
        var restaurant = this.restaurants[i];
        if (restaurant.cuisine === value.cuisineType.toLowerCase()) {
          this.filtered.push(restaurant);
          this.allRestaurants = false;
        }
      }
      this.selectedRestaurants = false;
      this.recommendedRestaurants = false;
      this.errorShown = false;
      this.filteredRestaurants = true;
    },

    sortFood: function (value) {
      if (this.filtered.length > 0) {
        this.filtered.length = 0;
      }
      if (value.criteria === "Best reviewed") {
        this.restaurants.sort(function (restaurant1, restaurant2) {
          return (
            parseFloat(restaurant2.overallRating) -
            parseFloat(restaurant1.overallRating)
          );
        });
        this.selectedRestaurants = false;
        this.recommendedRestaurants = false;
        this.errorShown = false;
        this.filteredRestaurants = false;
        this.allRestaurants = true;
      }
    },
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

button {
  background-color: #ed83a7;
  border: none;
  color: #403939;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  font-size: 18px;
  padding-right: 10px;
  height: 30px;
}

#resetBtn {
  font-size: 18px;
}

/*
button:hover {
  border: 1px #c6c6c6 solid;
  box-shadow: 1px 1px 1px #eaeaea;
  color: #333333;
  background: rgb(245, 73, 159);
}

button:active {
  box-shadow: inset 1px 1px 1px #dfdfdf;
}
*/

#selectedFood {
  width: 100%;
  max-width: 80%;
  margin: 0px;
  padding: 0 px;
  box-sizing: border-box;
}

#filteredFood {
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
  margin-left: 150px;
}

li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  margin: 10px;
  margin-bottom: 40px;
  padding: 10px;
  font-size: 25px;
  text-align: center;
  font-weight: 10;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

div.polaroid {
  width: 270px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 15px;
  border-radius: 10px;
}

div.container {
  text-align: center;
  padding: 10px 10px;
  border-radius: 10px;
}

img {
  height: 220px;
  width: 270px;
  background-size: 80% 50%;
  border-radius: 10px;
}

#names,
#selectedNames,
#filteredNames,
#recommendedNames {
  background-color: white;
  font-size: 20px;
  border-radius: 8px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #403939;
  border: none;
  cursor: pointer;
  text-decoration: none;
}

#foodName {
  font-size: 25px;
  text-align: center;
  font-weight: 10;
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
  margin-top: 10px;
}
h3 {
  text-align: left;
  padding-left: 5%;
  color: #ed83a7;
  font-size: 30px;
  letter-spacing: 0.1em;
}

#msg {
  text-align: left;
  padding-left: 5%;
  color: black;
  font-size: 25px;
}

h1 {
  font-size: 50px;
}

#filterDropdown {
  width: 30%;
  margin: 0 auto;
  margin-top: 3%;
}

#filterDropdown p, #ratingFilter p {
  font-size: 20px;
  color: #ed83a7;
}

#ratingFilter {
  width: 20%;
  margin: 0 auto;
  float: left;
  padding-left: 10%;
  margin-top: 0%;
}

h4 {
  font-size: 18px;
}
</style>