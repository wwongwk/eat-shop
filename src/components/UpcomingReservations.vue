<template>
<div>
  <p>{{allReservations}}</p>
  <p> past</p>
  <ul>
    <li v-for="event in past" v-bind:key="event.index">
    {{event.merchant_name}}, {{event.date.toDate()}}
    </li>
    <p> upcoming</p>
    <li v-for="event in upcoming" v-bind:key="event.index">
    {{event.merchant_name}}, {{event.date.toDate()}}
    </li>
  </ul>
</div>
</template>

<script>
import firebase from "firebase";
import database from "../firebase.js";

export default {
  data() {
    return {
      allReservations: [],
      upcoming: [],
      past:[],
    };
  },
  methods: {         
    //fetch reservations data from firebase
    fetchReservations: function () {
       var user = firebase.auth().currentUser;
      database
        .collection("reservation")
        .where("user_id", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.allReservations.push(doc.data());
            var date = doc.data()['date'].toDate().getTime()
            const nowDate = new Date();
            const elapsedTime = nowDate.getTime() - date;
            if (elapsedTime<=0) {
              this.upcoming.push(doc.data());
            } else {
              this.past.push(doc.data());
            }
            
          });
        })
    },
  },
  created() {
    this.fetchReservations();
  }
};
</script>

<style scoped>

</style>

