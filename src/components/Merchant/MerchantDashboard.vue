<template>
  <div>
    datesMonthYear: {{ datesMonthYear }} <br />
    {{ datesFormatted }} <br />
    DatesAxis {{ datesAxis }} <br />
    Method Axis: {{ reservationAxis }} <br />

    <div class="chart">
      <chart> </chart>
    </div>
  </div>
</template>

<script>
import database from "../../firebase.js";
import firebase from "firebase/app";
import Chart from "./LineChart.js";

export default {
  components: { Chart },
  data() {
    return {
      name: "",
      email: "",
      mobile: "",
      reservations: [],
      uid: "",
      phone: "",
      datesMonthYear: [],
      datesFormatted: [],
      reservationAxis: [],
      datesAxis: [],
    };
  },
  methods: {
    fetchReservations() {
      database
        .collection("reservation")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().user_id == this.uid) {
              var seconds = doc.data().date.seconds;
              var nanoseconds = doc.data().date.nanoseconds;
              var date = new Date(seconds * 1000 + nanoseconds / 1000000);
              this.reservations.push(doc.data());
              this.datesMonthYear.push([date.getMonth(), date.getFullYear()]);
              this.datesFormatted.push(date.toLocaleDateString());
            }
          });
          console.log("fetchReservations() running");
          //alert('fetchReservations() is running and the length of datesMonth is: ' + this.datesMonth.length)
          this.generateAxes();
        });
    },
    fetchDetails() {
      this.uid = firebase.auth().currentUser.uid;
      this.email = firebase.auth().currentUser.email;
      this.phone = firebase.auth().currentUser.phoneNumber;
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
  mounted() {
    this.fetchDetails();
    this.fetchReservations();
  },
};
</script>

<style scoped>
</style>