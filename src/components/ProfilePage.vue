<template>
  <div>
    <app-header></app-header>
    <img src="../assets/TopPic.png"/>
    <div class='profile'>
      <img id='logo' src="../assets/logo.png"/>
      <h1>MY PROFILE PAGE</h1>
      <div id="content">
        <div id='nav'>

          <button id="basic" v-bind:style='basic?activeStyling:styling' @click='toggleBasic()'><span>BASIC DETAILS</span></button><br>
          <button id="upcoming" v-bind:style='upcoming?activeStyling:styling' @click='toggleUpcoming()'><span>UPCOMING</span> <br>RESERVATIONS</button><br>
          <button id="past" v-bind:style='past?activeStyling:styling' @click='togglePast()'><span>PAST EVENTS</span></button><br>
          <button id="Fav" v-bind:style='fav?activeStyling:styling' @click='toggleFav()'><span>MY FAVORITES </span></button><br>
          <!-- <router-link tag="button" to="/profile" exact>BASIC DETAILS</router-link><br>
          <router-link tag="button" to="/upcoming" exact>UPCOMING <br>RESERVATIONS</router-link><br>
          <router-link tag="button" to="/past" exact>PAST EVENTS</router-link><br>
          <router-link tag="button" to="/myFav" exact>MY FAVORITES</router-link> -->
        </div>
        <div>
          <form v-show='basic'>
            <label for="name" >NAME:</label><br>
            <input type="name" id="name" name="name" v-model="name"><br><br>
            <label for="email">YOUR EMAIL:</label><br>
            <input type="email" id="email" name="email" v-model="email"><br><br>
            <label for="mobile">YOUR MOBILE:</label><br>
            <input type="number" id="mobile" name="mobile" v-model="mobile"><br><br>
          <router-link style="color: #ED83A7; text-decoration:underline" to="/changepw" exact> CLICK TO CHANGE PASSWORD</router-link><br><br>
            <input type="button" id='submit' value="SAVE" v-on:click="save()">
          </form>
          <upcoming-reservations v-show='upcoming'></upcoming-reservations>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from './Header.vue'
  import firebase from "firebase/app"
  import db from "../firebase.js"
  import 'firebase/auth'
  import UpcomingReservations from './UpcomingReservations.vue'

  export default {
    components: {
      AppHeader:Header,
      UpcomingReservations
    },
    data() {
      return {  
        name:"",
        email:"",
        mobile:"",
        basic:true,
        upcoming:false,
        past:false,
        fav:false,
        activeStyling: {
          backgroundColor:"#ED83A7",
          color:"white",
        },
        styling: {
          backgroundColor:"white",
          color:"#ED83A7",
        },
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
      toggleUpcoming: function() {
        this.upcoming=true;
        this.basic=false;
        this.fav=false;
        this.past=false;
      },
      toggleBasic: function() {
        this.upcoming=false;
        this.basic=true;
        this.fav=false;
        this.past=false;
      },
      togglePast: function() {
        this.upcoming=false;
        this.basic=false;
        this.fav=false;
        this.past=true;
      },
      toggleFav: function() {
        this.upcoming=false;
        this.basic=false;
        this.fav=true;
        this.past=false;
      }
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
  border: 1px solid #ED83A7;
  background-color: white;
  color: #ED83A7;
  cursor: pointer;
}
button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}
button span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}
button:hover span {
  padding-right: 25px;
}

button:hover span:after {
  opacity: 1;
  right: 0;
}

#nav {
  float:left;
  width: 25%
}

#content {
  display: flex;
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
  background-color: #ED83A7;
  width: auto;
  color:white;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
  height: auto;
  margin: 0px;
  border-style: none;
  cursor: pointer;
}
label {
  color: #ED83A7
}

h1 {
  margin: 0pc;
  margin-bottom: 20px;
  color:#ED83A7;
}
::placeholder {
  color: #b86a9960;
  font-size: 10px;
  padding:5px
}
.profile {
  margin-left: 50px;
  margin-right: 50px;
  padding:20px;
  margin-top: 30px;
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