<template>
  <div>
    <app-header></app-header>
    <img src="../assets/TopPic.png" />
    <div class="signup">
      <img id="logo" src="../assets/logo.png" />
      <h1>LET'S COLLAB!!</h1>

      <form>
        <input
          type="name"
          id="name"
          name="name"
          placeholder="NAME"
          v-model="form.name"
          v-on:keyup.enter="register"
        /><br /><br />
        <input
          type="email"
          id="email1"
          name="email"
          placeholder="BIZ EMAIL"
          v-model="form.email"
          v-on:keyup.enter="register"
        /><br /><br />
        <input
          type="number"
          id="mobile"
          name="mobile"
          placeholder="CONTACT NUMBER"
          v-model="form.mobile"
          v-on:keyup.enter="register"
        /><br />

        <label for="eat">EAT</label>
        <input
          type="radio"
          name="radioBtn"
          id="eat"
          value="eat"
          v-model="form.type"
        />

        <label for="shop">SHOP</label>
        <input
          type="radio"
          name="radioBtn"
          id="shop"
          value="shop"
          v-model="form.type"
        />

        <br />
        <input
          type="button"
          id="submit"
          value="SIGN UP"
          v-on:click="register"
        />
      </form>
      <router-link to="/" id="no" exact> NO, THANK YOU</router-link>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import db from "../firebase.js";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        mobile: "",
        type: "",
      },
    };
  },

  components: {
    AppHeader: Header,
  },

  methods: {
    register: function () {
      if (
        this.form.name == "" ||
        this.form.email == "" ||
        this.form.mobile == "" ||
        this.form.type == ""
      ) {
        alert("Incomplete submission!");
      } else {
        db.collection("pendingShops").add(this.form);
        alert(
          "Your submission has been recorded! Kindly give us 3 working days to confirm your details! Have a nice day! :)"
        );
        this.$router.replace({ path: "/" });
      }
    },
  },
};
</script>

<style scoped>
img {
  width: 80%;
  height: auto;
}

input {
  width: 200px;
  height: 25px;
}

#submit {
  background-color: #d25a7e;
  width: auto;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
  height: auto;
  margin: 0px;
  border-style: none;
  margin-bottom: 0px;
}

h1 {
  margin: 0pc;
  margin-bottom: 20px;
  color: #d25a7e;
}
::placeholder {
  color: #b86a9960;
  font-size: 10px;
  padding: 5px;
}
.signup {
  border: 1px solid rgb(95, 0, 32);
  border-radius: 10px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  margin-top: 70px;
  margin-bottom: 70px;
}
form {
  padding-left: 50px;
  padding-right: 50px;
}

label {
  color: #d25a7e;
}
#eat,
#shop {
  width: 20px;
  height: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 5px;
}

#logo {
  width: 150px;
}

#no {
  text-decoration-line: underline;
  font-size: 10px;
  color: #a90065;
  margin: 50px;
  padding: 0px;
}
</style>