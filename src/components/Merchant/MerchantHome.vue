<template>
  <div>
    <div class="header">
    <div class="flexWrap">
      <div class="flexCol">        
          <img id="logo" :src="require(`@/assets/logo.png`)" />
      </div>
      <div class="flexCol" id="title">
        MY BUSINESS
      </div>
      <div class="flexCol" id='nav'>
        <div class="btn-group">
          <a id="info" @click="toggleInformation">Information</a>
          <a id="dashboard" @click="toggleDashboard">Dashboard</a>
          <button v-on:click="logOut()" >Log Out</button>
        </div>
      </div>
      
    </div>
  </div>

    <div id="body" v-show="information">
      <merchant-information> </merchant-information>
    </div>

    <div id="body" v-show="dashboard">
      <merchant-dashboard> </merchant-dashboard>
    </div>
  </div>
</template>

<script>
import MerchantInformation from "./MerchantInformation.vue";
import MerchantDashboard from "./MerchantDashboard.vue";
import firebase from "firebase/app";

export default {
  components: {
    MerchantInformation: MerchantInformation,
    MerchantDashboard: MerchantDashboard,
  },
  data() {
    return {
      information: true,
      dashboard: false,
    };
  },
  methods: {
    toggleInformation() {
      this.information = true;
      this.dashboard = false;
      document.getElementById("info").style.borderBottom="2px solid";
      document.getElementById("dashboard").style.borderBottom="none";

    },
    toggleDashboard() {
      this.information = false;
      this.dashboard = true;
      document.getElementById("dashboard").style.borderBottom="1px solid";
      document.getElementById("info").style.borderBottom="none";
    },
    
    logOut: function() {
      firebase.auth().signOut().then(() => {
        console.log("signout");
        this.login=false;
        this.$router.replace({ path: "/" });
      }).catch((error) => {
        console.log(error.message);
      });
    },
  },
};
</script>

<style scoped>
.flexWrap {
  display: flex;
  overflow: hidden;
  margin: 30px;
  margin-bottom: 15px;
  border-bottom: 1px solid #000;
}
.flexCol {
  box-sizing: border-box;
  padding: 10px;
  width: 33.3%;
  align-self:center;
}

/* (B) BREAK DOWN 1 COLUMN ON SMALL SCREENS */
@media only screen and (max-width: 768px) {
  .flexWrap {
    flex-wrap: wrap;
  }
  .flexCol {
    width: 100%;
  }
}
#logo {
  width: 150px;
  float: left;
}
#title {
  top: 50%;
  font-size: 50px;
  font-family: Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif;
  font-weight: bold;
}

#nav {
  top: 50%;
  font-size: 30px;
  text-align: end;
}

a, button {
  color: #ed83a7;
  text-align: center;
  margin: 12px;
  padding:2px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
  border: none;
  background-color: white;
  font-weight: bold;
  cursor: pointer;
}

a:hover, button:hover {
  color: rgba(255, 0, 106, 0.875);
}

</style>