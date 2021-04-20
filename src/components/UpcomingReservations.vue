<template>
  <div>
    <table class="table">
      <tr>
        <th></th>
        <th>Item</th>
        <th>Date (DD/MM/YYYY)</th>
        <th id="quantity">Quantity</th>
        <th></th>
      </tr>
      <tr v-for="event in upcoming" v-bind:key="event.index">
        <td>
          <img :src="event.imageURL" />
        </td>
        <td>
          {{ event.merchant_name }}
        </td>
        <td>
          {{ event.date.toDate().toLocaleDateString("en-GB") }},
          {{ event.date.toDate().getHours() }}:{{
            event.date.toDate().getMinutes()
          }}
        </td>
        <td>{{ event.adults }} x Adults, {{ event.children }} x Children</td>
        <td>
          <button id="deleteBtn" @click="deleteRow(event)">Delete</button>
        </td>
      </tr>
    </table>
    <p v-show="noUpcoming">You have no upcoming reservation</p>
  </div>
</template>

<script>
import database from "../firebase.js";
export default {
  data() {
    return {
      noUpcoming: false,
      reservationsArray: {},
    };
  },
  props: ["upcoming"],

  methods: {
   
    deleteRow(event) {
      database
        .collection(event.merchant_type)
        .doc(event.document_id)
        .get()
        .then((doc) => {
          //Get Year and Month of Booking date
          var year = event.date.toDate().getFullYear()
          var month = event.date.toDate().getMonth()

          // Get totalReservations from eat collection
          this.reservationsArray = doc.data().totalReservations;

          //Modify totalReservations
          var res = this.reservationsArray[year][month];
          this.reservationsArray[year][month] = res - 1;
        }).then (()=>{
          database.collection(event.merchant_type).doc(event.document_id).update({
            totalReservations: this.reservationsArray,
          });
        });

      database
        .collection("reservation")
        .doc(event.booking_id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          location.reload();
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
    checkUpcoming: function () {
      if (this.upcoming.length == 0) {
        this.noUpcoming = true;
      }
    },
  },
  created() {
    this.checkUpcoming();
  },
};
</script>

<style scoped>
th {
  padding-bottom: 20px;
  padding-top: 20px;
  color: #ed83a7;
}
td {
  white-space: nowrap;
  overflow: hidden;
}

tr {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
  border-radius: 10px;
  background: #fff;
  text-align: center;
}
table {
  width: 910px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 18px;
  color: #403939;
  padding-left: 0px;
  table-layout: fixed;
}
#quantity {
  width: 200px;
}
hr {
  color: #403939;
  height: 1px;
}
img {
  width: 100px;
  height: 80px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.09);
  margin-bottom: 30px;
  margin-top: 30px;
}
#deleteBtn {
  background-color: #ed83a7;
  font-size: 18px;
  padding: 3px 8px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
}
</style>

