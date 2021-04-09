<template>
 <div>
  <table class="table">
    <tr>   
      <th>Item</th>
      <th>Date</th>
      <th>Quantity</th>
      <th></th>
    </tr>
    <tr v-for="event in upcoming" v-bind:key="event.index">
      <td>
        {{event.merchant_name}}
        </td>
      <td>{{event.date.toDate().toLocaleDateString()}}, {{event.date.toDate().getHours()}}:{{event.date.toDate().getMinutes()}}</td>
      <td>{{event.adults}} x Adults<br> {{event.children}} x Children</td>
      <td>
        <button id="deleteBtn" @click="deleteRow(event)">Delete</button>
      </td>
    </tr>
  </table>
</div> 
</template>

<script>
import firebase from "firebase";
import database from "../firebase.js";


export default {
  
  data() {
    return {
      allReservations: [],
      upcoming: [],
      past:[],
    };
  },
  methods: {         
    //fetch reservations data from firebase
    fetchReservations: function () {
      var user = firebase.auth().currentUser;
      database
        .collection("reservation")
        .where("customer_id", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.allReservations.push(doc.data());
            var date = doc.data()['date'].toDate().getTime()
            const nowDate = new Date();
            const elapsedTime = nowDate.getTime() - date;
            if (elapsedTime<=0) {
              this.upcoming.push(doc.data());
            } else {
              this.past.push(doc.data());
            } 
          });
        })
    }, 
    deleteRow(event) {
      database.collection("reservation").doc(event.booking_id).delete().then(() => {
        console.log("Document successfully deleted!");
        location.reload();
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    }
  },
  created() {
    this.fetchReservations();
  }
};
</script>

<style scoped>
  h1 {
    text-align: center;
    color: #ed83a7;
    font-size: 30px;
    letter-spacing: 0.1em;
    }

  th {
    vertical-align: center;
    border-bottom:1px solid #403939;
    margin: 20px;
  }
  td {
    vertical-align: center;
    border-bottom:1px solid #403939;
  }

  table {
    width: 95%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    vertical-align: center;
    font-size: 18px;
    color: #403939;
  }
  hr {
    color: #403939;
    height: 1px;
  }
  img {
    width: 200px;
    height: 135px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin-bottom: 30px;
    margin-top: 30px;
  }
  #deleteBtn {
    background-color: #ED83A7;
    font-size: 18px;
    padding: 5px 15px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #403939;
    border: none;
    cursor: pointer;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    border-radius: 5px;
  }


</style>

