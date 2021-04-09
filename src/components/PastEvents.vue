<template>
 <div>
  <table class="table">
    <tr>  
      <th></th> 
      <th>Item</th>
      <th>Date (DD/MM/YYYY)</th>
      <th>Quantity</th>
    </tr>
    <tr v-for="event in past" v-bind:key="event.index">
      <td>
        <img :src=event.imageURL>
      </td>
      <td>
        {{event.merchant_name}}
        </td>
      <td>{{event.date.toDate().toLocaleDateString()}}, {{event.date.toDate().getHours()}}:{{event.date.toDate().getMinutes()}}</td>
      <td>{{event.adults}} x Adults, {{event.children}} x Children</td>
    </tr>
  </table>
  <p v-show="noPast">You have no past events</p>
</div> 
</template>

<script>
export default {
  props:["past"],
  data() {
    return {
      noPast: false
    };
  },
  methods: {         
    checkPast: function() {
      if (this.past.length == 0) {
        this.noPast = true;
      }
    }
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
  }
  table {
    width: 850px;
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


</style>

