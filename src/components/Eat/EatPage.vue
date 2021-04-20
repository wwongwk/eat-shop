<template>
  <div>
    <Header></Header>
    <div id="display">
      <p><span>RESTAURANTS</span></p>
      <div id="searchBar">
        <p><label>What restaurant are you looking for today?</label></p>
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
          v-model="chosenCriteria"
          :clearable="false"
          :searchable = "false"
          @input="sortFood"
          id="drop">

          <template slot="option" slot-scope="option">
            {{ option.criteria }}
          </template>
        </v-select>
      </div>
      <div id="filterDropdown">
        <p>Cuisine:</p>
        <v-select
          label="cuisineType"
          :options="dropdownOptions"
          :value="selectedCuisine"
          :clearable="false"
          :searchable="false"
          v-model="cuisineCriteria"
          @input="filterFood"
          id="drop">
          <template slot="option" slot-scope="option">
            {{ option.cuisineType }}
          </template>
        </v-select>
      </div>

      <div id="errorMessage" v-show="errorShown">
        {{ error }}
      </div>
      <div id="food" v-show="allShown">
        <ul>
          <li v-for="restaurant in restaurants" :key="restaurant.id">
            <div class="polaroid" v-on:click="sendData(restaurant.id)">
              <img v-bind:src="restaurant.imageURL" /><br />
              <div class="container">
                <button id="names">
                  {{ restaurant.name }}
                  <br />
                  {{ restaurant.overallRating }}
                  <span style="color: pink">&starf;</span>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div id="selectedFood" v-show="selectedShown">
        <ul>
          <li v-for="restaurant in selectedFood" :key="restaurant.id">
            <div class="polaroid" v-on:click="sendData(restaurant.id)">
              <img v-bind:src="restaurant.imageURL" /><br />
              <div class="container">
                <button id="selectedNames">
                  {{ restaurant.name }}
                  <br />
                  {{ restaurant.overallRating }}
                  <span style="color: pink">&starf;</span>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div id="recommendedFood" v-show="recommendedShown">
        <div id="msg">We think you may like the following as well:</div>
        <ul>
          <li v-for="restaurant in recommended" :key="restaurant.id">
            <div class="polaroid" v-on:click="sendData(restaurant.id)">
              <img v-bind:src="restaurant.imageURL" /><br />
              <div class="container">
                <button id="recommendedNames">
                  {{ restaurant.name }}
                  <br />
                  {{ restaurant.overallRating }}
                  <span style="color: pink">&starf;</span>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div id="filteredFood" v-show="filteredShown">
        <ul>
          <li v-for="restaurant in filtered" :key="restaurant.id">
            <div class="polaroid" v-on:click="sendData(restaurant.id)">
              <img v-bind:src="restaurant.imageURL" /><br />
              <div class="container">
                <button id="filteredNames">
                  {{ restaurant.name }}
                  <br />
                  {{ restaurant.overallRating }}
                  <span style="color: pink">&starf;</span>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
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
      chosenCriteria: "",
      cuisineCriteria: "",
      allShown: true,
      selectedShown: false,
      errorShown: false,
      error: "",
      recommendedShown: false,
      filteredShown: false,
      dropdownOptions: [
        { code: "CHI", cuisineType: "Chinese" },
        { code: "JAP", cuisineType: "Japanese" },
        { code: "WEST", cuisineType: "Western" },
        { code: "ALL", cuisineType: "All" },
      ],
      sortByOptions: [
        { code: "1", criteria: "Best Reviewed" },
        { code: "2", criteria: "Most Popular" },
      ],
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
      if (this.selectedFood.length > 0) {
        this.selectedFood.length = 0;
      }
      if (this.recommended.length > 0) {
        this.recommended.length = 0;
      }
      if (this.search === "") {
        this.allShown = true;
        this.selectedShown = false;
        this.recommendedShown = false;
        this.errorShown = false;
      } else {
        var found = false;
        for (let i = 0; i < this.restaurants.length; i++) {
          var restaurant = this.restaurants[i];
          if (
            restaurant.name.toLowerCase().includes(this.search.toLowerCase())
          ) {
            //loop through current list of restaurants to find that particular restaurant
            this.selectedFood.push(restaurant);
            var cuisine = restaurant.cuisine;
            for (let j = 0; j < this.restaurants.length; j++) {
              var current = this.restaurants[j];
              if (
                current.cuisine === cuisine &&
                current.name != restaurant.name
              ) {
                //recommend other restaurants of similar cuisine
                //push to recommended restaurants array
                this.recommended.push(current);
              }
            }
            this.allShown = false;
            this.selectedShown = true;
            this.recommendedShown = true;
            this.errorShown = false;
            this.filteredShown = false;
            found = true;
            break;
          }
        }
        if (!found) {
          // if restaurant cannot be found after looping through all restaurants
          // display error message
          this.error = "Sorry, we couldn't find anything. Looking for these?";
          this.selectedShown = false;
          this.errorShown = true;
          this.allShown = true;
          this.recommendedShown = false;
          this.filteredShown = false;
        }
      }
    },
    reset: function () {
      //clears the search bar
      this.errorShown = false;
      this.recommendedShown = false;
      this.selectedShown = false;
      this.allShown = true;
      this.search = "";
      this.filteredShown = false;
    },

    //find the correct shop object and send the details to eat Detail Page
    sendData: function (id) {
      for (var x of this.restaurants) {
        if (x["id"] === id) {
          x["menu_str"] = JSON.stringify(x["menu"]);
          this.increaseCounter(x);
          this.$router.push({ path: "/eatDetail", query: x });
        }
      }
    },
    filterFood: function (value) {
      if (this.filtered.length > 0) {
        //clears previous filter results
        this.filtered.length = 0;
      }
      if (value.cuisineType === "All") {
        this.allShown = true;
      }
      for (let i = 0; i < this.restaurants.length; i++) {
        var restaurant = this.restaurants[i];
        if (restaurant.cuisine === value.cuisineType.toLowerCase()) {
          //filters the list of restaurants by cuisine type
          this.filtered.push(restaurant);
          this.allShown = false;
        }
      }
      this.selectedShown = false;
      this.recommendedShown = false;
      this.errorShown = false;
      this.filteredShown = true;
    },

    sortFood: function (value) {
      if (this.filtered.length > 0) {
        this.filtered.length = 0;
      }
      if (value.criteria === "Best Reviewed") {
        //sort the restaurants by their overall rating values in descending order
        this.restaurants.sort(function (restaurant1, restaurant2) {
          return (
            parseFloat(restaurant2.overallRating) -
            parseFloat(restaurant1.overallRating)
          );
        });
      } else {
        //sorting by most popular -- number of clicks
        this.restaurants.sort(function (restaurant1, restaurant2) {
          return (
            parseFloat(restaurant2.clicks) - parseFloat(restaurant1.clicks)
          );
        });
      }
      this.selectedShown = false;
      this.recommendedShown = false;
      this.errorShown = false;
      this.filteredShown = false;
      this.allShown = true;
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
        })
        .then(() => {
          database.collection(x["type"]).doc(x["document_id"]).update({
            totalClicks: this.totalClicks,
          });
        });
    },
  },

  created() {
    this.fetchRestaurants();
  },
};
</script>

<style scoped>
#display {
  margin: 30px;
  margin-left: 60px;
  margin-right: 60px;
}

#food {
  width: 90%;
  max-width: 90%;
  margin: 0px;
  box-sizing: border-box;
}

input {
  border-radius: 5px;
  padding: 5px 10px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  outline: none;
  height: 30px;
  width: 180px;
  border: 1px solid #ddd;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
}
#resetBtn {
  background-color: #ed83a7;
  font-size: 14px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  border: none;
  cursor: pointer;
  width: 60px;
  height: 30px;
  border-radius: 5px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  outline: none;
  border: 0;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
}

#resetBtn:hover {
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
}

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
  margin-left: 100px;
  margin-top: 20px;
  self-align: center;
  vertical-align: center;
}

li {
  flex-grow: 1;
  flex-basis: 200px;
  text-align: center;
  margin: 5px;
  margin-bottom: 40px;
  padding: 10px;
  font-size: 25px;
  text-align: center;
  font-weight: 10;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

div.polaroid {
  width: 250px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 20px;
  cursor: pointer;
  height: 300px;
}

div.container {
  text-align: center;
  align-content: center;
  margin: 0px;
  align-self: center;
  padding-bottom: 10px;
  width: 250px;
  height: 300px;
}

img {
  height: 200px;
  width: 100%;
  background-size: 80% 50%;
  margin: 0px;
}

#names,
#selectedNames,
#filteredNames,
#recommendedNames {
  background-color: white;
  font-size: 16px;
  border-radius: 8px;
  color: #403939;
  border: none;
  cursor: pointer;
  text-decoration: none;
  margin-left: 5px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

#searchBar {
  float: right;
  margin-top: 0px;
  margin-right: 50px;
  max-width: 40%;
  margin-bottom: 30px;
  top: 0;
}

#errorMessage {
  font-size: 20px;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
}
p {
  text-align: center;
 /*  //padding-left: 20px; */
  color: #ed83a7;
  font-size: 30px;
  letter-spacing: 0.1em;
  overflow: hidden;
}
p > span {
  position: relative;
  display: inline-block;
}
p > span:before,
p > span:after {
  content: "";
  position: absolute;
  top: 50%;
  border-bottom: 2px solid;
  width: 100vw;
  margin: 0 20px;
}
p > span:before {
  right: 100%;
}
p > span:after {
  left: 100%;
}
#msg {
  text-align: left;
  padding-left: 5%;
  color: black;
  font-size: 25px;
}

#filterDropdown {
  width: 20%;
  margin: 0 auto;
  margin-top: 50px;
  border: none;
  outline: none;
}

#filterDropdown p,
#ratingFilter p,
#searchBar p {
  font-size: 18px;
  color: #ed83a7;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#ratingFilter {
  width: 20%;
  margin: 0 auto;
  float: left;
  padding-left: 10%;
  margin-top: 0px;
  border: none;
  outline: none;
}
#drop {
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  border: none;
  outline: none;
}
</style>