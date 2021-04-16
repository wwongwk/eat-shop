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
          v-model="name"
          v-on:keyup.enter="register"
        /><br /><br />
        <input
          type="email"
          id="email1"
          name="email"
          placeholder="YOUR EMAIL"
          v-model="email"
          v-on:keyup.enter="register"
        /><br /><br />
        <input
          type="tel"
          id="mobile"
          name="mobile"
          placeholder="MOBILE"
          v-on:keyup="onlyNumberKey($event)"
          v-model="mobile"
          v-on:keyup.enter="register"
        /><br /><br />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="PASSWORD"
          v-model="password"
          v-on:keyup.enter="register"
        /><br /><br />
        <input
          type="password"
          id="confirmpassword"
          name="confirmpassword"
          placeholder="CONFIRM PASSWORD"
          v-model="confirmpassword"
          v-on:keyup.enter="register"
        /><br /><br />
        
        <input
          type="button"
          id="submit"
          value="SIGN UP"
          v-on:click="register"
        />
      </form>
      <div id="errorDiv">
        <div id="lengthError" v-show="lengthErrorShown">
          {{ lengthErrorMessage }}
        </div>
        <div id="lowercaseError" v-show="lowercaseErrorShown">
          {{ lowercaseErrorMessage }}
        </div>
        <div id="uppercaseError" v-show="uppercaseErrorShown">
          {{ uppercaseErrorMessage }}
        </div>
        <div id="passwordMismatchError" v-show="passwordMismatchErrorShown">
          {{ passwordMismatchMessage }}
        </div>
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
      
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      mobile: "",
      
      lengthErrorShown: true,
      lowercaseErrorShown: true,
      uppercaseErrorShown: true,
      passwordMismatchErrorShown: true,
      lengthErrorMessage: " - Password at least 8 characters",
      lowercaseErrorMessage: "- Password requires a lowercase letter",
      uppercaseErrorMessage: "- Password requires an uppercase letter",
      passwordMismatchMessage: "- Password and Confirmation password mismatch",

      lengthCriteria: false,
      lowercaseCriteria: false,
      uppercaseCriteria: false,
      matchCriteria: false,

      strongPassword: false,
    };
  },

  components: {
    AppHeader: Header,
  },

  watch: {
    password: function(pwd) {
      this.password = pwd;
      if (this.password.length >= 8) {
        //this.lengthErrorShown = false; // length is more than 8
        document.getElementById("lengthError").style.color = "green";
        this.lengthCriteria = true;
      }
      if (this.password.length < 8) {
        //this.lengthErrorShown = true; // length is more than 8
        document.getElementById("lengthError").style.color = "red";
        this.lengthCriteria = false;
      }
      if (this.password.toUpperCase() != this.password) { // password contains lowercase  QWERTY QWERTY
        //this.uppercaseErrorShown = false;
        document.getElementById("lowercaseError").style.color = "green";
        this.lowercaseCriteria = true;
      }
      if (this.password.toUpperCase() === this.password) { // password contains uppercase only  QWERTY QWERTY
        //this.uppercaseErrorShown = true;
        document.getElementById("lowercaseError").style.color = "red";
        this.lowercaseCriteria = false;
      }
      if (this.password.toLowerCase() != this.password) { // password contains uppercase  qwerty qwerty
        //this.lowercaseErrorShown = false;
        document.getElementById("uppercaseError").style.color = "green";
        this.uppercaseCriteria = true;
      }
      if (this.password.toLowerCase() === this.password) { // password contains lowercase only  qwerty qwerty
        //this.lowercaseErrorShown = true;
        document.getElementById("uppercaseError").style.color = "red";
        this.uppercaseCriteria = false;
      }
      if (this.password === this.confirmpassword){ // password same
        //this.passwordMismatchErrorShown = false;
        document.getElementById("passwordMismatchError").style.color = "green";
        this.matchCriteria = true;
      }
      if (this.password != this.confirmpassword){  // password mismatch
        //this.passwordMismatchErrorShown = true;
        document.getElementById("passwordMismatchError").style.color = "red";
        this.matchCriteria = false;

      }
      if (this.password == "" || this.confirmpassword == ""){  // password mismatch
        //this.passwordMismatchErrorShown = true;
        document.getElementById("passwordMismatchError").style.color = "red";
        this.matchCriteria = false;
      }
      
    },
    confirmpassword: function(cfmPwd) {
      this.confirmpassword = cfmPwd
      if (this.password === this.confirmpassword){ // password same
        //this.passwordMismatchErrorShown = false;
        document.getElementById("passwordMismatchError").style.color = "green";
        this.matchCriteria = true;

      }
      if (this.password != this.confirmpassword){  // password mismatch
        //this.passwordMismatchErrorShown = true;
        document.getElementById("passwordMismatchError").style.color = "red";
        this.matchCriteria = false;
      }
      if (this.password == "" || this.confirmpassword == ""){  // password mismatch
        //this.passwordMismatchErrorShown = true;
        document.getElementById("passwordMismatchError").style.color = "red";
        this.matchCriteria = false;
      }
    }
  },

  methods: {
    onlyNumberKey(evt) {
      // Only numbers allowed in mobile
      var ASCIICode = evt.which ? evt.which : evt.keyCode;
      if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
        alert("please key in only numbers");
        this.mobile = "";
      }
    },

    // checkPassword: function () {
    //   console.log("checkpassword function called")
    //   var checked = false;
    //   //check if password is strong -- contains at least 8 characters, a lowercase letter and an uppercase letter
    //   if (this.form.password.length < 8) {
    //     console.log("password too short")
    //     this.lengthErrorShown = true;
    //     this.strongPassword = false;
    //     checked = true;
    //     this.lengthErrorMessage= "Your password is too short!"
    //   }
    //   if (this.form.password.toUpperCase() === this.form.password) {
    //     console.log("password missing lowercase letter")
    //     this.lowercaseErrorShown = true;
    //     this.strongPassword = false;
    //     checked = true;
    //     this.lowercaseErrorMessage= "Your password is missing a lowercase letter!"
    //   }
    //   if (this.form.password.toLowerCase() === this.form.password) {
    //     console.log("password missing uppercase letter")
    //     this.uppercaseErrorShown = true;
    //     this.strongPassword = false;
    //     checked = true;
    //     this.uppercaseErrorMessage= "Your password is missing an uppercase letter!"
    //   }
    //   if (!checked) {
    //     this.strongPassword = true;
    //   }
    // },

    // user sign up with email and password,
    //Conditions: Ensure that form is filled, ensure user is not registered and password is strong
    //Else: there will be an alert
    
    checkStrongPassword() {
      if (this.lengthCriteria === true && this.lowercaseCriteria === true && this.uppercaseCriteria === true && this.matchCriteria === true) {
        this.strongPassword = true;
      } 
    },

    register: function () {
      console.log("register function called")
      
      if ( this.name == "" || this.email == "" || this.mobile == "") { // incomplete fields
        console.log("Incomplete submission!")
        alert("Incomplete submission!");
        return;
      } 

      this.checkStrongPassword();

      if (this.strongPassword === false) {
        console.log("Password error")
        alert("Please check password!");
        return;
      
      } else {
        console.log("create new user in firebase")
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((data) => {
            database
              .collection("users")
              .doc(data.user.uid)
              .set({
                user_id: data.user.uid,
                name: this.name,
                mobile: this.mobile,
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

#errorDiv{
  text-align: left;
  color: red;
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