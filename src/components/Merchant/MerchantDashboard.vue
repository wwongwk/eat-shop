<template>
  <div>
    Computed Axis: {{ generateAxesComputed}} <br>
    Method Axis: {{ reservationAxis }} <br>
    datesMonth' Length : {{datesMonth.length}} <br>
    {{ datesMonth }}
    {{ datesFormatted }}
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
  props: { Chart },
  data() {
    return {
      name: "",
      email: "",
      mobile: "",
      reservations: [],
      uid: "",
      phone: "",
      datesMonth: [],
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
              this.datesMonth.push(date.getMonth());
              this.datesFormatted.push(date.toLocaleDateString());
            }
          });
        });
    },
    fetchDetails() {
      this.uid = firebase.auth().currentUser.uid;
      this.email = firebase.auth().currentUser.email;
      this.phone = firebase.auth().currentUser.phoneNumber;
    },
    generateAxes() {
      alert(this.datesMonth.length)
      let obj = {};
      for (let i = 0; i < this.datesMonth.length; i++) {
        obj[this.datesMonth[i]] = (obj[this.datesMonth[i]] || 0) + 1;
      }
      this.reservationAxis = Object.values(obj);
      this.datesAxis = Array.from(new Set(this.datesMonth)).sort();
    },
  },
  computed: {
    generateAxesComputed() {
      let obj = {};
      for (let i = 0; i < this.datesMonth.length; i++) {
        obj[this.datesMonth[i]] = (obj[this.datesMonth[i]] || 0) + 1;
      }
      return Object.values(obj);
      //this.datesAxis = Array.from(new Set(this.datesMonth)).sort();
    },
  },
  created() {
    this.fetchDetails();
    this.fetchReservations();
    this.generateAxes();
  },
};
</script>

<style scoped>
</style>