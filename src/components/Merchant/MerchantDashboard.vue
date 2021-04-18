<template>
  <div>
     <div id="table">
     <h2>TOP CUSTOMERS</h2>
      <table class="table">
      <tr id="tablehead">
        <th>Rank</th>
        <th>Customer Username</th>
        <th>No. Of Reservations Made</th>
      </tr>
      <tr v-for="customer in customers.slice(0,1)" :key="customer.id">
        <td>
          <img id="trophyImg" :src="require(`@/assets/trophy.png`)" />
        </td>
        <td>
          {{ customer[0] }}
        </td>
        <td>
          {{ customer[1] }}
        </td>
      </tr>
      <tr v-for="customer in customers.slice(1,10)" :key="customer.id">
        <td>
        {{customers.indexOf(customer)}}
        </td>
        <td>
          {{ customer[0] }}
        </td>
        <td>
          {{ customer[1] }}
        </td>
      </tr>
    </table>
    </div>

    <div class="container">


      <div class="clicks">
        TOTAL VISITORS:
        <animated-number
          :value="totalClicks"
          :formatValue="formatClicks"
          :duration="1500"
        />
      </div>
      <div class="rating">
        RATING:
        <animated-number
          :value="rating"
          :formatValue="formatRating"
          :duration="1500"
        />

        <star-rating
          :rating="rating"
          :increment="0.01"
          :fixed-points="2"
          :show-rating="false"
          :read-only="true"
        ></star-rating>
      </div>

      <div id="yearDropdownClicks">
        <p>Year</p>
        <v-select
          label="yearClicks"
          :options="sortByOptions"
          :value="selectedYearClicks"
          :clearable="false"
          :searchable="false"
          v-model="yearSelected"
          @input="sortClicks"
          id="dropClicks"
        >
          <template slot="option" slot-scope="option">
            {{ option.year }}
          </template>
        </v-select>
      </div>
    </div>

    <div id="clicksChart" class="chart">
      <Plotly
        :data="clicksData"
        :layout="barLayout"
        :display-mode-bar="false"
      ></Plotly>
    </div>

    <div v-show = "merchantType != 'shop'">
      <div id="yearDropdownReservations">
        <p>Year</p>
        <v-select
          label="yearReservations"
          :options="sortByOptions"
          :value="selectedYearReservations"
          :clearable="false"
          :searchable="false"
          v-model="yearChosen"
          @input="sortReservations"
          id="dropReservations"
        >
          <template slot="option" slot-scope="option">
            {{ option.year }}
          </template>
        </v-select>
      </div>

      <div id="reservationsChart" class="chart">
        <Plotly
          :data="reservationsData"
          :layout="layout"
          :display-mode-bar="false"
        ></Plotly>
      </div>
    </div>
  </div>
</template>

<script>
import database from "../../firebase.js";
import firebase from "firebase/app";
import { Plotly } from "vue-plotly";
import AnimatedNumber from "animated-number-vue";
import StarRating from "vue-star-rating";

export default {
  components: { Plotly, AnimatedNumber, StarRating },
  data() {
    return {
      reservationsData: [
        {
          x: [],
          y: [],
          type: "scatter",
          marker: {
            color: "#f9d1b7",
          },
        },
      ],
      clicksData: [
        {
          x: [],
          y: [],
          type: "bar",
          width: 0.5,
          marker: {
            color: "#f9d1b7",
          },
        },
      ],
      layout: {
        title: {
          text: "MONTHLY RESERVATIONS",
          font: {
            size: 20,
          },
        },
        xaxis: {
          title: "Month",
        },
        yaxis: {
          title: "Number of reservations",
        },
      },
      barLayout: {
        title: {
          text: "MONTHLY VISITORS",
          font: {
            size: 20,
          },
        },
        xaxis: {
          title: "Month",
        },
        yaxis: {
          title: "Number of visitors",
        },
      },
      sortByOptions: [
        { code: "2021", year: 2021 },
        { code: "2022", year: 2022 },
        { code: "2023", year: 2023 },
        { code: "2024", year: 2024 },
        { code: "2025", year: 2025 },
      ],
      rank:"",
      selectedYearClicks: "",
      selectedYearReservations: "",
      yearChosen:"",
      yearSelected:"",
      name: "",
      email: "",
      mobile: "",
      reservations: [],
      uid: "",
      phone: "",
      clicks: "",
      totalClicks: 0,
      rating: 0,
      merchantType: "",
      numAdult: [],
      customers:[],
      documentId:"",
      reviews: [],
      datesMonthYear: [],
      datesFormatted: [],
      reservationAxis: [],
      datesAxis: [],
      monthsAxis: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      duration: 1000,
    };
  },
  methods: {
    
    //fetch monthly clicks data for a particular year chosen by user
    sortClicks: function (value) {
      this.uid = firebase.auth().currentUser.uid;
      database
        .collection(this.merchantType)
        .where("user_id", "==", this.uid)
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            var yearArrayClicks = doc.data().totalClicks[value.year];
            this.clicksData[0].y = yearArrayClicks;
            this.generateMonthlyClicksAxis(this.clicksData[0].y);
          });
        });
    }, //fetch monthly clicks data for a particular year chosen by user
    sortReservations: function (value) {
      this.uid = firebase.auth().currentUser.uid;
      database
        .collection(this.merchantType)
        .where("user_id", "==", this.uid)
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            var yearArray = doc.data().totalReservations[value.year];
            this.reservationsData[0].y = yearArray;
            this.generateMonthlyReservationsAxis(this.reservationsData[0].y);
          });
        });
    },

    //fetch merchant id from db 
    getMerchantId() {
      this.uid = firebase.auth().currentUser.uid;
      database
        .collection("eat")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().user_id == this.uid) {
              this.documentId = doc.data().document_id;
            }
          }
          )
        });
    },

    getTotalClicks() {
      this.uid = firebase.auth().currentUser.uid;
      database
        .collection(this.merchantType)
        .where("user_id", "==", this.uid)
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            this.documentId = doc.data().document_id;
            let totalClicks = 0;
            for (let key in doc.data().totalClicks) {
              totalClicks += doc
                .data()
                .totalClicks[key].reduce((a, b) => a + b, 0);
            }
            this.totalClicks = totalClicks;
          });
        });
    },

    //updates x axis to be past and current months only
    generateMonthlyClicksAxis: function (array) {
      for (var i = 0; i < array.length; i++) {
        this.clicksData[0].x.push(this.monthsAxis[i]);
      }
    },
    generateMonthlyReservationsAxis: function (array) {
      for (var i = 0; i < array.length; i++) {
        this.reservationsData[0].x.push(this.monthsAxis[i]);
      }
    },
    // Fetches Authentication details and Business details
    fetchDetails() {
      this.uid = firebase.auth().currentUser.uid;
      this.email = firebase.auth().currentUser.email;
      this.phone = firebase.auth().currentUser.phoneNumber;
      database
        .collection("users")
        .doc(this.uid)
        .get()
        .then((doc) => {
          this.merchantType = doc.data().business_type;
          this.reviews = doc.data().reviews;
        })
        .then(() => {
          this.fetchClicksAndReviews();
          this.getTotalClicks();
        });
    },

    fetchClicksAndReviews() {
      database
        .collection(this.merchantType)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().user_id == this.uid) {
              this.clicks = doc.data().clicks;
              this.rating = doc.data().overallRating;
            }
          });
        });
    },

    getTopCustomers() {
      var customerLeaderboard = [];
      database
        .collection("reservation")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().document_id === this.documentId) {
              if (customerLeaderboard.length === 0) {
                //array currently empty
                var currentCust = [doc.data().customer_name, 1];
                customerLeaderboard.push(currentCust);
              } else {
                var checked = false;
                //loop through the entire array to check if customer made a reservation before
                for (var i = 0; i < customerLeaderboard.length; i++) {
                  var customer = customerLeaderboard[i];
                  if (doc.data().customer_name === customer[0]) {
                    //update number of reservations
                    customer[1] += 1;
                    checked = true;
                    break;
                  }
                }
                //if the customer is a new customer, push to array
                if (!checked) {
                  var newCust = [doc.data().customer_name, 1];
                  customerLeaderboard.push(newCust);
                }
              }
              this.customers = customerLeaderboard;
            }
          });
        });
      this.sortCustomers();    
    },
    sortCustomers() {
      console.log("sort customer code running")
      this.customers.sort(function (customer1, customer2) {
        return parseFloat(customer1[1]) - parseFloat(customer2[1]);
      });
    },
    formatClicks(value) {
      return `${value.toFixed(0)}`;
    },
    formatRating(value) {
      return `${value.toFixed(1)}`;
    },
  },
  created() {
    this.fetchDetails();
    this.getMerchantId();
    this.getTopCustomers();
    //this.sortCustomers();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat");
h2 {
  text-align: center;
  margin-left: 400px;
}
#trophyImg {
  height: 50px;
  width: 50px;
  margin: 20px;
}
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
  //box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
  border-radius: 10px;
  background: #fff;
  text-align: center;
  height: 100px;
  background: rgba(255,192,203,0.5);
}
table {
  width: 850px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 18px;
  color: #403939;
  padding-left: 0px;
  margin-bottom: 80px;
  margin-left: 250px;
}
#tablehead {
  background: rgba(255,192,203, 1);
}
.container {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-left: 70px;
}
.clicks {
  float: left;
  width: 50%;
  box-sizing: border-box;
  width: 300px;
  height: 150px;
  padding: 30px;
  box-shadow: 4px 4px 10px rgba(0.1, 0.1, 0.1, 0.1);
  border-radius: 15px;
}
.rating {
  float: right;
  width: 50%;
  box-sizing: border-box;
  width: 300px;
  height: 150px;
  padding: 30px;
  box-shadow: 4px 4px 4px rgba(0.1, 0.1, 0.1, 0.1);
  border-radius: 15px;
}
.chart {
  margin-top: 100px;
  color: #ed83a7;
  font-size: 18px;
  width: 90%;
  margin-left: 50px;
  clear: both;
}
#clicksChart {
  color: #ed83a7;
  font-size: 18px;
}
#reservationsChart {
  margin-top: 150px;
}

#yearDropdownClicks {
  width: 400px;
}
#yearDropdownClicks p {
  font-size: 20px;
  color: #ed83a7;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#yearDropdownReservations {
  width: 400px;
  float: right;
  margin-right: 60px;
  margin-bottom: 50px;
}
#yearDropdownReservations p {
  font-size: 20px;
  color: #ed83a7;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#dropClicks, #dropReservations {
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  border: none;
  outline: none;
}

#table {
  width: 70%;
}
ul {
  list-style-type: none;
  margin-bottom: 100px;
  margin-left: 50px;
  align-self: center;
  vertical-align: center;
}
li {
  font-size: 18px;
  padding: 35px 20px;
  width: 100%;
  text-align: left;
  line-height: 1;
  margin:0;
}
#numOfReservations {
  float: right;
}
</style>