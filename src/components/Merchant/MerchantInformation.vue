<template>
  <div>
    user: {{ uid }}
    <br />
    <br />
    reservations: {{ reservations }}
    <br />
    <br />
    merchant : {{ merchantDetails }}

    <br />
    mobile : {{ mobile }}

    dashboard: {{ dashboard }}
    <div id="content" class="flexbox">
      <form>
        <label for="name">NAME:</label><br />
        <input type="name" id="name" name="name" v-model="name" /><br /><br />
        <label for="email">EMAIL:</label><br />
        <input
          type="email"
          id="email"
          name="email"
          v-model="email"
        /><br /><br />
        <label for="mobile">YOUR MOBILE:</label><br />
        <input
          type="text"
          id="mobile"
          name="mobile"
          v-model="mobile"
        /><br /><br />
        <label for="address">ADDRESS:</label><br />
        <input
          type="address"
          id="address"
          name="address"
          v-model="address"
        /><br /><br />
        <label for="mobile">Opening Hours:</label><br />
        <input
          type=""
          id="mobile"
          name="mobile"
          v-model="mobile"
        /><br /><br />
        <input type="button" id="submit" value="SAVE" v-on:click="save()" />
      </form>
      <br />
    </div>
  </div>
</template>

<script>
import database from "../../firebase.js";
import firebase from "firebase/app";

export default {
  data() {
    return {
      uid: "",
      reservations: [],
      merchantDetails: [],
      merchantId: "",
      name: "",
      email: "",
      mobile: "",
      address: "",
      opening_hours: "",
      phone: null,
      information: true,
      dashboard: false,
      merchant: false,
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
              this.reservations.push(doc.data());
            }
            localStorage.clear();
          });
        });
    },
    fetchMerchant() {
      database
        .collection("eat")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().user_id == this.uid) {
              this.merchantDetails.push(doc.data());
              this.mobile = doc.data().telephone;
              this.name = doc.data().name;
              this.address = doc.data().address;
            }
            localStorage.clear();
          });
        });
    },
    fetchDetails() {
      this.uid = firebase.auth().currentUser.uid;
      this.email = firebase.auth().currentUser.email;
      this.phone = firebase.auth().currentUser.phoneNumber;
    },
  },
  mounted() {
    this.fetchDetails();
    this.fetchReservations();
    this.fetchMerchant();
  },
};
</script>

<style scoped>
input {
  width: 200px;
  height: 25px;
}
</style>