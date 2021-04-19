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
        
      </div>
      <div id="side" class="flexCol">
        
        <router-link tag="button" to="/signup" v-show="!login">
          <img id="signupImg" src="../assets/signup.png" />
          Sign Up
          </router-link>
        <router-link tag="button" to="/login" v-show="!login"  exact>
          <img id="loginImg" src="../assets/logIn.png" />
          Login
        </router-link>
        <router-link tag="button" to="/profile" exact v-show="login">
          <img id="loginImg" src="../assets/logIn.png" />
          Profile
        </router-link>
        <button id="logOutBtn" v-on:click="logOut()" v-show="login" >
          <img id="logoutImg" src="../assets/logOut.png" />
          Log Out
        </button>
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
        alert("Successfully signed out!");
        this.login=false;
        if(this.$router.currentRoute.path!="/") {
          this.$router.replace({ path: "/" });
        }
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
}
.flexWrap {
  display: flex;
  overflow: hidden;
  margin: 0px;
  margin-left: 120px;
  margin-right: 120px;
  margin-bottom: 10px;
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
  width: 120px;
  float: left;
}
#signupImg {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
#loginImg {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
#logoutImg {
  width: 30px;
  height: 30px;
  vertical-align: middle;
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
  background-color: transparent;
  padding: 3px 10px;
  border: none;
  cursor: pointer;
} 

a.router-link-active {
  text-decoration: underline;
  text-decoration-color: rgb(248, 0, 112);
  text-decoration-thickness: 1px;
}
button.router-link-active {
  text-decoration: underline;
  text-decoration-thickness: 1px;
}

</style>