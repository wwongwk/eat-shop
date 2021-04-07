<template>
  <div>
    <div class="clicks">CLICKS: {{ clicks }}</div>

    <div class="rating">RATING: {{ rating }}</div>

    type : {{ merchantType }} <br />
    uid : {{ uid }} <br />
    datesMonthYear: {{ datesMonthYear }} <br />
    {{ datesFormatted }} <br />
    DatesAxis {{ datesAxis }} <br />
    Method Axis: {{ reservationAxis }} <br />

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
          x: [1, 2, 3, 4],
          y: [10, 15, 13, 17],
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
        });
      //this.merchantType = type;
      console.log("type Fetched");

      // does not update this.merchantType. Console is empty, but the template is accurate.
      console.log("type : " + this.merchantType); 
      console.log(this.reviews); 
    },

    fetchClicksAndReviews() {
      console.log("fetching Clicks and Reservations");
      console.log(this.merchantType);
      database
        //Error because this.merchantType is empty.
        .collection(this.merchantType)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().user_id == this.uid) {
              //console.log('inside fetchReservations if clause')
              this.clicks = doc.data().clicks;
              this.rating = doc.data().overallRating;
            }
          });
        });
      console.log("fetched Clicks and Reservations");
    },

    generateAxes() {
      console.log("generateAxes() running");
      //alert('generateAxes() is running and the length of datesMonth is: ' + this.datesMonth.length)
      let obj = {};
      for (let i = 0; i < this.datesMonthYear.length; i++) {
        obj[this.datesMonthYear[i][0]] =
          (obj[this.datesMonthYear[i][0]] || 0) + 1;
      }
      this.reservationAxis = Object.values(obj);
      var arr = Array.from(
        new Set(this.datesMonthYear.map(JSON.stringify)),
        JSON.parse
      ).sort();
      for (let i = 0; i < arr.length; i++) {
        this.datesAxis.push(
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
    this.fetchClicksAndReviews();
    this.fetchReservations();
  },
};
</script>

<style scoped>
</style>