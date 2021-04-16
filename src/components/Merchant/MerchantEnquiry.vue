<template>
  <div>
    <ul>
      <li id="header"><h2>ENQUIRIES</h2></li>
      <li v-for="enquiry in allEnquiries" :key="enquiry.id">
        {{ enquiry.name }} &emsp;&emsp;&emsp;&emsp;
        <a :href="`mailto:${enquiry.email}`">{{enquiry.email}}</a>
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
      this.uid = firebase.auth().currentUser.uid;
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
        if (currentEnquiry === enquiry) {
          this.allEnquiries.splice(i, 1);
          break;
        }
      }
      database
        .collection(this.merchantType)
        .doc(this.shopId)
        .update({
          enquiries: this.allEnquiries,
        })
        .then(() => {
          location.reload();
        });
    },
  },

  created() {
    this.fetchMerchant();
  },
};
</script>

<style scoped>
li {
  color: #403939;
  font-size: 18px;
  padding: 35px 20px;
  width: 1000px;
  text-align: left;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
  border-radius: 10px;
  background: #FFF;
  line-height: 2;
}

ul {
  list-style-type: none;
  width: 100%;
  margin-bottom: 100px;
  vertically-align: center;
  margin-left: 100px;
  margin-top: 50px;
}
#header {
  text-align: center;
  line-height: 1;
}
button {
  float: right;
  background-color: #ed83a7;
  border: none;
  border-radius: 5px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.1);
  color: white;
  font-size: 18px;
  margin-bottom: 50px;
}
</style>