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
          <button id="logout" v-on:click="logOut()" >Log Out</button>
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
      document.getElementById("info").style.backgroundColor="#ED83A7";
      document.getElementById("info").style.color="white";
      document.getElementById("dashboard").style.backgroundColor="white";
      document.getElementById("dashboard").style.color="black";
    },
    toggleDashboard() {
      this.information = false;
      this.dashboard = true;
      document.getElementById("dashboard").style.backgroundColor="#ED83A7";
      document.getElementById("dashboard").style.color="white";
      document.getElementById("info").style.backgroundColor="white";
      document.getElementById("info").style.color="black";
    },
    
    logOut: function() {
      firebase.auth().signOut().then(() => {
        alert("Successfully signed out!");        
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
/*   //font-family: Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif;*/  
  font-weight: bold;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

#nav {
  top: 50%;
  font-size: 30px;
  text-align: end;
}

#info, #dashboard, #logout {
  text-align: center;
  text-decoration: none;
  font-size: 18px;
  margin: 3px;
  background-color: white;
  border-radius: 11px;
  border-style: solid;
  border-color: #ed83a7;
  border-width: 2px;
  padding: 3px 12px;
  cursor: pointer;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

a:hover, button:hover {
  color: #ed83a7;
}

</style>