<template>
  <div>
    <h2>{{shop.name}}</h2>
    <div id="scores">
        <p id="overall">4.5/5</p>
        <div id="stars">
        <div id="one">
            <span style="color:pink">&starf;&star;&star;&star;&star;</span>
            <p>{{countOne()}}</p>
        </div>
        <div id="two">
            <span style="color:pink">&starf;&starf;&star;&star;&star;</span>
            <p>{{countTwo()}}</p>
        </div>
        <div id="three">
            <span style="color:pink">&starf;&starf;&starf;&star;&star;</span>
            <p>{{countThree()}}</p>
        </div>
        <div id="four"> 
            <span style="color:pink">&starf;&starf;&starf;&starf;&star;</span>
            <p>{{countFour()}}</p>
        </div>
        <div id="five">
            <span style="color:pink">&starf;&starf;&starf;&starf;&starf;</span>
            <p>{{countFive()}}</p>
        </div>
      </div>
    </div>

    <div class="reviews">
        <ul>
        <li  v-for="item in reviews" v-bind:key="item.stars">
            <span style="color:pink" v-if="item.stars==1">&starf;&star;&star;&star;&star;</span>
            <span style="color:pink" v-else-if="item.stars==2">&starf;&starf;&star;&star;&star;</span>
            <span style="color:pink" v-else-if="item.stars==3">&starf;&starf;&starf;&star;&star;</span>
            <span style="color:pink" v-else-if="item.stars==4">&starf;&starf;&starf;&starf;&star;</span>
            <span style="color:pink" v-else>&starf;&starf;&starf;&starf;&starf;</span><br>
            {{item.review}}<hr>
        </li>
        </ul>
    </div>
  </div>
</template>

<script>
import database from "../../firebase.js";
export default {
  name: "EatReview",
  components: {
    
  },

  data() {
    return {
      reviews: [], 
    }
  },

  methods: {
    fetchReviews: function () {
      this.reviews=database
        .collection("eat")
        .doc("afuriramen")
        .get("reviews")
    },

    countOne: function() {
        var numOfOne = 0;
        for (let i = 0; i < this.reviewsList.length; i++) {
          if (this.reviewsList[i].rating == '1') {
            numOfOne += 1;
          }
        }
        return numOfOne;
    },

    countTwo: function() {
        var numOfTwo = 0;
        for (let i = 0; i < this.reviewsList.length; i++) {
          if (this.reviewsList[i].rating == '2') {
            numOfTwo += 1;
          }
        }
        return numOfTwo;
    },

    countThree: function() {
        var numOfThree = 0;
        for (let i = 0; i < this.reviewsList.length; i++) {
          if (this.reviewsList[i].rating == '3') {
            numOfThree += 1;
          }
        }
        return numOfThree;
    },

    countFour: function() {
        var numOfFour = 0;
        for (let i = 0; i < this.reviewsList.length; i++) {
          if (this.reviewsList[i].rating == '4') {
            numOfFour += 1;
          }
        }
        return numOfFour;
    },

    countFive: function() {
        var numOfFive = 0;
        for (let i = 0; i < this.reviewsList.length; i++) {
          if (this.reviewsList[i].rating == '5') {
            numOfFive += 1;
          }
        }
        return numOfFive;
    }
  }

}
</script>

<style scoped>

  #scores {
    white-space: nowrap;
  }
  #overall, #stars {
      display: inline-block;
  }

  #overall {
    font-size: 70px;
    margin: 60px;
  }
  #one, #two, #three, #four, #five {
    white-space: nowrap;
    margin: 10px;
    height: 5px;
  }

  #one > p {
    display: inline-block;
    margin: 10px;
  }
  #two > p {
    display: inline-block;
    margin: 10px;
  }
  #three > p {
    display: inline-block;
    margin: 10px;
  }
  #four > p {
    display: inline-block;
    margin: 10px;
  }
  #five > p {
    display: inline-block;
    margin: 10px;
  }

  li {
      color: #403939;
      font-size: 18px;
      margin: 10px;
      border-radius: 4px;
      padding: 25px 20px;
  }

  ul {
      list-style-type: none;
      width: 100%;
      margin-bottom: 100px;
  }
  div.reviews {
      test-align: center;
      line-height: 2;
  }

</style>