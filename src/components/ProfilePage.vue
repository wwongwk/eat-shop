<template>
  <div>
    <app-header></app-header>
    <img src="../assets/TopPic.png"/>
    <div class='profile'>
      <img id='logo' src="../assets/logo.png"/>
      <h1>MY PROFILE PAGE</h1>
      <section>
      <div>
        <router-link tag="button" to="/profile" exact>BASIC DETAILS</router-link><br>
        <router-link tag="button" to="/" exact>UPCOMING <br>RESERVATIONS</router-link><br>
        <router-link tag="button" to="/" exact>PAST EVENTS</router-link>
      </div>
    <div id="content" class="flexbox">
      <form>
      
        <label for="name" >NAME:</label><br>
        <input type="name" id="name" name="name" v-model="name"><br><br>
        <label for="email">YOUR EMAIL:</label><br>
        <input type="email" id="email" name="email" v-model="email"><br><br>
        <label for="mobile">YOUR MOBILE:</label><br>
        <input type="number" id="mobile" name="mobile" v-model="mobile"><br><br>
       <router-link style="color: #D25A7E; text-decoration:underline" to="/changepw" exact> CLICK TO CHANGE PASSWORD</router-link><br><br>
        <input type="button" id='submit' value="SAVE" v-on:click="save()">
      </form>
      <br>
    </div>
      </section>
    </div>
  </div>
</template>

<script>
  import Header from './Header.vue'
  import firebase from "firebase/app"
  import db from "../firebase.js"
  import 'firebase/auth'

  export default {
    components: {
      AppHeader:Header
    },
    data() {
      return {  
        name:"",
        email:"",
        mobile:""
      }
    },
    methods: {
      save: function() {
        var uid = firebase.auth().currentUser.uid;
        db.collection('users').doc(uid).update({
          name: this.name,
          mobile: this.mobile
        });
      },
    },
    created() {
      var user = firebase.auth().currentUser;
      if (user != null) {
        this.email=user.email;
        
        var uid = user.uid;
        db.collection("users").doc(uid).get().then((doc) => {
          if (doc.exists) {
              this.name = doc.data().name;
              this.mobile=doc.data().mobile;
          } else {
              console.log("No such document!");
          }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
      }
    }
  }
</script>

<style scoped>

button {
  width: 140px;
  padding:10px;
  border: 1px solid #D25A7E;
  background-color: white;
  color: #D25A7E;
}
button.router-link-active {

  border: 1px solid #D25A7E;
  background-color: #D25A7E;
  color: white;
}
section {
  display: flex;
  overflow: hidden;
  margin: 30px;
  text-align: left;
  width: 800px;
  border:1px solid #D25A7E;
  
  
}
.flexbox {
  box-sizing: border-box;
  padding: 10px;
  border-left: 1px solid #D25A7E;
}
  
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
.profile {
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


</style>