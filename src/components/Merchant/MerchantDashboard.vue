<template>
  <div>
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
        <p>Choose</p>
        <v-select
          label="yearClicks"
          :options="sortByOptionsClicks"
          :value="selectedYearClicks"
          :clearable="false"
          :searchable="false"
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
        <p>Choose</p>
        <v-select
          label="yearReservations"
          :options="sortByOptionsReservations"
          :value="selectedYearReservations"
          :clearable="false"
          :searchable="false"
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
      sortByOptionsClicks: [
        { code: "2021", year: 2021 },
        { code: "2022", year: 2022 },
        { code: "2023", year: 2023 },
        { code: "2024", year: 2024 },
        { code: "2025", year: 2025 },
      ],
      selectedYearClicks: "",
      sortByOptionsReservations: [
        { code: "2021", year: 2021 },
        { code: "2022", year: 2022 },
        { code: "2023", year: 2023 },
        { code: "2024", year: 2024 },
        { code: "2025", year: 2025 },
      ],
      selectedYearReservations: "",
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
            console.log("hello" + this.reservationsData[0].y);
            this.generateMonthlyReservationsAxis(this.reservationsData[0].y);
            console.log("hello " + this.reservationsData[0].x);
          });
        });
    },
    getTotalClicks() {
      this.uid = firebase.auth().currentUser.uid;
      console.log(this.merchantType);
      database
        .collection(this.merchantType)
        .where("user_id", "==", this.uid)
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
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

    /*

    // Fetches reservation data from firestore
    fetchReservations() {
      console.log("fetchReservations() running");
      database
        .collection("reservation")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().user_id == this.uid) {
              console.log("inside fetchReservations if clause");
              var seconds = doc.data().date.seconds;
              var nanoseconds = doc.data().date.nanoseconds;
              var date = new Date(seconds * 1000 + nanoseconds / 1000000);
              this.reservations.push(doc.data());
              this.datesMonthYear.push([date.getMonth(), date.getFullYear()]);
              this.datesFormatted.push(date.toLocaleDateString());
            }
          });
          //this.generateAxes();
        });
    }, */

    // Fetches Authentication details and Business details
    fetchDetails() {
      //console.log(this.type)
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
          //this.fetchReservations();
          this.getTotalClicks();
        });
    },

    fetchClicksAndReviews() {
      console.log("fetching Clicks and Reservations");
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
    /*
    // Generates the arrays needed for plotting
    generateAxes() {
      console.log("generateAxes() running");
      //alert('generateAxes() is running and the length of datesMonth is: ' + this.datesMonth.length)
      let obj = {};
      for (let i = 0; i < this.datesFormatted.length; i++) {
        obj[this.datesFormatted[i][0]] =
          (obj[this.datesFormatted[i][0]] || 0) + 1;
      }
      this.data[0].y = Object.values(obj);

      var arr = Array.from(
        new Set(this.datesMonthYear.map(JSON.stringify)),
        JSON.parse
      ).sort();

      console.log(arr)
     // var months = [ "January", "February", "March", "April", "May", "June", 
       //    "July", "August", "September", "October", "November", "December" ];

      for (let i = 0; i < arr.length; i++) {
        this.data[0].x.push(
          "0" +
            (arr[i][0] + 1).toString() +
            "/" +
            arr[i][1].toString().slice(-2)
        );
      }
    },*/
    formatClicks(value) {
      return `${value.toFixed(0)}`;
    },
    formatRating(value) {
      return `${value.toFixed(1)}`;
    },
  },
  created() {
    this.fetchDetails();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat");
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
</style>