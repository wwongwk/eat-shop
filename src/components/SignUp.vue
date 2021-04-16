<template>
  <div>
    <app-header></app-header>
    <img src="../assets/TopPic.png" />
    <div class="signup">
      <img id="logo" src="../assets/logo.png" />
      <h1>JOIN US</h1>
      <form>
        <input
          type="name"
          id="name"
          name="name"
          placeholder="USERNAME"
          v-model="form.name"
          v-on:keyup.enter="register"
        /><br /><br />
        <input
          type="email"
          id="email1"
          name="email"
          placeholder="YOUR EMAIL"
          v-model="form.email"
          v-on:keyup.enter="register"
        /><br /><br />
        <input
          type="tel"
          id="mobile"
          name="mobile"
          placeholder="MOBILE"
          v-on:keyup="onlyNumberKey($event)"
          v-model="form.mobile"
          v-on:keyup.enter="register"
        /><br /><br />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="PASSWORD"
          v-model="form.password"
          v-on:keyup.enter="register"
        /><br /><br />
        <input
          type="password"
          id="confirmpassword"
          name="confirmpassword"
          placeholder="CONFIRM PASSWORD"
          v-model="form.confirmpassword"
          v-on:keyup.enter="checkPassword, register"
        /><br /><br />
        
        <input
          type="button"
          id="submit"
          value="SIGN UP"
          v-on:click="register"
        />
      </form>
      <div id="lengthError" v-show="lengthErrorShown">
          {{ lengthErrorMessage }}
        </div>
        <div id="lowercaseError" v-show="lowercaseErrorShown">
          {{ lowercaseErrorMessage }}
        </div>
        <div id="uppercaseError" v-show="uppercaseErrorShown">
          {{ uppercaseErrorMessage }}
        </div>
      <router-link to="/" id="no" exact> NO, THANK YOU</router-link><br />
      <router-link to="/bizsignup" id="biz" exact>FOR BUSINESS</router-link>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import database from "../firebase.js";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
        mobile: "",
      },
      lengthErrorShown: false,
      lowercaseErrorShown: false,
      uppercaseErrorShown: false,
      lengthErrorMessage: "",
      lowercaseErrorMessage: "",
      uppercaseErrorMessage: "",
      strongPassword: true,
    };
  },

  components: {
    AppHeader: Header,
  },

  methods: {
    onlyNumberKey(evt) {
      // Only numbers allowed in mobile
      var ASCIICode = evt.which ? evt.which : evt.keyCode;
      if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
        alert("please key in only numbers");
        this.form.mobile = "";
      }
    },

    checkPassword: function () {
      console.log("checkpassword function called")
      var checked = false;
      //check if password is strong -- contains at least 8 characters, a lowercase letter and an uppercase letter
      if (this.form.password.length < 8) {
        console.log("password too short")
        this.lengthErrorShown = true;
        this.strongPassword = false;
        checked = true;
        this.lengthErrorMessage= "Your password is too short!"
      }
      if (this.form.password.toUpperCase() === this.form.password) {
        console.log("password missing lowercase letter")
        this.lowercaseErrorShown = true;
        this.strongPassword = false;
        checked = true;
        this.lowercaseErrorMessage= "Your password is missing a lowercase letter!"
      }
      if (this.form.password.toLowerCase() === this.form.password) {
        console.log("password missing uppercase letter")
        this.uppercaseErrorShown = true;
        this.strongPassword = false;
        checked = true;
        this.uppercaseErrorMessage= "Your password is missing an uppercase letter!"
      }
      if (!checked) {
        this.strongPassword = true;
      }
    },

    // user sign up with email and password,
    //Conditions: Ensure that form is filled, ensure user is not registered and password is strong
    //Else: there will be an alert
    register: function () {
      console.log("register function called")
      if (this.strongPassword === true) {
        
      if (
        this.form.name == "" ||
        this.form.email == "" ||
        this.form.password == "" ||
        this.form.mobile == ""
      ) {
        console.log("Incomplete submission!")
        alert("Incomplete submission!");
        return
      }
      if (this.form.password !== this.form.confirmpassword) {
        console.log("passwords mismatch")
        alert("Passwords are different! Check your password and try again.");
      } else {
        console.log("create new user in firebase")
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then((data) => {
            database
              .collection("users")
              .doc(data.user.uid)
              .set({
                user_id: data.user.uid,
                name: this.form.name,
                mobile: this.form.mobile,
                business: false,
                favorites: {},
              })
              .then(() => {
                alert("Successfully signed up");
                this.$router.replace({ path: "/" });
              });
          })
          .catch((error) => {
            alert(error.message);
          });
      }
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
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input {
  width: 200px;
  height: 25px;
}

#submit {
  background-color: #d25a7e;
  width: auto;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 13px;
  padding-bottom: 13px;
  height: auto;
  margin: 0px;
  border-style: none;
  margin-bottom: 3px;
  cursor: pointer;
}

h1 {
  margin: 0pc;
  margin-bottom: 20px;
  color: #d25a7e;
}
::placeholder {
  color: #b86a9960;
  font-size: 10px;
  padding: 5px;
}
.signup {
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

#lengthErrorMessage{
  font-size: 20px;
  text-align: center;
  margin-top: 10px;
}

#no,
#biz {
  text-decoration-line: underline;
  font-size: 10px;
  color: #a90065;
  margin: 50px;
  padding: 0px;
}
</style>