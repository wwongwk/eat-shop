<template>
 <div>
  <table class="table">
    <tr>  
      <th></th> 
      <th>Item</th>
      <th>Date (DD/MM/YYYY)</th>
      <th>Quantity</th>
      <th></th>
    </tr>
    <tr v-for="event in upcoming" v-bind:key="event.index">
      <td>
        <img :src=event.imageURL>
      </td>
      <td>
        {{event.merchant_name}}
        </td>
      <td>{{event.date.toDate().toLocaleDateString()}}, {{event.date.toDate().getHours()}}:{{event.date.toDate().getMinutes()}}</td>
      <td>{{event.adults}} x Adults, {{event.children}} x Children</td>
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

    };
  },
  props: ["upcoming"],
  
  methods: {         
    deleteRow(event) {
      database.collection("reservation").doc(event.booking_id).delete().then(() => {
        console.log("Document successfully deleted!");
        location.reload();
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    },
    checkUpcoming: function() {
      if (this.upcoming == null) {
        this.noUpcoming = true;
      }
    }
  },
  created() {
    this.checkUpcoming();
  }
};
</script>

<style scoped>

  th {
    padding-bottom: 20px;
    padding-top: 20px;
    color: #ED83A7;
  }
  td {
    white-space: nowrap;
    overflow: hidden;
  }

  tr {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
    border-radius: 10px;
    background: #FFF;
    text-align: center;
  }
  table {
    width: 950px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 18px;
    color: #403939;
    padding-left: 0px;
    table-layout:fixed;
    
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
    background-color: #ED83A7;
    font-size: 18px;
    padding: 3px 8px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: white;
    border: none;
    cursor: pointer;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    border-radius: 5px;
  }


</style>

