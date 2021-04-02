<template>
  <div id="box">
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
          :value="selectedTime"
          :clearable="false"
          v-model="selected"
        >
          <template slot="option" slot-scope="option">
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

      <button id="bookNow" v-on:click="book()">Book Now</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import database from '../../firebase';

export default {
  components: {},
  props: ['shop'],

  data() {
    return {
      About: true,
      Review: false,
      Reservation: false,
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
      selected: ""
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

    book: function () {
      //converts javascript date object to timestamp object to be saved to database 
      // alert pop-up to inform user of successful renovation 
      var chosenDate = new Date(document.getElementById("bookingDate").value);
      const created = firebase.firestore.Timestamp.fromDate(new Date(chosenDate)).toDate();
      let booking = new Object();
      booking["date"] = created;
      booking["document_id"] = this.shop.document_id;
      booking["time"] = this.selected;
      database.collection("reservation").add(booking).then(() => location.reload()); 
      alert("Your reservation is confirmed!");
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
  },
  mounted() {
    this.setCalendarLimits();
  },
};
</script>

<style scoped>
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
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  background-color: #fff;
  padding: 3px 5px;
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.1);
  width: 190px;
}

#box {
  background-color: #ffdde6;
  width: 100%;
  max-width: 100%;
  margin: 0;
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
  width: 15%;
}
</style>