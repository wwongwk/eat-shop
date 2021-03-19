<template>
  <div>
    <h1>PLAY</h1>
    <div id="selected">
        <p>Selected</p>
    </div>
    <div id="kidsWorkshops">
        <h3>90 activities found</h3>
      <ul>
        <li v-for="workshop in workshops" :key="workshop.id">
            <img v-bind:src="workshop.imageURL"><br />
           <router-link to='/cart' exact>{{ workshop.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    data() {
    return {
      workshops: [
        {
          id: "#000",
          name: "Botany Workshop",
          imageURL:
            "https://sf1.mariefranceasia.com/wp-content/uploads/sites/7/2018/05/22218212_801883149982834_2264372406007038949_o-617x410.jpg",
        },
        {
          id: "#001",
          name: "The Music Scientist Human Anatomy Workshop",
          imageURL:
            "https://sf1.mariefranceasia.com/wp-content/uploads/sites/7/2018/05/31958013_323159764882055_1774073612123242496_o-615x410.jpg",
        },
        {
          id: "#003",
          name: "Terraminds Crime Detective Workshops",
          imageURL:
            "https://sf1.mariefranceasia.com/wp-content/uploads/sites/7/2018/05/terraminds.jpg",
        },
        {
          id: "#004",
          name: "Wings to Wings Dance Workshop",
          imageURL:
            "https://sf2.mariefranceasia.com/wp-content/uploads/sites/7/2018/05/15419573_1200730570002587_7803695847694626705_o-750x383.jpg",
        },
        {
          id: "#005",
          name: "The Art People Art Workshops",
          imageURL:
            "https://sf1.mariefranceasia.com/wp-content/uploads/sites/7/2018/05/art-people-547x410.jpg",
        },
        {
          id: "#006",
          name: "Panoramic Kids Photography Workshop",
          imageURL:
            "https://sf2.mariefranceasia.com/wp-content/uploads/sites/7/2018/05/11990444_1490305444603315_4096004096841786133_n-609x410.jpg",
        },
        {
          id: "#007",
          name: "The Little Things Cooking Workshop",
          imageURL:
            "https://sf2.mariefranceasia.com/wp-content/uploads/sites/7/2018/05/the-little-things-1-547x410.jpg",
        },
      ],
    };
    }
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
    color:hotpink;
}
</style>