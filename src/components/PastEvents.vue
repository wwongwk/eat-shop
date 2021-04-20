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
      <tr v-for="event in past" v-bind:key="event.index">
        <td>
          <img :src="event.imageURL" />
        </td>
        <td>
          {{ event.merchant_name }}
        </td>
        <td>
          {{ event.date.toDate().toLocaleDateString() }},
          {{ event.date.toDate().getHours() }}:{{
            event.date.toDate().getMinutes()
          }}
        </td>
        <td>{{ event.adults }} x Adults, {{ event.children }} x Children</td>
      </tr>
    </table>
    <p v-show="noPast">You have no past reservation</p>
  </div>
</template>

<script>
export default {
  props: ["past"],
  data() {
    return {
      noPast: false,
    };
  },
  methods: {
    checkPast: function () {
      if (this.past.length == 0) {
        this.noPast = true;
      }
    },
  },
  created() {
    this.checkPast();
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
</style>

