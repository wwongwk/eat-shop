<template>
  <div>
    <div class="header">
      <div class="flexWrap">
        <div class="flexCol">
          <img id="logo" :src="require(`@/assets/logo.png`)" />
        </div>
        <div class="flexCol" id="title">MY BUSINESS</div>
        <div class="flexCol" id="nav">
          <div class="btn-group">
            <button id="info" @click="toggleInformation">Information</button>
            <button id="dashboard" @click="toggleDashboard">Dashboard</button>
            <button id="reservations" @click="toggleReservations" v-show="type != 'shop'">Reservations</button>
            <button id="enquiries" @click="toggleEnquiries">Enquiries</button>
            <button id="logout" v-on:click="logOut()">Log Out</button>
          </div>
        </div>
      </div>
    </div>

    <div id="body" v-if="information">
      <merchant-information> </merchant-information>
    </div>

    <div id="body" v-else-if="dashboard">
      <merchant-dashboard> </merchant-dashboard>
    </div>

    <div id="body" v-else-if="reservations" v-show="type != 'shop'">
      <merchant-reservations> </merchant-reservations>
    </div>

    <div id="body" v-else-if="enquiries">
      <merchant-enquiry> </merchant-enquiry>
    </div>
  </div>
</template>

<script>
import MerchantInformation from "./MerchantInformation.vue";
import MerchantDashboard from "./MerchantDashboard.vue";
import MerchantEnquiry from "./MerchantEnquiry.vue";
import MerchantReservations from "./MerchantReservations.vue";

import firebase from "firebase/app";
import database from "../../firebase.js";

export default {
  components: {
    MerchantInformation: MerchantInformation,
    MerchantDashboard: MerchantDashboard,
    MerchantEnquiry: MerchantEnquiry,
    MerchantReservations: MerchantReservations,
  },
  data() {
    return {
      information: true,
      dashboard: false,
      reservations: false,
      enquiries: false,
      type: "",
    };
  },
  methods: {
    fetchMerchant() {
      this.uid = firebase.auth().currentUser.uid;
      database
        .collection("users")
        .doc(this.uid)
        .get()
        .then((doc) => {
          this.type=doc.data().business_type
        });
    },
    toggleInformation() {
      this.information = true;
      this.dashboard = false;
      this.enquiries = false;
      this.reservations = false;
      document.getElementById("info").style.backgroundColor = "#ED83A7";
      document.getElementById("info").style.color = "white";
      document.getElementById("dashboard").style.backgroundColor = "white";
      document.getElementById("dashboard").style.color = "black";
      document.getElementById("reservations").style.backgroundColor = "white";
      document.getElementById("reservations").style.color = "black";
      document.getElementById("enquiries").style.backgroundColor = "white";
      document.getElementById("enquiries").style.color = "black";
    },
    toggleDashboard() {
      this.information = false;
      this.dashboard = true;
      this.reservations = false;
      this.enquiries = false;
      document.getElementById("info").style.backgroundColor = "white";
      document.getElementById("info").style.color = "black";
      document.getElementById("dashboard").style.backgroundColor = "#ED83A7";
      document.getElementById("dashboard").style.color = "white";
      document.getElementById("reservations").style.backgroundColor = "white";
      document.getElementById("reservations").style.color = "black";
      document.getElementById("enquiries").style.backgroundColor = "white";
      document.getElementById("enquiries").style.color = "black";
    },
    toggleReservations() {
      this.information = false;
      this.dashboard = false;
      this.reservations = true;
      this.enquiries = false;
      document.getElementById("info").style.backgroundColor = "white";
      document.getElementById("info").style.color = "black";
      document.getElementById("dashboard").style.backgroundColor = "white";
      document.getElementById("dashboard").style.color = "black";
      document.getElementById("reservations").style.backgroundColor = "#ED83A7";
      document.getElementById("reservations").style.color = "white";
      document.getElementById("enquiries").style.backgroundColor = "white";
      document.getElementById("enquiries").style.color = "black";
    },
    toggleEnquiries() {
      this.information = false;
      this.dashboard = false;
      this.reservations = false;
      this.enquiries = true;
      document.getElementById("info").style.backgroundColor = "white";
      document.getElementById("info").style.color = "black";
      document.getElementById("dashboard").style.backgroundColor = "white";
      document.getElementById("dashboard").style.color = "black";
      document.getElementById("reservations").style.backgroundColor = "white";
      document.getElementById("reservations").style.color = "black";
      document.getElementById("enquiries").style.backgroundColor = "#ED83A7";
      document.getElementById("enquiries").style.color = "white";
    },

    logOut: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Successfully signed out!");
          if(this.$router.currentRoute.path!="/") {
            this.$router.replace({ path: "/" });
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
  
  destroyed() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        if(this.$router.currentRoute.path!="/") {
          this.$router.replace({ path: "/" });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  },

  beforeDestroy() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        if(this.$router.currentRoute.path!="/") {
          this.$router.replace({ path: "/" });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  },

  created() {
    this.fetchMerchant();
  },

  /* mounted() {
    window.addEventListener('beforeunload', function (event) {
       console.log(performance.navigation.type,"performance.navigation.type");
         
       firebase.auth().signOut().then(() => {
        alert("Successfully signed out!");        
        this.$router.replace({ path: "/" });
      }).catch((error) => {
        console.log(error.message);
      });

       event.preventDefault();

       event.returnValue = '';
    }, false);
} */

};
</script>

<style scoped>

.flexWrap {
  display: flex;
  overflow: hidden;
  margin: 20px;
  margin-bottom: 15px;
}
.flexCol {
  box-sizing: border-box;
  padding: 5px;
  width: 33.3%;
  align-self: center;
  display: flex;
}

/* (B) BREAK DOWN 1 COLUMN ON SMALL SCREENS */
@media only screen and (max-width: 600px) {
  .flexWrap {
    flex-wrap: wrap;
  }
  .flexCol {
    width: 100%;
  }
}
#logo {
  width: 20%;
  float: left;
}
#title {
  top: 50%;
  font-size: 30px;
  font-weight: bold;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  justify-content: center;
}

#nav {
  top: 50%;
  font-size: 30px;
  text-align: end;
}

#info,
#dashboard,
#enquiries,
#reservations,
#logout {
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin: 3px;
  background-color: white;
  border-radius: 11px;
  border-style: solid;
  border-color: #ed83a7;
  border-width: 2px;
  padding: 3px 10px;
  cursor: pointer;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

button:hover {
  color: #ed83a7;
}
</style>