<template>
  <div>
    <div id='display'>
  
      <div id="filterDropdown">
        <p>Filter by:</p>
        <v-select
          label="type"
          :options="dropdownOptions"
          :value="selectedType"
          :clearable="false"
          v-model="chosenType"
          @input="filter"
          :searchable = "false"
          id="drop">

          <template slot="option" slot-scope="option">
            {{ option.type }}
          </template>
        </v-select>
      </div>

      <div id="noFavError" v-show="errorShown">
        {{ error }}
      </div>
    
      <div id="food" v-show="allShown">
        <ul>
          <li v-for="favorite,key in favorites" :key="favorite.index">
            <div class="polaroid">
              <img v-bind:src="favorite.imageURL" /><br />
              <div class="container">
                  <button v-on:click="sendData(key, favorite.type)" id="names">
                    {{ favorite.name }}
                    <span style="color: pink">&#9829;</span>
                    <br>
                    {{ favorite.overallRating }}
                    <span style="color: pink">&starf;</span>
                  </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div id="filteredFood" v-show="filteredShown">
        <ul>
          <li v-for="favorite in filtered" :key="favorite.index">
            <div class="polaroid">
              <img v-bind:src="favorite.imageURL" /><br />
              <div class="container">
                  <button v-on:click="sendData(favorite.key,favorite.type)" id="names">
                    {{ favorite.name }}
                    <span style="color: pink">&#9829;</span>
                    <br>
                    {{ favorite.overallRating }}
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
  import database from "../firebase.js";
  import firebase from "firebase/app";
  export default {
    data() {
      return {
        favorites:{},
        errorShown: false,
        error: "",
        dropdownOptions: [
          { code: "ALL", type: "ALL" },
          { code: "EAT", type: "EAT" },
          { code: "SHOP", type: "SHOP" },
        ],
        selectedType: "",
        filtered: [],
        allShown: true,
        filteredShown: false,
        chosenType:""
      }
    },
    methods: {
      sendData: function (id, type) {
        var item={}
        if (type=="eat") {
          database
          .collection("eat")
          .doc(id)
          .get()
          .then((doc) => {
            item=doc.data()
            item["menu_str"] = JSON.stringify(item["menu"])
            this.$router.push({ path:'/eatDetail', query: item })
          }).catch((error) => {
              console.log("Error getting document:", error);
          });  
        } else {
          database
          .collection("shop")
          .doc(id)
          .get()
          .then((doc) => {
            item=doc.data()
            item["menu_str"] = JSON.stringify(item["menu"])
            this.$router.push({ path: "/shopDetail", query: item });
          }).catch((error) => {
            console.log("Error getting document:", error);
          });  
        } 
      },

      filter: function (value) {
        if (this.filtered.length > 0) {
          //clears previous filter results
          this.filtered.length= 0;
        }
        if (value.type === "ALL") {
          this.allShown = true;
        }

        for (var favorite in this.favorites) {
          if (this.favorites[favorite].type === value.type.toLowerCase()) {
            //filters the list of restaurants by cuisine type
           // this.filtered[favorite]=this.favorites[favorite]
           this.favorites[favorite].key=favorite
           this.filtered.push(this.favorites[favorite])
            this.allShown = false;
          }
        }

        this.errorShown = false;
        this.filteredShown = true;
      },
    },

    created() {
      var user = firebase.auth().currentUser;
      if (user != null) {
        var uid = user.uid;
        database.collection("users")
        .doc(uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.favorites = doc.data().favorites;
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
      }
    }
  };
</script>

<style scoped>

#food {
  width: 100%;
  max-width: 90%;
  margin: 0px;
  white-space: nowrap;
}

ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  height: 100%;
  width: 100%;
  margin-left: 150px;
  white-space: nowrap;
}

li {
  text-align: center;
  margin: 5px;
  margin-bottom: 40px;
  padding: 10px;
  font-size: 25px;
  text-align: center;
  font-weight: 10;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: inline-block;
}

div.polaroid {
  width: 150px;
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
  width: 150px;
}

img {
  height: 100px;
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
h3 {
  text-align: center;
  color: #ed83a7;
  font-size: 30px;
  letter-spacing: 0.1em;
}

#drop {
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  border: none;
  outline: none;
  width: 200px;
  margin-right: 50px;
}

#filterDropdown {
  width: 150px;
  margin-left: 250px ;
  margin-top: 20px;
  border: none;
  outline: none;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
#filterDropdown > p {
  text-align: center;
  margin-left: 60px;
  font-size: 20px;
}
#filteredFood {
  width: 100%;
  max-width: 80%;
  margin: 0px;
  padding: 0 px;
  box-sizing: border-box;
}

#filteredNames{
  background-color: white;
  font-size: 13px;
  border-radius: 8px;
  color: #403939;
  border: none;
  cursor: pointer;
  text-decoration: none;
  margin-left: 5px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>