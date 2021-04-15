<template>
  <div>
    <Header></Header>
    <div id="display">
      <h3>SHOPS</h3>
      <div id="searchBar">
        <p><label>What shop are you looking for today?</label></p>
        <input
          type="text"
          name="name"
          v-model.lazy="search"
          placeholder="Enter Shop's Name"
          v-on:keyup.enter="findShop()"
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
          @input="sortShops"
          :searchable = "false"
          id="drop"
        >
          <template slot="option" slot-scope="option">
            {{ option.criteria }}
          </template>
        </v-select>
      </div>
      <div id="filterDropdown">
        <p>Filter by:</p>
        <v-select
          label="productType"
          :options="dropdownOptions"
          :value="selectedType"
          :clearable="false"
          :searchable = "false"
          @input="filterShops"
          id="drop"
        >
          <template slot="option" slot-scope="option">
            {{ option.productType }}
          </template>
        </v-select>
      </div>

      <div id="errorMessage" v-show="errorShown">
        {{ error }}
      </div>
      <div id="shop" v-show="allShown">
        <ul>
          <li v-for="shop in shops" :key="shop.id">
            <div class="polaroid" v-on:click="sendData(shop.id)">
              <img v-bind:src="shop.imageURL" /><br />
              <div class="container">
                <button  id="names">
                  {{ shop.name }}
                  <br />
                  {{ shop.overallRating }}
                  <span style="color: pink">&starf;</span>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div id="selectedShops" v-show="selectedShown">
        <ul>
          <li v-for="shop in selectedShops" :key="shop.id">
            <div class="polaroid" v-on:click="sendData(shop.id)">
              <img v-bind:src="shop.imageURL" /><br />
              <div class="container">
                <button id="selectedNames">
                  {{ shop.name }}
                  <br />
                  {{ shop.overallRating }}
                  <span style="color: pink">&starf;</span>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div id="recommendedShops" v-show="recommendedShown">
        <div id="msg">We think you may like the following as well:</div>
        <ul>
          <li v-for="shop in recommended" :key="shop.id">
            <div class="polaroid" v-on:click="sendData(shop.id)">
              <img v-bind:src="shop.imageURL" /><br />
              <div class="container">
                <button id="recommendedNames">
                  {{ shop.name }}
                  <br />
                  {{ shop.overallRating }}
                  <span style="color: pink">&starf;</span>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div id="filteredShops" v-show="filteredShown">
        <ul>
          <li v-for="shop in filtered" :key="shop.id">
            <div class="polaroid" v-on:click="sendData(shop.id)">
              <img v-bind:src="shop.imageURL" /><br />
              <div class="container">
                <button id="filteredNames">
                  {{ shop.name }}
                  <br />
                  {{ shop.overallRating }}
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
      shops: [],
      selectedShops: [],
      recommended: [],
      filtered: [],
      search: "",
      selectedType: "",
      selectedCriteria: "",
      allShown: true,
      selectedShown: false,
      errorShown: false,
      error: "",
      recommendedShown: false,
      filteredShown: false,
      sortByOptions: [{ code: "1", criteria: "Best reviewed" },
      {code: "2", criteria: "Most Popular"}],
      dropdownOptions: [
        { code: "2", productType: "Clothing" },
        { code: "3", productType: "Toys" },
        { code: "4", productType: "Hand Craft" },
        { code: "5", productType: "All" },
      ],
    };
  },
  methods: {
    fetchShops: function () {
      database
        .collection("shop")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.shops.push(doc.data());
          });
        });
    },
    findShop: function () {
      if (this.selectedShops.length > 0) {
        this.selectedShops.length = 0;
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
        for (let i = 0; i < this.shops.length; i++) {
          var shop = this.shops[i];
          if (shop.name.toLowerCase().includes(this.search.toLowerCase())) {
            //loop through current list of shops to find that particular shop
            this.selectedShops.push(shop);
            var type = shop.shopCategory;
            for (let j = 0; j < this.shops.length; j++) {
              var current = this.shops[j];
              if (current.type === type && current.name != shop.name) {
                //recommend other shops selling similar products
                //push to recommended shops array
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
          // if shop cannot be found after looping through all shops
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

    //find the correct shop object and send the details to the detail page of the shop/resturant
    sendData: function (id) {
      for (var x of this.shops) {
        if (x["id"] === id) {
          console.log(x);
          x["menu_str"] = JSON.stringify(x["menu"]);
          this.$router.push({ path: "/shopDetail", query: x });
        }
      }
    },

    filterShops: function (value) {
      if (this.filtered.length > 0) {
        //clears previous filter results
        this.filtered.length = 0;
      }
      if (value.productType === "All") {
        this.allShown = true;
      }
      for (let i = 0; i < this.shops.length; i++) {
        var shop = this.shops[i];
        if (
          shop.shopCategory.toLowerCase() === value.productType.toLowerCase()
        ) {
          //filters the list of shops by the type of products they sell
          this.filtered.push(shop);
          this.allShown = false;
        }
      }
      this.selectedShown = false;
      this.recommendedShown = false;
      this.errorShown = false;
      this.filteredShown = true;
    },

    sortShops: function (value) {
      if (this.filtered.length > 0) {
        this.filtered.length = 0;
      }
      if (value.criteria === "Best reviewed") {
        //sort the shops by their overall rating values in descending order
        this.shops.sort(function (shop1, shop2) {
          return (
            parseFloat(shop2.overallRating) - parseFloat(shop1.overallRating)
          );
        });
      } else {
        //sorting by most popular -- number of clicks
        this.shops.sort(function (shop1, shop2) {
          return parseFloat(shop2.clicks) - parseFloat(shop1.clicks);
        });
      }
      this.selectedShown = false;
      this.recommendedShown = false;
      this.errorShown = false;
      this.filteredShown = false;
      this.allShown = true;
    },
  },
  created() {
    this.fetchShops();
  },
};
</script>
<style scoped>
#display {
  margin: 30px;
  margin-left: 60px;
  margin-right: 60px;
}

#shop {
  width: 100%;
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
  font-size: 14px;
  background-color: #ed83a7;
  color: #ddd;
  border: none;
  cursor: pointer;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 5px 5px;
}
#resetBtn:hover {
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
}

#selectedShops {
  width: 100%;
  max-width: 80%;
  margin: 0px;
  padding: 0 px;
  box-sizing: border-box;
}

#filteredShops {
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
  margin: 5px;
  margin-bottom: 40px;
  padding: 10px;
  font-size: 25px;
  text-align: center;
  font-weight: 10;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

div.polaroid {
  width: 200px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 10px;
  border-radius: 10px;
  cursor : pointer;
}

div.container {
  text-align: center;
  align-content: center;
  border-radius: 10px;
  margin: 0px;
  align-self: center;
  padding-bottom: 10px;
  width: 200px;
}

img {
  height: 150px;
  width: 100%;
  background-size: 80% 50%;
  border-radius: 10px;
}

#names,
#selectedNames,
#filteredNames,
#recommendedNames {
  background-color: white;
  font-size: 13px;
  border-radius: 8px;
  color: #403939;
  border: none;
  cursor: pointer;
  text-decoration: none;
  margin-left: 5px;
}

#searchBar {
  float: right;
  margin-top: 0px;
  margin-right: 50px;
  max-width: 30%;
  margin-bottom: 30px;
  top: 0;
}

#errorMessage {
  font-size: 20px;
  text-align: center;
  margin-top: 10px;
}
h3 {
  text-align: left;
  padding-left: 20px;
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

#filterDropdown {
  width: 30%;
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