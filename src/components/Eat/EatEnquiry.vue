git<template>
  <div class="submitEnquiry">
    <h4>Send Us A Message</h4>
    <form>
      <input
        type="name"
        id="name"
        name="name"
        v-model="name"
        placeholder="Your Name"/>
      <br /><br />
      <textarea
        id="description"
        name="description"
        v-model="description"
        placeholder="How can we help?">
      </textarea>
      <br /><br />
      <input type="button" id="submit" value="SUBMIT" @click="submitEnquiry" />
    </form>
  </div>
</template>

<script>
import database from "../../firebase.js";
import firebase from "firebase/app";

export default {
  props: ["shop"],
  data() {
    return {
      loggedIn: false,
      uid: "",
      name: "",
      custEmail: "",
      custPhone: "",
      shop_id: "",
      enquiries: [],
      description: "",
    };
  },

  methods: {
    //pushes enquiry to database under eat
    submitEnquiry: function () {
      if (this.loggedIn === false) {
        alert("Please log in to submit an enquiry!");
      } else if (this.name === "") {
        alert("Please type your name");
      } else if (this.description === "") {
        alert("Please enter your enquiry");
      } else {
        this.enquiries.push({
          name: this.name,
          email: this.custEmail,
          message: this.description,
        });
        
        alert("Enquiry submitted!");
        database
        .collection("eat")
        .doc(this.shop_id)
        .update({
          enquiries: this.enquiries,
        })
        .then(() => {
          //location.reload();
          this.get();
          this.fetchDetails();
          this.description = "";
          this.name = "";
        });
      }
    },

    //fetch user details from database
    fetchDetails() {
      try {
        this.uid = firebase.auth().currentUser.uid;
        this.custEmail = firebase.auth().currentUser.email;
        this.custPhone = firebase.auth().currentUser.phoneNumber;
        database
        .collection("users")
        .doc(this.uid)
        .get()
        .then(() => {
          this.loggedIn = true;
        });
      } catch (err) {
        this.loggedIn = false;
      }
    },

    //fetch shop data from database
    get() {
      this.shop_id = this.shop["document_id"];
    },
  },
  created() {
    this.get();
    this.fetchDetails();
  }
}
</script>

<style scoped>

h2 {
  margin: 50px;
}
.submitEnquiry {
  margin-left: 370px;
  padding:30px;
	background: #FFF;
	border-radius: 10px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
  width: 400px;
  text-align: center;
  vertical-align: center;
  margin-bottom: 100px;
}

input {
  box-sizing: border-box;
  outline: none;
  display: block;
  width: 100%;
  padding: 7px;
  font: 16px Arial, Helvetica, sans-serif;
  height: 45px;
  border-radius: 15px;
  border: 0;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  resize: none;
}
textarea {
  box-sizing: border-box;
  outline: none;
  display: block;
  width: 100%;
  padding: 7px;
  font: 16px Arial, Helvetica, sans-serif;
  height: 100px;
  border-radius: 15px;
  border: 0;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  resize: none;
}

#submit {
  cursor: pointer;
  background-color: #ed83a7;
  border: none;
  border-radius: 5px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.1);
  color: white;
}

#submit:hover {
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
}
</style>