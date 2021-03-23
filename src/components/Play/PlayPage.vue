<template>
  <div>
    <h1>PLAY</h1>
    <div id="selected">
      <p>Selected</p>
    </div>
    <div id="kidsWorkshops">
      <ul>
        <li v-for="activity in activities" :key="activity.id">
          <img v-bind:src="activity.imageURL" /><br />
          <router-link to="/playDetail" exact>{{ activity.name }}</router-link>
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
      activities: [],
    };
  },
  methods: {
    fetchActivities: function () {
      database
        .collection("play")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.activities.push(doc.data());
          });
        });
    },
  },
  created() {
    this.fetchActivities();
  },
};
</script>

<style scoped>
#kidsWorkshops {
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
  height: 975px;
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
  color: hotpink;
}
</style>