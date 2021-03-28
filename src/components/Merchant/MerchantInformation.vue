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

    document_id: {{ documentId }}

    dashboard: {{ dashboard }}

    <h2>{{name}}</h2>
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
        <label for="mobile">CONTACT NUMBER:</label><br />
        <input
          type="text"
          id="mobile"
          name="mobile"
          v-model="mobile"
        /><br /><br />
        <label for="address">ADDRESS:</label><br />
        <textarea id="address" name="address" v-model="address" /><br /><br />
        <label for="openingHours">Opening Hours:</label><br />
        <input
          type="text"
          id="openingHours"
          name="openingHours"
          v-model="openingHours"
        /><br /><br />
        <label for="description">Description:</label><br />
        <textarea
          id="description"
          name="description"
          v-model="description"
        ></textarea>
        <br /><br />
        <input type="button" id="submit" value="SAVE" @click="save" />
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
      type: "",
      reservations: [],
      merchantDetails: [],
      documentId:"",
      merchantId: "",
      name: "",
      email: "",
      mobile: "",
      address: "",
      openingHours: "",
      description: "",
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
              this.openingHours = doc.data().openingHours;
              this.description = doc.data().description;
              this.type = doc.data().type;
              this.documentId = doc.data().document_id;
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
    save() {
      database
        .collection(this.type)
        .doc(this.documentId)
        .update({
          name: this.name,
          email: this.email,
          mobile: this.mobile,
          address: this.address,
          openingHours: this.openingHours,
          description: this.description,
        })
        .then(() => {
          location.reload();
        });
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
  width: 300px;
  height: 25px;
  font-size: 20px;
}
textarea {
  width: 300px;
  height: 80px;
  font-size: 20px;
  resize: none;
}
</style>