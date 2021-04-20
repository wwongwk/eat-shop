<template>
  <div>
    <h2>
      <img id="reservationImg" :src="require(`@/assets/reservation.png`)" />
      <span>PAST RESERVATIONS</span>
    </h2>
    <table class="table">
      <tr>
        <th>Customer Username</th>
        <th>Date (DD/MM/YYYY)</th>
        <th id="quantity">Quantity</th>
      </tr>
      <tr v-for="event in pageOfItems" v-bind:key="event.index">
        <td>
          {{ event.customer_name }}
        </td>
        <td>
          {{ event.date.toDate().toLocaleDateString() }},
          {{ event.date.toDate().getHours() }}:{{
            event.date.toDate().getMinutes()
          }}
        </td>
        <td id="quantity">
          {{ event.adults }} x Adults, {{ event.children }} x Children
        </td>
      </tr>
    </table>

    <div id="page">
      <jw-pagination
        :items="past"
        :pageSize="5"
        @changePage="onChangePage"
        id="page"
      ></jw-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ["past"],
  data() {
    return {
      noPast: false,
      pageOfItems: [],
    };
  },
  methods: {
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
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
  white-space: nowrap;
  overflow: hidden;
  height: 100px;
}
tr {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
  border-radius: 10px;
  background: #fff;
  text-align: center;
  height: 100px;
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
</style>

