<template>
  <div>
    <Header></Header>
    <h3>RESTAURANTS</h3>
    <div id="food">
      <ul>
        <li v-for="restaurant in restaurants" :key="restaurant.id">
          <img v-bind:src="restaurant.imageURL" /><br />
          <router-link to="/eatDetail" exact>{{ restaurant.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '../Header.vue'
import database from "../../firebase.js"

export default {
  components: {
      Header:Header,
  },
  data() {
    return {
      restaurants:[],
      search:""
    }
  },
  methods: {
    fetchRestaurants:function(){
      database.collection('eat').get().then(snapshot=>{
        snapshot.docs.forEach(doc=>{
          this.restaurants.push(doc.data());
        })    
      })   
    }
  },
  created() {
    this.fetchRestaurants();
  }
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

#foodName {
  font-size: 25px;
  text-align: center;
  font-weight: 10;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

h3 {
  text-align: left;
  padding-left: 5%;
  color:hotpink;
  font-size:30px;
  font-family: monospace;
}

h1 {
  font-family: monospace;
  font-size: 50px;
}
.search-bar {
  position: relative;
}
.search-bar input {
  padding-left: 30px;
}
.search-icon {
  position: absolute;
  top: 8px;
  left: 8px;
}

</style>