<template>
  <div id="box">
    <div class="belowName">
        <h4>&#x263A; Instant Confirmation      </h4>
        <h4><img id="mapIcon" src="../../assets/map.png" />{{ address }}</h4>
    </div> 

    <div id="reservationNotice" v-show="displayResNotice">
      <p>
        We are currently not accepting any reservations. We apologise for the
        inconvenience caused.
      </p>
    </div>
    
    <div class="background">
      <section class="booking">
        <label for="start">Please select a booking date:</label>
        <input type="date" id="bookingDate" name="booking-date" />
      </section>

      <div id="timeDropdown">
        <p>Please select a booking time:</p>
        <v-select
          label="time"
          :options="dropdownOptions"
          :clearable="false"
          v-model="selected"
          id="drop"
        >
          <template slot="option" slot-scope="option" id="drop">
            {{ option.time }}
          </template>
        </v-select>
      </div>
      <br />

      <section class="pax">
        <label for="pax-count"> Number of Adults: </label>
        <button v-on:click="decrementAdults()" class="minus">-</button>
        {{ adultsCount }}
        <button v-on:click="incrementAdults()" class="plus">+</button>
      </section>

      <section class="pax">
        <label for="pax-count"> Number of Children: </label>
        <button v-on:click="decrementChild()" class="minus">-</button>
        {{ childrenCount }}
        <button v-on:click="incrementChild()" class="plus">+</button>
      </section>
      <br />
      <button id="bookNow" v-on:click="checkReservation()" v-show="acceptReservation">
        Book Now
      </button>
    </div>
  </div>
</template>

<script>
//import firebase from "firebase";
import database from "../../firebase";
export default {
  components: {},
  props: ["shop", "uid", "loggedIn"],
  data() {
    return {
      About: true,
      Review: false,
      Reservation: false,
      acceptReservation: true,
      displayResNotice: false,
      totalReservations: 0,
      address: "",
      dropdownOptions: [
        { code: "1", time: "11:30" },
        { code: "2", time: "12:30" },
        { code: "3", time: "13:30" },
        { code: "4", time: "14:30" },
        { code: "5", time: "15:30" },
        { code: "6", time: "16:30" },
        { code: "7", time: "17:30" },
        { code: "8", time: "18:30" },
        { code: "9", time: "19:30" },
        { code: "10", time: "20:30" },
      ],
      adultsCount: 0,
      childrenCount: 0,
      selected: "",
      customerId : "",
      customerName : "",
    };
  },
  methods: {
    toggleAbout: function () {
      this.About = true;
      this.Review = false;
      this.Reservation = false;
    },
    toggleReview: function () {
      this.About = false;
      this.Review = true;
      this.Reservation = false;
    },
    toggleReservation: function () {
      this.About = false;
      this.Review = false;
      this.Reservation = true;
    },
    incrementAdults: function () {
      //do not allow user to book more than 8 people
      if (this.adultsCount + this.childrenCount === 8) {
        alert(
          "In accordance to safe distancing measures, we are unable to accept bookings of more than 8 people."
        );
      } else {
        this.adultsCount++;
      }
    },
    decrementAdults: function () {
      //booking number cannot be negative value
      if (this.adultsCount !== 0) {
        this.adultsCount--;
      }
    },
    incrementChild: function () {
      //do not allow user to book more than 8 people
      if (this.adultsCount + this.childrenCount === 8) {
        alert(
          "In accordance to safe distancing measures, we are unable to accept bookings of more than 8 people."
        );
      } else {
        this.childrenCount++;
      }
    },
    decrementChild: function () {
      //booking number cannot be negative value
      if (this.childrenCount !== 0) {
        this.childrenCount--;
      }
    },
    checkTime: function () {
      //check if booking time is after current time
      //get local date and time
      this.canBook = true;
      var today = new Date();
      var currentDate = today.getDate();
      var currentMonth = today.getMonth() + 1; //January is 0
      var currentMinutes = today.getMinutes();
      var currentHour = today.getHours();
      if (currentHour === "0") {
        currentHour = 24;
      }
      //get input date and time
      var chosen = new Date(document.getElementById("bookingDate").value);
      var chosenDate = chosen.getDate();
      var chosenMonth = chosen.getMonth() + 1; //January is 0
      if (this.selected.time) {
        var selectedTime = this.selected.time.split(":");
        var selectedHour = selectedTime[0];
        var selectedMinutes = selectedTime[1];
        //not possible for user to book a reservation for an earlier timing today
        if (
          chosenDate === currentDate &&
          chosenMonth === currentMonth &&
          currentHour > selectedHour
        ) {
          this.canBook = false;
          alert(
            "Reservation is unavailable at this timing. Please try another timing."
          );
        } else if (
          chosenDate === currentDate &&
          chosenMonth === currentMonth &&
          currentHour === selectedHour &&
          currentMinutes > selectedMinutes
        ) {
          this.canBook = false;
          alert(
            "Reservation is unavailable at this timing. Please try another timing."
          );
        }
      }
    },
    //check if current user has already made a reservation
    checkReservation: function () {
      this.canBook=true;
       //if user is not logged in,
      //alert pop-up to remind user to log in before making a reservation
      if (this.loggedIn === false) {
        alert("Please log in to make a reservation!");
      } else {
        var reservationdate = document.getElementById("bookingDate").value;
        database
        .collection("reservation")
        .where("customer_id", "==", this.uid)
        .where("document_id", "==", this.shop.document_id)
        .where("booking_date", "==", reservationdate)
        .where("time", "==", this.selected.time) 
        .get()
        .then((snapshot) => {
          snapshot
          .docs
          .forEach(() => {
            this.canBook = false;
            alert("You have already made a reservation on this day!");                    
          });
        }).then(()=> {
          if(this.canBook) {
            this.book();
          }
        });
      }
    },
    increaseCounter: function () {
      var chosenDate = new Date(
        document.getElementById("bookingDate").value +
          "T" +
          this.selected.time +
          ":00"
      );
      var month = chosenDate.getMonth();
      var year = chosenDate.getFullYear();
      var yearlyReservations = [];
      database
        .collection("eat")
        .doc(this.shop.document_id)
        .get()
        .then((doc) => {
          var done = false;
          var currentArray = [];
          currentArray = doc.data().totalReservations[year];
          for (var i = 0; i < currentArray.length; i++) {
            yearlyReservations.push(currentArray[i]);
            if (i === month) {
              //clicks for that month is already added into the array
              yearlyReservations[i] += 1;
              done = true;
            }
          }
          if (!done) {
            //month clicks is not added yet -- start of the month
            yearlyReservations.push(1);
            done = true;
          }
          this.totalReservations = doc.data().totalReservations;
          this.totalReservations[year] = yearlyReservations;
        })
        .then(() => {
          database.collection("eat").doc(this.shop.document_id).update({
            totalReservations: this.totalReservations,
          });
        });
    },
    book: function () {
        this.checkTime();
        if (this.canBook) {
          //if the user didn't select a date or time or number of people
          //alert pop-up
          if (
            !document.getElementById("bookingDate").value ||
            this.selected === "" ||
            this.adultsCount + this.childrenCount === 0
          ) {
            alert("Your reservation is incomplete!");
          } else {
            //Buggy function
            this.increaseCounter();
            //converts javascript date object to timestamp object to be saved to database
            //alert pop-up to inform user of successful reservation
            var chosenDate = new Date(
              document.getElementById("bookingDate").value +
                "T" +
                this.selected.time +
                ":00"
            );
         
            let booking = new Object();
            booking["booking_date"] = document.getElementById("bookingDate").value;
            booking["date"] = chosenDate;
            booking["document_id"] = this.shop.document_id;
            booking["time"] = this.selected.time;
            booking["adults"] = this.adultsCount;
            booking["children"] = this.childrenCount;
            booking["customer_id"] = this.uid;
            booking["merchant_type"] = "eat";
            booking["merchant_name"] = this.shop.name;
            booking["imageURL"] = this.shop.imageURL;
            booking["showUp"] = false;
            var newRef = database.collection("reservation").doc();
            booking["booking_id"] = newRef.id;
            booking["user_id"] = this.shop.user_id;
            database
              .collection("users")
              .get()
              .then((snapshot) => {
                snapshot.docs.forEach((doc) =>{                  
                  if (doc.data().user_id === this.uid){
                    booking["customer_name"] = doc.data().name;
                    newRef.set(booking).then(() => location.reload());
                    alert("Your reservation is confirmed!");
                  }
                })
              });
          }
        }
     // }
    },
    setCalendarLimits: function () {
      //set minimum day of calendar to current date because user cannot choose a previous date
      //and maximum day of calendar to end of the year
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      today = yyyy + "-" + mm + "-" + dd;
      var lastDay = yyyy + "-" + 12 + "-" + 31;
      document.getElementById("bookingDate").setAttribute("min", today);
      document.getElementById("bookingDate").setAttribute("max", lastDay);
    },
    alterDisplay() {
      this.shop = this.$route.query;
      this.acceptReservation = JSON.parse(this.shop["acceptReservations"]);
      // this.shop["acceptReservations"] returns String
      if (this.acceptReservation === false) {
        this.displayResNotice = true;
      }
    },
  },
  created() {
    this.alterDisplay();
    this.address = this.shop["address"];
  },
  mounted() {
    this.setCalendarLimits();
  },
};
</script>

<style scoped>

.belowName {
  display: flex;
  text-align: left;
  clear:both;
  margin-bottom: 20px;
  margin-left: 20px;
}
#mapIcon {
  width: 15px;
  height: 15px;
  vertical-align: middle;
  margin-left: 20px;
}
[type="date"] {
  background: #fff
    url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/calendar_2.png)
    97% 50% no-repeat;
}
[type="date"]::-webkit-inner-spin-button {
  display: none;
}
[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0;
}
label {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
#book {
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  padding: 4px 5px;
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.1);
  width: 190px;
}
#bookingDate {
  border: 1px solid #ddd;
  padding: 4px 10px;
}
#drop {
  background-color: #fff;
}
#box {
  width: 100%;
  max-width: 100%;
  margin: 0;
  font-size: 16px;
}
.background {
  margin-left: 20px;
}
#reservationNotice {
  margin-left: 20px;
  font-size: 30px;
  text-align: center;
}
span {
  cursor: pointer;
}
.number {
  margin: 100px;
}
.minus,
.plus {
  width: 30px;
  height: 30px;
  background: #fdfdfd;
  border-radius: 5px;
  padding: 8px 5px 8px 5px;
  border: 1px solid #ddd;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
}
#pax-count {
  height: 34px;
  width: 100px;
  text-align: center;
  font-size: 26px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: inline-block;
  vertical-align: middle;
}
#bookNow {
  margin-top: 30px;
  margin-bottom: 20px;
  background-color: #dba514;
  border: none;
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  border-radius: 6px;
  font-size: 17px;
  padding-right: 10px;
  height: 40px;
  cursor: pointer;
}
#timeDropdown {
  width: 20%;
}
</style>