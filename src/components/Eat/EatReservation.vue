<template>
  <div>
    <div class="background">
      <section class="booking">
        <label for="start">Please select a booking date:</label>
        <input type="date" id="book" name="booking-date" />
      </section>

      <section class="pax">
        <label for ="pax-count" > Number of People: </label>
        <span class="minus">-</span>
        <input type="text" id="pax-count" value="1"/>
        <span class="plus">+</span>
      </section>

      <button> Book Now</button>

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
      shopName: "Sum Dim Sum",
      description:
        "Housed below a timeless shophouse, the restaurant’s Tiffany blue colour was striking," +
        "and customers can easily spot its storefront from afar. Sum Dim Sum serves up delicious dim sum " +
        "in a beautiful atmosphere. Its menu is extensive with steamed, pan-fried, deep-fried, baked items," +
        "noodles, porridge, rice and desserts.",
      telephone: "9005 9381",
      openHours: "11.30am - 12am (Mon - Sun)",
      address: "161 Jalan Besar Singapore 208876",
    };
  },
  methods: {
    
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

span {cursor:pointer; }
    .number{
        margin:100px;
    }
    .minus, .plus{
        width:20px;
        height:20px;
        background:#f2f2f2;
        border-radius:4px;
        padding:8px 5px 8px 5px;
        border:1px solid #ddd;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    }
    #pax-count{
        height:34px;
    width: 100px;
    text-align: center;
    font-size: 26px;
        border:1px solid #ddd;
        border-radius:4px;
    display: inline-block;
    vertical-align: middle;
    }
  button {
    margin-top: 10px;
    margin-bottom: 20px;
  }

</style>