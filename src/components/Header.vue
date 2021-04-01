<template>
  <div class="header">
    <div class="flexWrap">
      <div class="flexCol">
        <router-link to="/" exact>
          <img id="logo" src="../assets/logo.png" />
        </router-link>
      </div>
      <div class="flexCol" id='title'>
        <a> <router-link to="/" exact>HOME</router-link></a>
        <a> <router-link to="/eat" exact>EAT</router-link></a>
        <a> <router-link to="/shop" exact>SHOP</router-link></a>
        <a> <router-link to="/play" exact>PLAY</router-link></a>
        <a> <router-link to="/bizsignup" exact>FOR BUSINESS</router-link></a>
        
      </div>
      <div id="side" class="flexCol">
        <router-link to="/cart" exact>My Cart</router-link>
        <router-link tag="button" to="/signup" v-show="!login">Sign Up</router-link>
        <router-link tag="button" to="/login" v-show="!login"  exact>My Account</router-link>
        <router-link tag="button" to="/profile" exact v-show="login">Profile</router-link>
        <button v-on:click="logOut()" v-show="login" >Log Out</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";

export default {
  components: {},
  data() {
    return {
      login:""
    };
  },
  methods: {
    loginState: function() {
      var user = firebase.auth().currentUser;
      if (user) {
        this.login=true;
      } else { 
        this.login=false;
      }
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

  created() {
    var user = firebase.auth().currentUser;
    if (user) {
      this.login=true;
    } else { 
      this.login=false;
    }
  }
}
</script>

<style scoped>
* {
  font-family: "Segoe UI";
  font-size: 16px;
}
.flexWrap {
  display: flex;
  overflow: hidden;
  margin: 0px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #000;
}
.flexCol {
  box-sizing: border-box;
  padding: 5px;
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

#side {
  text-align: right;
}

/* Style the header links */
.header a {
  color: #ed83a7;
  text-align: center;
  padding: 8px;
  text-decoration: none;
  line-height: 25px;
}

button {
  margin: 3px;
  background-color: white;
  border-radius: 11px;
  border-style: solid;
  border-color: #ed83a7;
  padding: 3px 10px;
  cursor: pointer;
}
a.router-link-active {
  text-decoration: underline;
  text-decoration-color: rgb(248, 0, 112);
  text-decoration-thickness: 2px;
}
button.router-link-active {
  background-color: #ed83a7;
  color: white;
}

button.router-linl-active{
  background-color: #ed83a7;
  color: white;
}

</style>