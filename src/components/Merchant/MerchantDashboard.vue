<template>
  <div>
    type : {{ merchantType }} <br />
    uid : {{ uid }} <br />
    reservations : {{ reservations }} <br />
    datesMonthYear: {{ datesMonthYear }} <br />
    datesFormatted : {{ datesFormatted }} <br />
    DatesAxis {{ datesAxis }} <br />
    Reservation Axis: {{ reservationAxis }} <br />
    <div class="clicks">
      VISITORS:
      <animated-number
        :value="clicks"
        :formatValue="formatClicks"
        :duration="1000"
      />
    </div>
    <div class="rating">
      RATING:
      <animated-number
        :value="rating"
        :formatValue="formatRating"
        :duration="1000"
      />

      <star-rating
        :rating="4.2"
        :increment="0.01"
        :fixed-points="2"
        :show-rating="false"
      ></star-rating>
    </div>

    <div class="chart">
      <Plotly :data="data" :layout="layout" :display-mode-bar="false"></Plotly>
    </div>
    <div id="barchart">
      <Plotly :data="clicksData" :layout="barLayout" :display-mode-bar="false"></Plotly>
    </div>
  </div>
</template>

<script>
import database from "../../firebase.js";
import firebase from "firebase/app";
import { Plotly } from "vue-plotly";
import AnimatedNumber from "animated-number-vue";
import StarRating from "vue-star-rating";

export default {
  components: { Plotly, AnimatedNumber, StarRating },
  data() {
    return {
      data: [
        {
          x: [],
          y: [],
          type: "scatter",
        }
      ],
      clicksData: [
        { 
          x: ["Jan", "Feb", "March", "April"],
          y: [],
          type: "bar",
        }
      ],
      layout: {
        title: "Monthly Reservations",
      },
      barLayout: {
        title: "Monthly Clicks",
      },
      name: "",
      email: "",
      mobile: "",
      reservations: [],
      uid: "",
      phone: "",
      clicks: "",
      rating: "",
      merchantType: "",
      reviews: [],
      datesMonthYear: [],
      datesFormatted: [],
      reservationAxis: [],
      datesAxis: [],
      monthsAxis: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      duration: 1000,
    };
  },
  methods: {
    //fetch number of clicks per month from firestore
    fetchClicks() {
      this.uid = firebase.auth().currentUser.uid;
      database
        .collection("eat")
        .where("user_id", "==", this.uid)
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            for (var j = 0; j < doc.data().numClicks.length; j++) {
              if (doc.data().numClicks[j] != 0) {
                this.clicksData[0].y.push(doc.data().numClicks[j]);
              }
            }
            this.generateMonthlyAxis(this.clicksData[0].y);
             //console.log(this.clicksData.y);
            //console.log(this.clicksData[0].y); // console output: [0, 6, 8, 14]
          })
        });
        console.log(this.clicksData[0].x);
    },

    //updates x axis to be past and current months only 
    generateMonthlyAxis: function(clickArray) {
      for (var i = 0; i < clickArray.length; i++) {
          this.clicksData[0].x.push(this.monthsAxis[i]);
        }
      },

    // Fetches reservation data from firestore
    fetchReservations() {
      console.log("fetchReservations() running");
      database
        .collection("reservation")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().user_id == this.uid) {
              console.log("inside fetchReservations if clause");
              var seconds = doc.data().date.seconds;
              var nanoseconds = doc.data().date.nanoseconds;
              var date = new Date(seconds * 1000 + nanoseconds / 1000000);
              this.reservations.push(doc.data());
              this.datesMonthYear.push([date.getMonth(), date.getFullYear()]);
              this.datesFormatted.push(date.toLocaleDateString());
            }
          });
          this.generateAxes();
        });
    },

    // Fetches Authentication details and Business details
    fetchDetails() {
      //console.log(this.type)
      this.uid = firebase.auth().currentUser.uid;
      this.email = firebase.auth().currentUser.email;
      this.phone = firebase.auth().currentUser.phoneNumber;
      database
        .collection("users")
        .doc(this.uid)
        .get()
        .then((doc) => {
          console.log("fetchDetails(): " + doc.data().business_type);
          this.merchantType = doc.data().business_type;
          this.reviews = doc.data().reviews;
          console.log(this.merchantType);
        })
        .then(() => {
          this.fetchClicksAndReviews();
          this.fetchReservations();
        });
      console.log("type Fetched");
      console.log("type : " + this.merchantType);
      console.log(this.reviews);
    },

    fetchClicksAndReviews() {
      console.log("fetching Clicks and Reservations");
      console.log(this.merchantType);
      database
        .collection(this.merchantType)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().user_id == this.uid) {
              this.clicks = doc.data().clicks;
              this.rating = doc.data().overallRating;
            }
          });
        });
      console.log("fetched Clicks and Reservations");
    },

    // Generates the arrays needed for plotting
    generateAxes() {
      console.log("generateAxes() running");
      //alert('generateAxes() is running and the length of datesMonth is: ' + this.datesMonth.length)
      let obj = {};
      for (let i = 0; i < this.datesFormatted.length; i++) {
        obj[this.datesFormatted[i][0]] =
          (obj[this.datesFormatted[i][0]] || 0) + 1;
      }
      this.data[0].y = Object.values(obj);

      var arr = Array.from(
        new Set(this.datesMonthYear.map(JSON.stringify)),
        JSON.parse
      ).sort();
      for (let i = 0; i < arr.length; i++) {
        this.data[0].x.push(
          "0" +
            (arr[i][0] + 1).toString() +
            "/" +
            arr[i][1].toString().slice(-2)
        );
      }
    },
    formatClicks(value) {
      return `${value.toFixed(0)}`;
    },
    formatRating(value) {
      return `${value.toFixed(1)}`;
    },
  },
  created() {
    this.fetchDetails();
    this.fetchClicks();
    /* this.fetchClicksAndReviews();
    this.fetchReservations(); */
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat");

.clicks {
  float: left;
  width: 50%;
  border-style: solid;
  box-sizing: border-box;
  width: 300px;
  height: 150px;
  padding: 30px;
}
.rating {
  float: right;
  width: 50%;
  border-style: solid;
  box-sizing: border-box;
  width: 300px;
  height: 150px;
  padding: 30px;
}
.chart {
  margin-top: 200px;
}
</style>