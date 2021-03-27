<template>
  <div>
    <div class="home">
      <app-header></app-header>
      <img id="homeImg" src="../assets/TopPic.png" />
    </div>
    <h3>EAT</h3>
    <div id="eat">
      <ul>
        <li v-for="restaurant in restaurants" :key="restaurant.id">
          <img v-bind:src="restaurant.imageURL" /><br />
          <router-link to="/eatDetailTemplate" exact>{{ restaurant.name }}</router-link>
        </li>
        <button id="seeMore">See More</button>
      </ul>
    </div>
    <h3>SHOP</h3>
    <div id="shops">
      <ul>
        <li v-for="shop in shopsList" :key="shop.id">
          <img v-bind:src="shop.imageURL" /><br />
          <router-link to="/cart" exact>{{ shop.name }}</router-link>
        </li>
        <button id="seeMore">See More</button>
      </ul>
    </div>
    <h3>PLAY</h3>
    <div id="play">
      <ul>
        <li v-for="play in activities" :key="play.id">
          <img v-bind:src="play.imageURL" /><br />
          <router-link to="/cart" exact>{{ play.name }}</router-link>
        </li>
        <button id="seeMore">See More</button>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
export default {
  components: {
    AppHeader: Header,
  },
  data() {
    return {
      restaurants: [
        {
          id: "#000",
          name: "Allium",
          imageURL:
            "https://media.timeout.com/images/105615480/380/285/image.jpg",
        },
        {
          id: "#001",
          name: "Cloudstreet",
          imageURL:
            "https://media.timeout.com/images/105490157/380/285/image.jpg",
        },
        {
          id: "#003",
          name: "Mott 32",
          imageURL:
            "https://media.timeout.com/images/105602789/380/285/image.jpg",
        },
      ],

      shopsList: [
        {
          id: "#003",
          name: "Overjoyed",
          imageURL:
            "https://thesmartlocal.com/images/easyblog_articles/6880/b2ap3_large_crafts---overjoyed.png",
        },
        {
          id: "#005",
          name: "Curious Creatures",
          imageURL:
            "https://static.thehoneycombers.com/wp-content/uploads/sites/2/2018/08/curious-creatures.png",
        },
        {
          id: "#004",
          name: "The Tinsel Rack",
          imageURL:
            "https://static.thehoneycombers.com/wp-content/uploads/sites/2/2020/03/the-tinsel-rack.png",
        },
      ],
      activities: [
        {
          id: "#004",
          name: "Hi-roller indoor skating rink",
          imageURL:
            "https://thesmartlocal.com/wp-content/uploads/2020/08/image2.jpg",
        },
        {
          id: "#008",
          name: "Pottery Workshop at Thow Kwang Pottery Jungle",
          imageURL:
            "https://thesmartlocal.com/wp-content/uploads/2019/12/101-things-to-do-in-Singapore-2019-37.jpg",
        },
        {
          id: "#007",
          name: "The Little Things Cooking Workshop",
          imageURL:
            "https://sf2.mariefranceasia.com/wp-content/uploads/sites/7/2018/05/the-little-things-1-547x410.jpg",
        },
      ],
    };
  },
};
</script>

<style scoped>
#homeImg {
  width: 100%;
  height: auto;
}

#eat {
  width: 100%;
  max-width: 90%;
  margin: 0px;
  padding: 0 px;
  box-sizing: border-box;
}

#shops {
  width: 100%;
  max-width: 90%;
  margin: 0px;
  padding: 0 px;
  box-sizing: border-box;
}

#play {
  width: 100%;
  max-width: 90%;
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
  color: hotpink;
  font-size: 40px;
  font-family: monospace;
}

h1 {
  font-family: monospace;
  font-size: 50px;
}

#seeMore {
  background-color: #d25a7e;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  font-size: 20px;
  padding-right: 10px;
  margin-top: 90px;
  height: 50px;
}
</style>