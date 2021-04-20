<template>
  <div>
    <app-header></app-header>
    <img src="../assets/TopPic1.png" />
    <div class="profile">
      <img id="logo" src="../assets/logo.png" />
      <h1>MY PROFILE PAGE</h1>
      <div class="content">
        <div id="nav">
          <button
            id="basic"
            v-bind:style="basic ? activeStyling : styling"
            @click="toggleBasic()"
          >
            <span>BASIC DETAILS</span></button
          ><br />
          <button
            id="upcoming"
            v-bind:style="upcoming ? activeStyling : styling"
            @click="toggleUpcoming()"
          >
            <span>UPCOMING<br />RESERVATIONS</span></button
          ><br />
          <button
            id="past"
            v-bind:style="past ? activeStyling : styling"
            @click="togglePast()"
          >
            <span>PAST RESERVATIONS</span></button
          ><br />
          <button
            id="Fav"
            v-bind:style="fav ? activeStyling : styling"
            @click="toggleFav()"
          >
            <span>MY FAVORITES </span></button
          ><br />
        </div>
        <div>
          <form v-show="basic">
            <label for="name">NAME:</label><br />
            <input
              type="name"
              id="name"
              name="name"
              v-model="name"
            /><br /><br />
            <label for="email">YOUR EMAIL:</label><br />
            <input
              type="email"
              id="email"
              name="email"
              v-model="email"
            readonly/><br /><br />
            <label for="mobile">YOUR MOBILE:</label><br />
            <input
              type="number"
              id="mobile"
              name="mobile"
              v-model="mobile"
            /><br /><br />
            <router-link
              style="color: #ed83a7; text-decoration: underline"
              to="/changepw"
              exact
            >
              CLICK TO CHANGE PASSWORD</router-link
            ><br /><br />
            <input type="button" id="submit" value="SAVE" v-on:click="save()" />
          </form>
          <upcoming-reservations
            v-bind:upcoming="upcomingRes"
            v-show="upcoming"
          ></upcoming-reservations>
          <past-events v-bind:past="pastRes" v-show="past"></past-events>
          <my-favorite v-show="fav"></my-favorite>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import firebase from "firebase/app";
import db from "../firebase.js";
import "firebase/auth";
import UpcomingReservations from "./UpcomingReservations.vue";
import PastEvents from "./PastEvents.vue";
import MyFavorite from "./MyFavorites.vue";

export default {
  components: {
    AppHeader: Header,
    UpcomingReservations,
    PastEvents,
    MyFavorite,
  },
  data() {
    return {
      name: "",
      email: "",
      mobile: "",
      upcomingRes: [],
      pastRes: [],
      allReservations: [],
      basic: true,
      upcoming: false,
      past: false,
      fav: false,
      activeStyling: {
        backgroundColor: "#ED83A7",
        color: "white",
      },
      styling: {
        backgroundColor: "white",
        color: "#ED83A7",
      },
    };
  },
  methods: {
    save: function () {
      var uid = firebase.auth().currentUser.uid;
      db.collection("users").doc(uid).update({
        name: this.name,
        mobile: this.mobile,
      }).then (()=>{
        alert("Successfully saved!")
      });
    },
    fetchReservations: function () {
      var user = firebase.auth().currentUser;
      db.collection("reservation")
        .where("customer_id", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.allReservations.push(doc.data());
            var date = doc.data()["date"].toDate().getTime();
            const nowDate = new Date();
            const elapsedTime = nowDate.getTime() - date;
            if (elapsedTime <= 0) {
              this.upcomingRes.push(doc.data());
            } else {
              this.pastRes.push(doc.data());
            }
          });
          this.upcomingRes.sort((a, b) => (a.date > b.date && -1) || 1);
          this.pastRes.sort((a, b) => (a.date > b.date && -1) || 1);
        });
    },
    toggleUpcoming: function () {
      this.upcoming = true;
      this.basic = false;
      this.fav = false;
      this.past = false;
    },
    toggleBasic: function () {
      this.upcoming = false;
      this.basic = true;
      this.fav = false;
      this.past = false;
    },
    togglePast: function () {
      this.upcoming = false;
      this.basic = false;
      this.fav = false;
      this.past = true;
    },
    toggleFav: function () {
      this.upcoming = false;
      this.basic = false;
      this.fav = true;
      this.past = false;
    },
    getData() {
      var user = firebase.auth().currentUser;
      if (user != null) {
        this.email = user.email;

        var uid = user.uid;
        db.collection("users")
          .doc(uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.name = doc.data().name;
              this.mobile = doc.data().mobile;
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
        this.fetchReservations();
      }
    },
  },

  created() {
    this.getData();
  },
};
</script>

<style scoped>
button {
  width: 140px;
  padding: 10px;
  border: 1px solid #ed83a7;
  background-color: white;
  color: #ed83a7;
  cursor: pointer;
}
button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}
button span:after {
  content: "\00bb";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}
button:hover span {
  padding-right: 15px;
}

button:hover span:after {
  opacity: 1;
  right: 0;
}

#nav {
  float: left;
  width: 200px;
  margin-left: 50px;
}

.content {
  display: flex;
  width: 100%;
}

img {
  width: 80%;
  height: auto;
}

input {
  width: 300px;
  height: 25px;
  margin-top: 10px;
  /* box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box; 
  display: block;
	width: 100%;*/
  outline: none;

  padding: 7px;
  font: 16px Arial, Helvetica, sans-serif;
  height: 45px;
  border-radius: 15px;
  border: 0;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

#submit {
  font-family: Futura;
  height: 40px;
  text-align: center;
  background: #ed83a7;
  cursor: pointer;
  font-size: 16px;
  border: 0;
  transition: all 0.5s;
  border-radius: 10px;
  width: auto;
  position: relative;
}
#submit::after {
  content: "\00bb";
  font-family: "Font Awesome 5 Pro";
  font-weight: 400;
  position: absolute;
  left: 85%;
  top: 31%;
  right: 5%;
  bottom: 0;
  opacity: 0;
}

#submit:hover {
  background: #d25a7e;
  transition: all 0.5s;
  border-radius: 10px;
  box-shadow: 0px 6px 15px #ed83a7;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
}
#submit:hover::after {
  opacity: 1;
  transition: all 0.5s;
}

label {
  color: #ed83a7;
}

h1 {
  margin: 0pc;
  margin-bottom: 20px;
  color: #ed83a7;
}
::placeholder {
  color: #b86a9960;
  font-size: 10px;
  padding: 5px;
}
.profile {
  margin-left: 50px;
  margin-right: 50px;
  padding: 20px;
  margin-top: 30px;
  margin-bottom: 70px;
}
form {
  padding-left: 130px;
  width: 100%;
  vertical-align: center;
}
#logo {
  width: 150px;
}
</style>