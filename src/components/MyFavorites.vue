<template>
  <div>
    <Header></Header>
    <div id='display'>
      <h3>MY FAVORITES</h3>
  
      <div id="noFavError" v-show="errorShown">
        {{ error }}
      </div>
      <div id="food">
        <ul>
          <li v-for="favorite in favorites" :key="favorite.id">
            <div class="polaroid">
              <img v-bind:src="favorite.imageURL" /><br />
              <div class="container">
                <!-- <router-link to="/eatDetailTemplate" exact> -->
                  <button v-on:click="sendData(favorite.id)" id="names">
                    {{ favorite.name }}
                    <span style="color: pink">&#9829;</span>
                    <br>
                    {{ favorite.overallRating}}
                    <span style="color: pink">&starf;</span>
                  </button>
              <!--  </router-link> -->
              </div>
            </div>
          </li>
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
      Header: Header,
    },
    data() {
      return {
        errorShown: false,
        error: "",
        favorites: [],
      }
    },
    methods: {
      displayError: function() {
        if(this.restaurants.length==0) {
          this.errorShown=true;
          this.error="You have not added any favorite restaurant";
        }
      },
      fetchRestaurants: function () {
        database
        .collection("eat")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.favorites.push(doc.data());
            localStorage.clear();
          });
        });
      },
      sendData: function (id) {
        for (var x of this.favorites) {
          if (x["id"] === id) {
            x["menu_str"] = JSON.stringify(x["menu"])
            this.$router.push({ path:'/eatDetailTemplate', query: x })
          }
        }
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
  width: 100%;
  max-width: 90%;
  margin: 0px;
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

img {
  height: 150px;
  width: 100%;
  background-size: 80% 50%;
  border-radius: 10px;
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

#errorMessage {
  font-size: 20px;
  text-align: center;
  margin-top: 10px;
}
h3 {
  text-align: center;
  color: #ed83a7;
  font-size: 30px;
  letter-spacing: 0.1em;
}
</style>