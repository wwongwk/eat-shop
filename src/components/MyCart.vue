<template>
  <div>
    <CartHeader></CartHeader>
    <table class="table">
      <tr>
        <th></th>
        <th>Item</th>
        <th>Date</th>
        <th>Quantity</th>
        <th></th>
      </tr>
      <tr v-for="item in itemsList" v-bind:key="item.name">
        <a v-bind:href="item.link">
          <img v-bind:src="item.image"/>
        </a>
        <td>{{item.name}}</td>
        <td>
          <input type="date" id="date">
        </td>
        <td>
          <input type="number" min="1" id="qty">
        </td>
        <td>
          <input type="button" id="deleteBtn" value="Delete" @click="deleteRow(item)">
        </td>
      </tr>
    </table>
    <input type="button" class="button" id="CheckOutBtn" value="Checkout">
  </div>
</template>

<script>
import CartHeader from './CartHeader.vue'

export default {
  name: "My cart",
  components: {
    CartHeader: CartHeader,
  },

  data() {
    return {
      itemsList: [{
                  name:'BBQ Place',
                  date: '20.03.2021',
                  quantity: '2',
                  image:'https://withlocals-com-res.cloudinary.com/image/upload/w_750,h_424,c_fill,g_auto,q_auto,dpr_2.0,f_auto/0f88182574826cc51cdc182eecd1c5db'
                  },
                  {name:'Botany Workshop',
                  date: '21.03.2021',
                  quantity: '3',
                  image:'https://sf1.mariefranceasia.com/wp-content/uploads/sites/7/2018/05/22218212_801883149982834_2264372406007038949_o-617x410.jpg'
                  },
                  {name:'Marui Sushi',
                  date: '25.03.2021',
                  quantity: '2',
                  link: 'http://maruisushi4u.com/',
                  image:'https://www.misstamchiak.com/wp-content/uploads/2018/03/38853624650_64b7bca360_h.jpg'
                  },
                  {name:"Sunday Folks",
                  date: '10.03.2021',
                  quantity: '2',
                  link: 'https://www.facebook.com/sundayfolks.singapore',
                  image:'https://media.timeout.com/images/101732859/1372/772/image.jpg'
                  },
                  {name:'Tombalek',
                  date: '01.04.2021',
                  quantity: '1',
                  link: 'https://tombalek.com/',
                  image:'https://zula.sg/wp-content/uploads/2020/10/xcraft-workshops-singapore-tombalek.jpg.pagespeed.ic.DBPg_Sbq6y.webp'
                  }]
      
    }
  },

  methods: {
    deleteRow: function(item) {
      this.itemsList.$remove(item);
    }
  }

}
</script>

<style>

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
    font-size: 25px;
    color: #403939;
  }
  hr {
    color: #403939;
    height: 1px;
  }
  img {
    width: 200px;
    height: 135px;
    horizontal-align: middle;
    margin: 20px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin-bottom: 25px;
  }
  #deleteBtn, #CheckOutBtn {
    background-color: #ED83A7;
    font-size: 20px;
    border-radius: 8px;
    padding: 7px 20px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #403939;
    border: none;
  }
  #CheckOutBtn {
    margin-bottom: 95px;
    margin-top: 50px;
  }

  CartHeader {
    width: 65px;
    height: 30px;
    border-radius: 10px;
    border-width: 1px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

</style>