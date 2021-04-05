<template></template>

<script>
import firebase from "firebase";
import database from "../../firebase";

export default {
  data() {
    return {
      allReservations: [],
      ownReservations: [],
    };
  },
  methods: {
    fetchReservations: function () {
      //fetch reservations data from firebase
      database
        .collection("reservation")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.allReservations.push(doc.data());
            localStorage.clear();
          });
        });
    },

    getOwnReservations: function () {
      //loop through all reservations to find particular user reservation
      var user = firebase.auth().currentUser;
      for (let i = 0; i < this.allReservations.length; i++) {
        var current = this.allReservations[i];
        if (current.user_id === user.uid) {
          this.ownReservations.push(current);
        }
      }
    },
  }
};
</script>

<style scoped>

</style>

