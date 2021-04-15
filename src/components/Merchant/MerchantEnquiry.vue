<template>
  <div>
    <ul>
      <li v-for="enquiry in allEnquiries" :key="enquiry.id">
        {{ enquiry.name }}
        <br />
        {{ enquiry.email }}
        <br />
        {{ enquiry.message }}
        <button v-on:click="deleteEnquiry(enquiry)" id="deleteBtn">
          DELETE
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import database from "../../firebase.js";
import firebase from "firebase/app";

export default {
  data() {
    return {
      allEnquiries: [],
      uid: "",
      shopId: "",
      merchantType: "",
    };
  },
  methods: {
    // Fetches Merchant/Business information
    fetchMerchant() {
      var fetched = false;
      database
        .collection("eat")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().user_id == this.uid) {
              this.shopId = doc.data().document_id;
              this.merchantType = doc.data().type;
              fetched = true;
              this.fetchEnquiries();
            }
            localStorage.clear();
          });
        });
      if (!fetched) {
        database
          .collection("shop")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              if (doc.data().user_id == this.uid) {
                this.shopId = doc.data().document_id;
                this.merchantType = doc.data().type;
                this.fetchEnquiries();
              }
              localStorage.clear();
            });
          });
      }
    },

    fetchEnquiries: function () {
      this.uid = firebase.auth().currentUser.uid;
      database
        .collection(this.merchantType)
        .where("user_id", "==", this.uid)
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            this.allEnquiries = doc.data().enquiries;
          });
        });
    },

    //deletes enquiry
    deleteEnquiry: function (enquiry) {
      for (var i = 0; i < this.allEnquiries.length; i++) {
        var currentEnquiry = this.allEnquiries[i];
        var temp;
        if (currentEnquiry === enquiry) {
          temp = this.allEnquiries.splice(i, 1);
        }
      }
      database
        .collection(this.merchantType)
        .doc(this.shopId)
        .update({
          enquiries: temp,
        })
        .then(() => {
        });
    },
  },

  created() {
    this.fetchMerchant();
  },
};
</script>

<style scoped>
</style>