<template>
  <div>
    uid : {{ uid }} <br />
    email: {{ email }} <br />
    Reviews: {{ reviews }} <br />
    Rating : {{ rating }} <br />
    Shop Name: {{ shopName }} <br />
    DateNow : {{ Date.now() }}<br />
    Document Id: {{ documentId }} <br />
    stars : {{ averageStars }}
    <div id="scores">
      <p id="overall">{{ averageStars }}/5</p>
      <div id="stars">
        <div id="one">
          <span style="color: pink">&starf;&star;&star;&star;&star;</span>
          <p>{{ stars[1] }}</p>
        </div>
        <div id="two">
          <span style="color: pink">&starf;&starf;&star;&star;&star;</span>
          <p>{{ stars[2] }}</p>
        </div>
        <div id="three">
          <span style="color: pink">&starf;&starf;&starf;&star;&star;</span>
          <p>{{ stars[3] }}</p>
        </div>
        <div id="four">
          <span style="color: pink">&starf;&starf;&starf;&starf;&star;</span>
          <p>{{ stars[4] }}</p>
        </div>
        <div id="five">
          <span style="color: pink">&starf;&starf;&starf;&starf;&starf;</span>
          <p>{{ stars[5] }}</p>
        </div>
      </div>
    </div>

    <div class="reviews">
      <ul>
        <li v-for="item in reviews" v-bind:key="item.review">
          {{ item.username }}&nbsp; {{ item.date.toLocaleDateString() }}<br />

          <span style="color: pink" v-if="item.stars == 1"
            >&starf;&star;&star;&star;&star;</span
          >
          <span style="color: pink" v-else-if="item.stars == 2"
            >&starf;&starf;&star;&star;&star;</span
          >
          <span style="color: pink" v-else-if="item.stars == 3"
            >&starf;&starf;&starf;&star;&star;</span
          >
          <span style="color: pink" v-else-if="item.stars == 4"
            >&starf;&starf;&starf;&starf;&star;</span
          >
          <span style="color: pink" v-else
            >&starf;&starf;&starf;&starf;&starf;</span
          ><br />
          {{ item.review }}
          <hr />
        </li>
        <div class="submitReview">
          <star-rating :show-rating="false" @rating-selected="setRating">
          </star-rating>
          <textarea v-model="reviewTextArea" id="input" name="input" />
          <br />
          <button @click="submitReview">SUBMIT REVIEW</button>
        </div>
      </ul>
    </div>
  </div>
</template>


<script>
import StarRating from "vue-star-rating";
import database from "../../firebase.js";
import firebase from "firebase/app";

export default {
  name: "EatReview",
  components: {
    StarRating: StarRating,
  },

  data() {
    return {
      rating: 0,
      shopName: "",
      shopType: "",
      documentId: "",
      reviews: [],
      newReviews: [],
      stars: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      reviewTextArea: "",
      uid: "",
      email: "",
      loggedIn: false,
    };
  },

  methods: {
    setRating: function (rating) {
      this.rating = rating;
    },
    submitReview() {
      //this.newReviews = this.reviews.slice();
      if ((this.loggedIn === false)) {
        alert("Please log in to submit a review");
      } else if (this.rating === 0) {
        alert("Please select a rating!");
      } else if (this.reviewTextArea === "") {
        alert("Please enter a review!");
      } else {
        var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
        this.reviews.unshift({
          date: myTimestamp,
          username: this.email,
          review: this.reviewTextArea,
          stars: this.rating,
        });
        alert("Review submitted!");
        database
          .collection(this.shopType)
          .doc(this.documentId)
          .update({
            reviews: this.reviews,
          })
          .then(() => {
            location.reload();
          });
      }
    },
    fetchDetails() {
      try {
        this.uid = firebase.auth().currentUser.uid;
        this.email = firebase.auth().currentUser.email;
        this.loggedIn = true;
      } catch (err) {
        this.loggedIn = false;
      }
    },
    get() {
      var shop = JSON.parse(localStorage.getItem("KEY"));
      console.log(shop);
      this.shopName = shop["name"];
      this.documentId = shop["document_id"];
      this.shopType = shop["type"];
      this.reviews = shop["reviews"];
    },
    updateDate() {
      for (let i = 0; i < this.reviews.length; i++) {
        let seconds = this.reviews[i].date.seconds;
        let nanoseconds = this.reviews[i].date.nanoseconds;
        let date = new Date(seconds * 1000 + nanoseconds / 1000000);
        //let year = date.getYear();
        //let month = date.getMonth();
        //let day = date.getDay();
        this.reviews[i].date = date;
      }
    },

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
  },
  computed: {
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
    this.fetchDetails();
    this.updateStars();
    this.updateDate();
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
  line-height: 2;
}

textarea {
  padding: 25px 20px;
  width: 600px;
  height: 80px;
  font-size: 20px;
  resize: none;
  color: #403939;
  font-size: 18px;
  margin: 10px;
  border-radius: 4px;
}

button {
  font-size: 18px;
  margin: 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>