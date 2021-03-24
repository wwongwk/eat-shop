<template>
  <div>
    <app-header></app-header>
    <img src="../assets/TopPic.png"/>
    <div class='signup'>
      <img id='logo' src="../assets/logo.png"/>
      <h1>JOIN US</h1>
      <form >
        <input type="email" id="email1" name="email" placeholder="YOUR EMAIL" v-model="form.email"><br><br>
        <input type="password" id="password" name="password" placeholder= "PASSWORD" v-model="form.password"><br><br>
        <input type="date" id="date" name="date" placeholder= "PASSWORD"><br><br>
        <input type="tel" id="mobile" name="mobile" placeholder= "MOBILE"><br><br>
        <input type="button" id='submit' value="SIGN UP" v-on:click="register()">
      </form>
      <br>
    <div id='no'>NO, THANK YOU</div>
    </div>   
  </div>

</template>

<script>
  import Header from './Header.vue';
  import database from '../firebase.js'
  import firebase from "firebase/app"
  import 'firebase/auth'
  

  export default {
    data() {
      return {
        form: {
          name: "",
          email: "",
          password: ""
        },
      };
    },

    components: {
      AppHeader:Header
    },
   
    methods: {
       register: function() {
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          console.log("Successfully logged in");
          database.collection("eat").doc().set({name: "a"}).then(() => {});
          }).catch((error) => {
          alert(error.message);
        });
      },
    },
  }
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
.signup {
  
  border: 1px solid rgb(95, 0, 32);
  border-radius: 10px;
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

#no {
  text-decoration-line: underline;
  font-size: 10px;
  color: #A90065;
  margin: 0px;
}

</style>