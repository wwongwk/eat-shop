<template>
  <div>
    <div class="background">
      <section class="booking">
        <label for="start">Please select a booking date:</label>
        <input type="date" id="book" name="booking-date" />
      </section>

      <div id="timeDropdown">
        <p>Please select a booking time:</p>
        <v-select
          label="time"
          :options="dropdownOptions"
          :value="selectedTime"
          :clearable="false"
          v-model="selected"
          @input="filterFood"
        >
          <template slot="option" slot-scope="option">
            {{ option.time }}
          </template>
        </v-select>
      </div>

      <section class="pax">
        <label for="pax-count"> Number of People: </label>
        <button v-on:click = "decrement" class="minus">-</button>
        {{adultsCount}}
        <button v-on:click = "increment" class="plus">+</button>
      </section>

      <button>Book Now</button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      About: true,
      Review: false,
      Reservation: false,
      dropdownOptions: [
        { code: "1", time: "11:30 am" },
        { code: "2", time: "12:30 pm" },
        { code: "3", time: "1:30 pm" },
        { code: "4", time: "2:30 pm" },
        { code: "5", time: "3:30 pm" },
        { code: "6", time: "4:30 pm" },
        { code: "7", time: "5:30 pm" },
        { code: "8", time: "6:30 pm" },
        { code: "9", time: "7:30 pm" },
        { code: "10", time: "8:30 pm" },
      ],
      adultsCount: 0,
    };
  },
  methods: {
    toggleAbout: function () {
      //window.history.scrollRestoration = "manual"
      this.About = true;
      this.Review = false;
      this.Reservation = false;
    },
    toggleReview: function () {
      //window.history.scrollRestoration = "manual"
      this.About = false;
      this.Review = true;
      this.Reservation = false;
    },
    toggleReservation: function () {
      //window.history.scrollRestoration = "manual"
      this.About = false;
      this.Review = false;
      this.Reservation = true;
    },
    increment: function () {
      if (this.adultsCount === 8) {
        alert("In accordance to safe distancing measures, we are unable to accept bookings of more than 8 people.");
      } else {
        this.adultsCount++;
      }
      //this.$emit('counter', this.item, this.counter)
    },
    decrement: function () {
      if (this.adultsCount !== 0) {
        this.adultsCount--;
      }
      //this.$emit('counter', this.item, this.counter)
    },
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
  background: #f2f2f2;
  border-radius: 5px;
  padding: 8px 5px 8px 5px;
  border: 1px solid #ddd;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
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
button {
  margin-top: 10px;
  margin-bottom: 20px;
  size: 40px;
}

#timeDropdown {
  width: 15%;
}
</style>