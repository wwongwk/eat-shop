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
    stars : {{ overallRating }} <br>
    clicks : {{clicks}}
    <div id="scores">
      <p id="overall">{{ overallRating }}/5</p>
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

        
      



      </ul>



<ul class="pagination">
				<li class="page-item">
					<button type="button" class="page-link" v-if="page != 1" @click="page--"> Previous </button>
				</li>
				<li class="page-item">
					<button type="button" class="page-link"
           v-for="pageNumber in reviews.slice(page-1, page+5)" :key = "pageNumber.review"
            @click="page = pageNumber"> {{pageNumber}} </button>
				</li>
				<li class="page-item">
					<button type="button" @click="page++" v-if="page < reviews.length" class="page-link"> Next </button>
				</li>
			</ul>

        <div class="submitReview">
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
          <button @click="submitReview">SUBMIT REVIEW</button>
        </div>


    </div>
  </div>
</template>


<script>
import StarRating from "vue-star-rating";
import database from "../../firebase.js";
import firebase from "firebase/app";

export default {
  props: ['shop'],

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
      clicks : 0,
      documentId: "",
      reviews: [],
      stars: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      reviewTextArea: "",
      uid: "",
      email: "",
      name: "",
      loggedIn: false,
      page: 1,
			perPage: 8,
    };
  },

  methods: {
    


    setRating: function (rating) {
      this.rating = rating;
    },
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
            this.reviewTextArea="";
            window.scrollTo(0,0);
          });
      }
    },
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
    get() {
      /* var shop = JSON.parse(localStorage.getItem("KEY")); */
      this.shopName = this.shop["name"];
      this.documentId = this.shop["document_id"];
      this.shopType = this.shop["type"];
      this.clicks = this.shop["clicks"]
      this.overallRating = this.shop["overallRating"]
      database
          .collection(this.shopType)
          .doc(this.documentId)
          .get()
          .then((doc) => {
            this.reviews = doc.data().reviews;
            this.fetchDetails();
            this.updateStars();
            this.updateDate();
            this.updateOverallRating();
          });
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

.submitReview {
  margin-left: 60px;

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