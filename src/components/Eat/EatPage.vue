<template>
  <div>
    <h1>EAT</h1>
    <h3>CHINESE</h3>
    <div id="chinese">
      <ul>
        <li v-for="food in chineseFood" :key="food.id">
            <img v-bind:src="food.imageURL"><br />
           <router-link to='/cart' exact>{{ food.name }}</router-link>
        </li>
        <button id="seeMore">See More</button>
      </ul>
    </div>
    <h3> JAPANESE </h3>
    <div id="japanese">
      <ul>
        <li v-for="food in japaneseFood" :key="food.id">
          <img v-bind:src="food.imageURL" /><br />
           <router-link to='/cart' exact>{{food.name}}</router-link>
        </li>
        <button id="seeMore">See More</button>
      </ul>
    </div>
    <h3>WESTERN</h3>
    <div id="western">
      <ul>
        <li v-for="food in westernFood" :key="food.id">
          <img v-bind:src="food.imageURL" /><br />
          <router-link to='/cart' exact>{{ food.name }}</router-link>
        </li>
        <button id="seeMore">See More</button>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chineseFood: [
        {
          id: "#000",
          name: "Sum Dim Sum",
          imageURL:
            "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_450,h_300/https://danielfooddiary.com/wp-content/uploads/2020/02/sumdimsum5.jpg",
        },
        {
          id: "#001",
          name: "OK Chicken Rice",
          imageURL:
            "https://asianinspirations.com.au/wp-content/uploads/2019/07/R00376-Hainanese_Chicken_Rice-2.jpg",
        },
        {
          id: "#003",
          name: "Hong Yun Seafood",
          imageURL:
            "https://cfcdn2.azsg.opensnap.com/azsg/snapphoto/photo/LA/GTJK/3BM38LBE242D2A34A23A0Elv.jpg",
        },
      ],

      japaneseFood: [
        {
          id: "#004",
          name: "Marui Sushi",
          imageURL:
            "https://www.urbanjourney.com/wp-content/uploads/2019/09/Marui-Sushi.jpg",
        },
        {
          id: "#005",
          name: "Kenboru",
          imageURL:
            "http://eatbook.sg/wp-content/uploads/2018/05/kenboru-chicken-1024x577.jpg",
        },
        {
          id: "#006",
          name: "Afuri Ramen",
          imageURL:
            "https://favy-inbound-singapore.s3.amazonaws.com/uploads/topic/image/1048/afuri.jpg",
        },
      ],
      westernFood: [
        {
          id: "#007",
          name: "iO Italian Osteria",
          imageURL:
            "https://i.hungrygowhere.com/business/bf/8f/12/00/img-0864-copy_320x0_crop_320x200_59c0b60c4f.JPG",
        },
        {
          id: "#008",
          name: "Meatsmith",
          imageURL:
            "https://i.hungrygowhere.com/business/79/db/12/00/meatsmith-telok-ayer-premium-platter-1_320x0_crop_320x200_a738dd7fac.jpg",
        },
        {
          id: "#009",
          name: "Picotin Express",
          imageURL:
            "https://i.hungrygowhere.com/business/5b/ae/12/00/picotin-indoor_320x0_crop_320x200_59aa132e89.jpg",
        },
      ],
    };
    }
};
</script>

<style scoped>
#chinese {
  width: 100%;
  max-width: 80%;
  margin: 0px;
  padding: 0 px;
  box-sizing: border-box;
}

#japanese {
  width: 100%;
  max-width: 80%;
  margin: 0px;
  padding: 0 px;
  box-sizing: border-box;
}

#western {
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

#seeMore {
  background-color: #D25A7e;
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