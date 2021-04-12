<template>
  <div>
    <div id='display'>
  
      <div id="noFavError" v-show="errorShown">
        {{ error }}
      </div>
    
      <div id="food">
        <ul>
          <li v-for="favorite,key in favorites" :key="favorite.index">
            <div class="polaroid">
              <img v-bind:src="favorite.imageURL" /><br />
              <div class="container">
                  <button v-on:click="sendData(key)" id="names">
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

  export default {
    props:["favorites"],

    data() {
      return {
        errorShown: false,
        error: "",
      }
    },
    methods: {
      sendData: function (id) {
        var item={}
        database.collection("eat").doc(id).get().then((doc) => {
          item=doc.data()
           item["menu_str"] = JSON.stringify(item["menu"])
            this.$router.push({ path:'/eatDetail', query: item })
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
           
      }
    }
  };
</script>

<style scoped>
/* #display {
  //margin: 30px;
  //margin-left: 60px;
  //margin-right: 60px;

} */

#food {
  width: 100%;
  max-width: 90%;
  margin: 0px;
  /* //box-sizing: border-box; */
  white-space: nowrap;
}

ul {
  display: flex;
  flex-wrap: wrap;
 /*  //list-style-type: none; */
  padding: 0;
  height: 100%;
  width: 100%;
  margin-left: 150px;
  white-space: nowrap;
}

li {
 /*  //flex-grow: 1;
  //flex-basis: 200px; */
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
}
h3 {
  text-align: center;
  color: #ed83a7;
  font-size: 30px;
  letter-spacing: 0.1em;
}
</style>