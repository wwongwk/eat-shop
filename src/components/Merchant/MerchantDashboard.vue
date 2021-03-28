<template>
  <div>
    uid : {{ uid }}
    <br />
    <br />
    <br />
    <br />
    dates : {{ dates }}
    <br />
    reservations : {{ reservations }}
    <br />
    <br />
    <div class="chart">
      <h1>Line Chart</h1>
      <chart></chart>
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
      dates: [],
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
              var dateFormatted = new Date(
              seconds * 1000 + nanoseconds / 1000000);
              this.reservations.push(doc.data())
              this.dates.push(dateFormatted.toLocaleDateString('en-GB'));
            }
          });
        });
    },
    fetchDetails() {
      this.uid = firebase.auth().currentUser.uid;
      this.email = firebase.auth().currentUser.email;
      this.phone = firebase.auth().currentUser.phoneNumber;
    },
  },
  created() {
    this.fetchDetails();
    this.fetchReservations();
  },
};
</script>

<style scoped>
</style>