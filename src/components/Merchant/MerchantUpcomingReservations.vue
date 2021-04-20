<template>
  <div>
    <h2>
      <img id="reservationImg" :src="require(`@/assets/reservation.png`)" />
      <span>UPCOMING RESERVATIONS</span>
    </h2>
    <table class="table">
      <tr>
        <th>Customer Username</th>
        <th>Date (DD/MM/YYYY)</th>
        <th id="quantity">Quantity</th>
        <th></th>
      </tr>
      <tr v-for="event in pageOfItems" v-bind:key="event.index">
        <td>{{ event.customer_name }}</td>
        <td>
          {{ event.date.toDate().toLocaleDateString("en-GB") }},
          {{ event.date.toDate().getHours() }}:{{
            event.date.toDate().getMinutes()
          }}
        </td>
        <td id="quantity">
          {{ event.adults }} x Adults, {{ event.children }} x Children
        </td>
        <td>
          <button
            v-if="event.showUp"
            id="confirmedBtn"
            @click="unconfirm(event)"
          >
            Confirmed
          </button>
          <button v-else id="confirmBtn" @click="confirm(event)">
            Confirm
          </button>
        </td>
      </tr>
    </table>

    <div id="page">
      <jw-pagination
        :items="upcoming"
        :pageSize="8"
        @changePage="onChangePage"
        id="page"
      ></jw-pagination>
    </div>

    <p v-show="noUpcoming">You have no upcoming reservation</p>
  </div>
</template>

<script>
import database from "../../firebase.js";
export default {
  data() {
    return {
      noUpcoming: false,
      pageOfItems: [],
    };
  },
  props: ["upcoming"],

  methods: {
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    confirm(event) {
      database
        .collection("reservation")
        .doc(event.booking_id)
        .update({
          showUp: true,
        })
        .then(() => {
          location.reload();
        });
    },
    unconfirm(event) {
      database
        .collection("reservation")
        .doc(event.booking_id)
        .update({
          showUp: false,
        })
        .then(() => {
          location.reload();
        });
    },
    checkUpcoming: function () {
      if (this.upcoming == null) {
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
#reservationImg {
  height: 50px;
  width: 50px;
  margin-right: 20px;
}
th {
  padding-bottom: 20px;
  padding-top: 20px;
  color: #ed83a7;
}
td {
  padding: 40px;
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
  width: 900px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 18px;
  color: #403939;
  padding-left: 0px;
  table-layout: fixed;
}
#quantity {
  width: 250px;
}
hr {
  color: #403939;
  height: 1px;
}

#confirmBtn {
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

#confirmedBtn {
  background-color: green;
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

