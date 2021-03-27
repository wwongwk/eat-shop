<template>
  <div>
    <app-header> </app-header>

    <div class="btn-group">
      <button @click="toggleInformation">Information</button>
      <button @click="toggleDashboard">Dashboard</button>
    </div>

    <div id="body" v-show="information">
      <merchant-information> </merchant-information>
    </div>

    <div id="body" v-show="dashboard">
      <merchant-dashboard> </merchant-dashboard>
    </div>
  </div>
</template>

<script>
import Header from "../Header.vue";
import MerchantInformation from "./MerchantInformation.vue";
import MerchantDashboard from "./MerchantDashboard.vue";

export default {
  components: {
    AppHeader: Header,
    MerchantInformation: MerchantInformation,
    MerchantDashboard: MerchantDashboard,
  },
  data() {
    return {
      information: true,
      dashboard: false,
    };
  },
  methods: {
    toggleInformation() {
      this.information = true;
      this.dashboard = false;
    },
    toggleDashboard() {
      this.information = false;
      this.dashboard = true;
    },
  },
};
</script>

<style scoped>
.btn-group {
  margin-left: 15px;
}

.btn-group button {
  background-color: transparent;
  border: 1px solid rgb(0, 0, 0); /* Green border */
  color: rgb(0, 0, 0); /* White text */
  padding: 10px 24px; /* Some padding */
  cursor: pointer; /* Pointer/hand icon */
  float: left; /* Float the buttons side by side */
  border-top: none;
}

.btn-group button:not(:last-child) {
  border-right: none; /* Prevent double borders */
}
.btn-group button:is(:first-child) {
  border-left: none; /* Prevent double borders */
}
.btn-group button:is(:last-child) {
  border-right: none; /* Prevent double borders */
}

/* Clear floats (clearfix hack) */
.btn-group:after {
  content: "";
  clear: both;
  display: table;
}

/* Add a background color on hover */
.btn-group button:hover {
  background-color: #d163b9;
  color: rgb(255, 255, 255);
}
</style>