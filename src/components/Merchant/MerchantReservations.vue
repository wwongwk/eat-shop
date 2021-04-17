<template>
  <div>
    {{ uid }} <br />
    {{ shopId }} <br />
    {{ merchantType }} <br />
    pastRes: {{ pastRes }} <br />
    upcomingRes: {{ upcomingRes }} <br />
    TestRes: {{ testRes }} <br />
    <div class="content">
      <div id="nav">
        <button
          id="upcoming"
          v-bind:style="upcoming ? activeStyling : styling"
          @click="toggleUpcoming"
        >
          <span>UPCOMING<br />RESERVATIONS</span></button
        ><br />
        <button
          id="past"
          v-bind:style="past ? activeStyling : styling"
          @click="togglePast"
        >
          <span>PAST RESERVATIONS</span></button
        ><br />
      </div>
    </div>

    <div class="reservations">
      <upcoming-reservations
        v-bind:upcoming="upcomingRes"
        v-show="upcoming"
      ></upcoming-reservations>
      <past-events v-bind:past="pastRes" v-show="past"></past-events>
    </div>

    <div>
      Past Reservations:

      <br />

      Upcoming Reservations:
    </div>
  </div>
</template>

<script>
import database from "../../firebase.js";
import firebase from "firebase/app";
import UpcomingReservations from "./MerchantUpcomingReservations.vue";
import PastEvents from "./MerchantPastReservations.vue";

export default {
  components: { UpcomingReservations, PastEvents },
  data() {
    return {
      uid: "",
      shopId: "",
      merchantType: "",
      allReservations: [],
      testRes: [{ date: 5 }, { date: 3 }, { date: 12 }],
      pastRes: [],
      upcomingRes: [],
      upcoming: true,
      past: false,
      activeStyling: {
        backgroundColor: "#ED83A7",
        color: "white",
      },
      styling: {
        backgroundColor: "white",
        color: "#ED83A7",
      },
    };
  },
  methods: {
    // Fetches Authentication details and Business details
    fetchDetails() {
      this.uid = firebase.auth().currentUser.uid;
      database
        .collection("users")
        .doc(this.uid)
        .get()
        .then((doc) => {
          this.merchantType = doc.data().business_type;
          this.fetchReservations();
        });
    },
    fetchReservations: function () {
      database
        .collection("reservation")
        .where("user_id", "==", this.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.allReservations.push(doc.data());
            var date = doc.data()["date"].toDate().getTime();
            const nowDate = new Date();
            const elapsedTime = nowDate.getTime() - date;
            if (elapsedTime <= 0) {
              this.upcomingRes.push(doc.data());
            } else {
              this.pastRes.push(doc.data());
            }
          });
          this.upcomingRes.sort((a, b) => (a.date > b.date && -1) || 1);
          this.pastRes.sort((a, b) => (a.date > b.date && -1) || 1);
        });
    },
    toggleUpcoming: function () {
      this.upcoming = true;
      this.past = false;
    },
    togglePast: function () {
      this.upcoming = false;
      this.past = true;
    },
    sortReservations(a, b) {
      if (a.date.seconds < b.date.seconds) {
        return -1;
      }
      if (a.date.seconds > b.date.seconds) {
        return 1;
      }
      return 0;
    },
  },
  created() {
    this.fetchDetails();
  },
};
</script>


<style scoped>
button {
  width: 140px;
  padding: 10px;
  border: 1px solid #ed83a7;
  background-color: white;
  color: #ed83a7;
  cursor: pointer;
}
button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}
button span:after {
  content: "\00bb";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}
button:hover span {
  padding-right: 15px;
}

button:hover span:after {
  opacity: 1;
  right: 0;
}
#nav {
  float: left;
  width: 200px;
  margin-left: 100px;
}
.reservations {
  float: center;
  margin-left: 400px;
}
.content {
  display: flex;
  width: 100%;
}
</style>