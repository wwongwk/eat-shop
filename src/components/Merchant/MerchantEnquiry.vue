<template>
  <div id="all">
    <ul>
      <li id="header"><p><span>ENQUIRIES</span></p></li>
      <li v-for="enquiry in allEnquiries" :key="enquiry.id">
        {{ enquiry.name }} &emsp;&emsp;&emsp;&emsp;
        <a :href="`mailto:${enquiry.email}`">{{enquiry.email}}</a>
        <br />
          {{ enquiry.message }}
        <button v-on:click="deleteEnquiry(enquiry)" id="deleteBtn">
          DELETE
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import database from "../../firebase.js";
import firebase from "firebase/app";

export default {
  data() {
    return {
      allEnquiries: [],
      uid: "",
      shopId: "",
      merchantType: "",
    };
  },
  methods: {
    // Fetches Merchant/Business information
    fetchMerchant() {
      this.uid = firebase.auth().currentUser.uid;
      var fetched = false;
      database
        .collection("eat")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().user_id == this.uid) {
              this.shopId = doc.data().document_id;
              this.merchantType = doc.data().type;
              fetched = true;
              this.fetchEnquiries();
            }
            localStorage.clear();
          });
        });
      if (!fetched) {
        database
          .collection("shop")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              if (doc.data().user_id == this.uid) {
                this.shopId = doc.data().document_id;
                this.merchantType = doc.data().type;
                this.fetchEnquiries();
              }
              localStorage.clear();
            });
          });
      }
    },

    fetchEnquiries: function () {
      this.uid = firebase.auth().currentUser.uid;
      database
        .collection(this.merchantType)
        .where("user_id", "==", this.uid)
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            this.allEnquiries = doc.data().enquiries;
          });
        });
    },

    //deletes enquiry
    deleteEnquiry: function (enquiry) {
      for (var i = 0; i < this.allEnquiries.length; i++) {
        var currentEnquiry = this.allEnquiries[i];
        if (currentEnquiry === enquiry) {
          this.allEnquiries.splice(i, 1);
          break;
        }
      }
      database
        .collection(this.merchantType)
        .doc(this.shopId)
        .update({
          enquiries: this.allEnquiries,
        })
        .then(() => {
          location.reload();
        });
    },
  },

  created() {
    this.fetchMerchant();
  },
};
</script>

<style scoped>
#all {
  margin-left: 50px;
  width: 92%;
  background-color: #f9d1b7;
  background-image: linear-gradient(315deg, #f9d1b7 0%, #f894a4 74%);
}

p {
  text-align: center;
  //padding-left: 20px;
  //color: #ed83a7;
  font-size: 30px;
  letter-spacing: 0.1em;
  overflow: hidden;
}
p > span{
    position: relative;
    display: inline-block;
}
p > span:before, p > span:after{
    content: '';
    position: absolute;
    top: 50%;
    border-bottom: 2px solid;
    width: 100vw;
    margin: 0 20px;
}
p > span:before{
    right: 100%;
}
p > span:after{
    left: 100%;
}
li {
  color: #403939;
  font-size: 18px;
  padding: 35px 20px;
  width: 100%;
  text-align: left;
  line-height: 2;
  margin:0;
}

ul {
  list-style-type: none;
  width: 1000px;
  margin-bottom: 100px;
  vertical-align: center;
  margin-left: 50px;
  //margin-top: 50px;
  //border-radius: 10px;
  //background-color: #FFF;
  align-self: center;
  vertical-align: center;
}
#header {
  text-align: center;
  line-height: 1;
}

button {
  float: right;
  margin-bottom: 50px;
  font-family: Futura;
  height: 40px;
  text-align: center;
  background: #ED83A7;
  cursor: pointer;
  font-size: 16px;
  border: 0;
  transition: all 0.5s;
  border-radius: 10px;
  width: auto;
  position: relative;
}
  button::after {
    font-family: "Font Awesome 5 Pro";
    font-weight: 400;
    position: absolute;
    left: 85%;
    top: 31%;
    right: 5%;
    bottom: 0;
    opacity: 0;
  }
  
  button:hover {
    background: #D25A7e;
    transition: all 0.5s;
    border-radius: 10px;
    box-shadow: 0px 6px 15px #ED83A7;
    padding-right: 10px;
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  button:hover::after {
    opacity: 1;
    transition: all 0.5s;
  }

</style>