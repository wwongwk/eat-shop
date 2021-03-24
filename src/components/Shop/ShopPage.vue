<template>
  <div>
    <h1>SHOP</h1>
    <div id="selected">
        <p>Selected</p>
    </div>
    <div id="shops">
        <h3>45 shops found</h3>
      <ul>
        <li v-for="shop in allShops" :key="shop.id">
            <img v-bind:src="shop.imageURL"><br />
           <router-link to='/cart' exact>{{ shop.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import database from "../../firebase.js";
export default {
    data() {
    return {
      allShops: [],
    };
    },
    methods: {
    fetchShops: function () {
      database
        .collection("shops")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.allShops.push(doc.data());
          });
        });
    },
  },
  created() {
    this.fetchShops();
  },
};
</script>

<style scoped>
#shops {
  width: 100%;
  max-width: 100%;
  margin: 0px;
  padding-left: 20%;
  box-sizing: border-box;
  border: solid 1px grey;
}

#selected {
    float: left;
    font-size: 30px;
    border: solid 1px grey;
    height: 920px;
    width: 320px;
    font-weight: bold;
    background-color: rgb(240, 199, 219);
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
  padding: 10px;
  margin: 10px;
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

h1 {
  font-family: monospace;
  font-size: 50px;
}

h3 {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 25px;
    color:hotpink;
}
</style>