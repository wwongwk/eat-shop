<template>
  <div>
    <app-header></app-header>
    <img src="../assets/TopPic.png" />
    <div id="login">
      <img id="logo" src="../assets/logo.png" />
      <h1>LOGIN</h1>
      <form v-if="!biz">
        <input
          type="email"
          v-model.trim="email"
          id="email"
          name="email"
          placeholder="YOUR EMAIL"
          v-on:keyup.enter="login"
        /><br /><br />
        <input
          type="password"
          v-model.trim="password"
          id="password"
          name="password"
          placeholder="PASSWORD"
          v-on:keyup.enter="login"
        /><br /><br />
        <input type="button" id="submit" value="LOGIN" v-on:click="login" />
      </form>

      <form v-if="biz">
        <input
          type="email"
          v-model.trim="email"
          id="email"
          name="email"
          placeholder="BUSINESS EMAIL"
          v-on:keyup.enter="login"
        /><br /><br />
        <input
          type="password"
          v-model.trim="password"
          id="password"
          name="password"
          placeholder="PASSWORD"
          v-on:keyup.enter="login"
        /><br /><br />
        <input type="button" id="submit" value="LOGIN" v-on:click="login" />
      </form>

      <br />
      <div id="signup" v-if="!biz" style="font-size: 13px; margin: 10px">
        NO ACCOUNT?
        <router-link to="/signup" exact> SIGN UP!</router-link>
      </div>
      <div id="forgetPW">FORGET PASSWORD</div>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import firebase from "firebase/app";
import "firebase/auth";
import database from "../firebase";

export default {
  components: {
    AppHeader: Header,
  },
  data() {
    return {
      email: "",
      password: "",
      biz: false,
    };
  },
  methods: {
    login: function () {
      if (this.email=="" || this.password=="") {
        alert("Incomplete submission!");
      } else {    
        firebase
          .auth()
          .fetchSignInMethodsForEmail(this.email)
          .then(() => {
            firebase
              .auth()
              .signInWithEmailAndPassword(this.email, this.password)
              .then(() => {
                console.log("Successfully logged in");
                database
                  .collection("users")
                  .doc(firebase.auth().currentUser.uid)
                  .get()
                  .then((doc) => {
                    if (doc.exists) {
                      if (doc.data().business == false) {
                        this.$router.replace({ path: "/" });
                      } else {
                        this.$router.replace({ path: "/merchant" });
                      }
                    }
                  });
              });
          })
          .catch((error) => {
            console.log("Error fetching user data:", error);
            alert(error.message);
          });
      }
    },
  },
};
</script>

<style scoped>
img {
  width: 80%;
  height: auto;
}

input {
  width: 200px;
  height: 25px;
}

#submit {
  background-color: #ed83a7;
  width: auto;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
  height: auto;
  margin: 0px;
  border-style: none;
  cursor: pointer;
}

h1 {
  margin: 0pc;
  margin-bottom: 20px;
  color: #ed83a7;
}
::placeholder {
  color: #b86a9960;
  font-size: 14px;
  padding: 5px;
}
#login {
  border: 1px solid rgb(95, 0, 32);
  border-radius: 10px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  margin-top: 70px;
  margin-bottom: 70px;
}
form {
  padding-left: 50px;
  padding-right: 50px;
}
#logo {
  width: 150px;
}

#biz,
#forgetPW,
a {
  text-decoration-line: underline;
  font-size: 12px;
  color: #ed83a7;
  margin: 0px;
  cursor: pointer;
}
</style>