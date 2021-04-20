<template>
  <div>
    <app-header></app-header>
    <img src="../assets/TopPic1.png"/>
    <div class='changepw'>
      <img id='logo' src="../assets/logo.png"/>
      <h1>CHANGE PASSWORD</h1>
      <div id="content" class="flexbox">
        <form>
          <label for="new">*New Password:</label><br>
          <input type="text" id="new" v-model="password"><br><br>
          <label for="re-enter">*Re-Enter New Password:</label><br>
          <input type="text" id="re-enter" v-model="confirmpassword"><br><br>

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
          <br>
          <input type="button" id='submit' value="CHANGE" v-on:click="change()">
        </form>
        <br>
      </div>

      
    </div>
  </div>
</template>

<script>
  import Header from './Header.vue'
  import firebase from "firebase/app"
  import 'firebase/auth'

  export default {
    components: {
      AppHeader:Header
    },
    data() {
      return {  
        password:"",
        confirmpassword:"",

        lengthErrorShown: true,
        lowercaseErrorShown: true,
        uppercaseErrorShown: true,
        passwordMismatchErrorShown: true,
        lengthErrorMessage: " - Password requires at least 8 characters",
        lowercaseErrorMessage: "- Password requires a lowercase letter",
        uppercaseErrorMessage: "- Password requires an uppercase letter",
        passwordMismatchMessage: "- Password and Confirmation password need to match",

        lengthCriteria: false,
        lowercaseCriteria: false,
        uppercaseCriteria: false,
        matchCriteria: false,

        strongPassword: false,
      }
    },
    methods: {
      change: function() {
        if (this.lengthCriteria === true && this.lowercaseCriteria === true && this.uppercaseCriteria === true && this.matchCriteria === true) {
          var user = firebase.auth().currentUser;
          user.updatePassword(this.password).then(()=> {             
            alert("Password changed successfully!");
            this.$router.replace({ path: "/profile" });          
          }).catch(function(error) {
            console.log(error.message);
          });
        } else {
          alert("Please check if your password fufill stated requirements.")
        }
      }
    },
    watch: {
      password: function(pwd) {
        this.password = pwd;
        if (this.password.length >= 8) {
          document.getElementById("lengthError").style.color = "green";
          this.lengthCriteria = true;
        }
        if (this.password.length < 8) {
          document.getElementById("lengthError").style.color = "red";
          this.lengthCriteria = false;
        }
        if (this.password.toUpperCase() != this.password) { // password contains lowercase  QWERTY QWERTY
          document.getElementById("lowercaseError").style.color = "green";
          this.lowercaseCriteria = true;
        }
        if (this.password.toUpperCase() === this.password) { // password contains uppercase only  QWERTY QWERTY
          document.getElementById("lowercaseError").style.color = "red";
          this.lowercaseCriteria = false;
        }
        if (this.password.toLowerCase() != this.password) { // password contains uppercase  qwerty qwerty
          document.getElementById("uppercaseError").style.color = "green";
          this.uppercaseCriteria = true;
        }
        if (this.password.toLowerCase() === this.password) { // password contains lowercase only  qwerty qwerty
          document.getElementById("uppercaseError").style.color = "red";
          this.uppercaseCriteria = false;
        }
        if (this.password === this.confirmpassword){ // password same
          document.getElementById("passwordMismatchError").style.color = "green";
          this.matchCriteria = true;
        }
        if (this.password != this.confirmpassword){  // password mismatch
          document.getElementById("passwordMismatchError").style.color = "red";
          this.matchCriteria = false;

        }
        if (this.password == "" || this.confirmpassword == ""){  // password mismatch
          document.getElementById("passwordMismatchError").style.color = "red";
          this.matchCriteria = false;
        }
      },
      confirmpassword: function(cfmPwd) {
        this.confirmpassword = cfmPwd
        if (this.password === this.confirmpassword){ // password same
          document.getElementById("passwordMismatchError").style.color = "green";
          this.matchCriteria = true;

        }
        if (this.password != this.confirmpassword){  // password mismatch
          document.getElementById("passwordMismatchError").style.color = "red";
          this.matchCriteria = false;
        }
        if (this.password == "" || this.confirmpassword == ""){  // password mismatch
          document.getElementById("passwordMismatchError").style.color = "red";
          this.matchCriteria = false;
        }
      }     
    },
  }
</script>

<style scoped>
img {
  width: 80%;
  height: auto;
}
button {
  width: 140px;
  padding:10px;
  border: 1px solid #D25A7E;
  background-color: white;
  color: #D25A7E;
}

input {
  width: 200px;
  height: 25px;
  border: none;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  background-color: #fff;
}
input:focus {
  outline: none;
  border-bottom: 2px solid #ED83A7;
}
#submit {
  background-color: #D25A7E;
  width: auto;
  color:white;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
  height: auto;
  margin: 0px;
  border-style: none;
}
label {
  color: #D25A7E
}

h1 {
  margin: 0pc;
  margin-bottom: 20px;
  color:#D25A7E;
}
::placeholder {
  color: #b86a9960;
  font-size: 10px;
  padding:5px
}
.changepw {
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  padding:20px;
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

#errorDiv{
  text-align: left;
  color: red;
}
</style>