<template>
  <div>
    uid : {{ uid }} <br />
    email: {{ email }} <br />
    username: {{ name }} <br />
    Reviews: {{ reviews }} <br />
    Rating : {{ rating }} <br />
    Shop Name: {{ shopName }} <br />
    DateNow : {{ Date.now() }}<br />
    Document Id: {{ documentId }} <br />
    stars : {{ overallRating }} <br />
    clicks : {{ clicks }} <br />
    reviewId : {{ reviewId }} <br />
    <!-- RESTAURANT RATING -->
    <div id="scores">
      <p id="overall">{{ overallRating }}/5.0</p>
      <div id="stars">
        <div id="one">
          <span style="color: #ed83a7">&starf;&star;&star;&star;&star;</span>
          <p>{{ stars[1] }}</p>
        </div>
        <div id="two">
          <span style="color: #ed83a7">&starf;&starf;&star;&star;&star;</span>
          <p>{{ stars[2] }}</p>
        </div>
        <div id="three">
          <span style="color: #ed83a7">&starf;&starf;&starf;&star;&star;</span>
          <p>{{ stars[3] }}</p>
        </div>
        <div id="four">
          <span style="color: #ed83a7">&starf;&starf;&starf;&starf;&star;</span>
          <p>{{ stars[4] }}</p>
        </div>
        <div id="five">
          <span style="color: #ed83a7"
            >&starf;&starf;&starf;&starf;&starf;</span
          >
          <p>{{ stars[5] }}</p>
        </div>
      </div>
    </div>

    <!-- RESTAURANT REVIEWS -->
    <div class="reviews">
      <ul>
        <li v-for="item in reviews" v-bind:key="item.id">
          {{ item.username }}&nbsp;
          <p id="date">{{ item.date.toLocaleDateString() }}</p>
          <br />

          <span style="color: #ed83a7" v-if="item.stars == 1"
            >&starf;&star;&star;&star;&star;</span
          >
          <span style="color: #ed83a7" v-else-if="item.stars == 2"
            >&starf;&starf;&star;&star;&star;</span
          >
          <span style="color: #ed83a7" v-else-if="item.stars == 3"
            >&starf;&starf;&starf;&star;&star;</span
          >
          <span style="color: #ed83a7" v-else-if="item.stars == 4"
            >&starf;&starf;&starf;&starf;&star;</span
          >
          <span style="color: #ed83a7" v-else
            >&starf;&starf;&starf;&starf;&starf;</span
          ><br />
          {{ item.review }}
          <hr />
        </li>
        
        <jw-pagination :items="reviews" :pageSize = 3 @changePage="onChangePage"></jw-pagination>
      </ul>

      <div class="submitReview">
        <p>Submit your review below:</p>
        <star-rating :show-rating="false" @rating-selected="setRating">
        </star-rating>
        <textarea
          :style="[
            loggedIn
              ? { backgroundColor: 'white' }
              : { backgroundColor: '#DCDCDC' },
          ]"
          v-model="reviewTextArea"
          id="input"
          name="input"
        />

        <br />
        <button @click="submitReview">SUBMIT</button>
      </div>
    </div>
  </div>
</template>


<script>
import StarRating from "vue-star-rating";
import database from "../../firebase.js";
import firebase from "firebase/app";

export default {
  props: ["shop"],

  name: "EatReview",
  components: {
    StarRating: StarRating,
  },

  data() {
    return {
      rating: 0,
      shopName: "",
      shopType: "",
      overallRating: 0,
      clicks: 0,
      documentId: "",
      reviewId: "",
      reviews: [],
      stars: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      reviewTextArea: "",
      uid: "",
      email: "",
      name: "",
      loggedIn: false,
      exampleItems : [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) })),
      pageofItems : [],
    };
  },

  methods: {
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    // Sets the rating when clicked by the user
    setRating: function (rating) {
      this.rating = rating;
    },

    // Submits a review and updates Firestore
    submitReview() {
      //this.newReviews = this.reviews.slice();
      if (this.loggedIn === false) {
        alert("Please log in to submit a review");
      } else if (this.rating === 0) {
        alert("Please select a rating!");
      } else if (this.reviewTextArea === "") {
        alert("Please enter a review!");
      } else {
        var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
        this.reviews.unshift({
          date: myTimestamp,
          username: this.name,
          review: this.reviewTextArea,
          id: this.reviewId,
          stars: this.rating,
        });
        alert("Review submitted!");
        database
          .collection(this.shopType)
          .doc(this.documentId)
          .update({
            reviews: this.reviews,
            overallRating: parseFloat(this.overallRating),
          })
          .then(() => {
            //location.reload();
            this.get();
            this.fetchDetails();
            this.updateStars();
            this.updateDate();
            this.updateOverallRating();
            this.reviewTextArea = "";
            window.scrollTo(0, 0);
          });
      }
    },
    // Fetches user information from firestore
    fetchDetails() {
      try {
        this.uid = firebase.auth().currentUser.uid;
        this.email = firebase.auth().currentUser.email;
        database
          .collection("users")
          .doc(this.uid)
          .get()
          .then((doc) => {
            this.name = doc.data().name;
            this.loggedIn = true;
          });
      } catch (err) {
        this.loggedIn = false;
      }
    },
    // Fetches shop information from firestore
    get() {
      /* var shop = JSON.parse(localStorage.getItem("KEY")); */
      this.shopName = this.shop["name"];
      this.documentId = this.shop["document_id"];
      this.shopType = this.shop["type"];
      this.clicks = this.shop["clicks"];
      this.overallRating = this.shop["overallRating"];
      database
        .collection(this.shopType)
        .doc(this.documentId)
        .get()
        .then((doc) => {
          this.reviews = doc.data().reviews;
          this.reviewId = doc.data().reviews[0].id + 1;
          this.fetchDetails();
          this.updateStars();
          this.updateDate();
          this.updateOverallRating();
        });
    },
    // Converts a Firestore Timestamp object to a Javascript Date object
    updateDate() {
      for (let i = 0; i < this.reviews.length; i++) {
        let seconds = this.reviews[i].date.seconds;
        let nanoseconds = this.reviews[i].date.nanoseconds;
        let date = new Date(seconds * 1000 + nanoseconds / 1000000);
        this.reviews[i].date = date;
      }
    },
    // Updates the stars Object to properly display the breakdown of the reviews
    updateStars() {
      for (let i = 0; i < this.reviews.length; i++) {
        if (this.reviews[i].stars == 1) {
          this.stars[1] += 1;
        }
        if (this.reviews[i].stars == 2) {
          this.stars[2] += 1;
        }
        if (this.reviews[i].stars == 3) {
          this.stars[3] += 1;
        }
        if (this.reviews[i].stars == 4) {
          this.stars[4] += 1;
        }
        if (this.reviews[i].stars == 5) {
          this.stars[5] += 1;
        }
      }
    },
    // Updates the restaurant's overall rating
    updateOverallRating() {
      let sum = 0;
      let length = 0;
      for (let [key, value] of Object.entries(this.stars)) {
        sum += key * value;
        length += value;
      }

      if (length == 0) {
        this.overallRating = 0;
      } else {
        this.overallRating = (sum / length).toFixed(1);
      }
    },
  },
  computed: {
    // Updates the restaurant's overall rating
    averageStars() {
      let sum = 0;
      let length = 0;
      for (let [key, value] of Object.entries(this.stars)) {
        sum += key * value;
        length += value;
      }

      if (length == 0) {
        return 0;
      } else {
        return (sum / length).toFixed(1);
      }
    },
  },
  created() {
    this.get();
  },
};
</script>

<style scoped>
#scores {
  white-space: nowrap;
}
#overall,
#stars {
  display: inline-block;
}

#overall {
  font-size: 70px;
  margin: 60px;
}
#one,
#two,
#three,
#four,
#five {
  white-space: nowrap;
  margin: 10px;
  height: 10px;
  width: 20px;
}

#one > p {
  display: inline-block;
  margin: 10px;
  color: #ed83a7;
}
#two > p {
  display: inline-block;
  margin: 10px;
  color: #ed83a7;
}
#three > p {
  display: inline-block;
  margin: 10px;
  color: #ed83a7;
}
#four > p {
  display: inline-block;
  margin: 10px;
  color: #ed83a7;
}
#five > p {
  display: inline-block;
  margin: 10px;
  color: #ed83a7;
}

li {
  color: #403939;
  font-size: 18px;
  margin: 10px;
  border-radius: 4px;
  padding: 25px 20px;
  width: 1400px;
}

ul {
  list-style-type: none;
  width: 100%;
  margin-bottom: 100px;
}
#date {
  float: right;
}
div.reviews {
  line-height: 2;
}

.submitReview {
  margin-left: 60px;
}

textarea {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  outline: none;
  display: block;
  width: 500px;
  height: 100px;
  padding: 7px;
  font: 16px Arial, Helvetica, sans-serif;
  border-radius: 15px;
  border: 0;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}

button {
  background-color: #ed83a7;
  border: none;
  border-radius: 5px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.1);
  color: white;
  font-size: 18px;
  margin-bottom: 50px;
}
.submitReview p {
  font-size: 18px;
}
</style>