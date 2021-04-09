<template>
  <div>
    <div class="clicks">CLICKS: {{ clicks }}</div>

    <div class="rating">RATING: {{ rating }}</div>

    type : {{ merchantType }} <br />
    uid : {{ uid }} <br />
    reservations : {{ reservations }} <br />
    datesMonthYear: {{ datesMonthYear }} <br />
    datesFormatted : {{ datesFormatted }} <br />
    DatesAxis {{ datesAxis }} <br />
    Reservation Axis: {{ reservationAxis }} <br />

    <div class="chart">
      <Plotly :data="data" :layout="layout" :display-mode-bar="false"></Plotly>
    </div>
  </div>
</template>

<script>
import database from "../../firebase.js";
import firebase from "firebase/app";
import { Plotly } from "vue-plotly";

export default {
  components: { Plotly },
  data() {
    return {
      data: [
        {
          x: [],
          y: [],
          type: "scatter",
        },
      ],
      layout: {
        title: "Monthly Reservations",
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
    };
  },
  methods: {
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
              this.datesMonthYear.push([
                date.getMonth(),
                date.getFullYear(),
              ]);
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
  },
  created() {
    this.fetchDetails();
    /* this.fetchClicksAndReviews();
    this.fetchReservations(); */
  },
};
</script>

<style scoped>
.chart {
  width:1000px;
	padding:30px;
	margin:40px auto;
	background: #FFF;
	border-radius: 10px;
	-webkit-border-radius:10px;
	-moz-border-radius: 10px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
	-moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
	-webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
}
</style>