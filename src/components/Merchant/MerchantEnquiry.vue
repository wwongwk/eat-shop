<template>
  <div id="all">
  
    <div id="header">
    <p>
      <img id="enquiryImg" :src="require(`@/assets/enquiry.png`)" />
      <span>ENQUIRIES</span>
    </p>
    </div>
  
    <ul>

      <li v-for="enquiry in pageOfItems" :key="enquiry.id">
        <p id="name">{{ enquiry.name }}</p>
        <br>
        <a :href="`mailto:${enquiry.email}`">{{ enquiry.email }}</a>
        <br />
        {{ enquiry.message }}
        <br>
        <button v-on:click="deleteEnquiry(enquiry)" id="deleteBtn">
          DELETE
        </button>
      </li>
      <jw-pagination
        :items="allEnquiries"
        :pageSize="5"
        @changePage="onChangePage"
        id="page"
      ></jw-pagination>
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
      pageOfItems: [],
      uid: "",
      shopId: "",
      merchantType: "",
    };
  },
  methods: {
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
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
}
#name {
  font-size: 25px;
}
#enquiryImg {
  height: 50px;
  width: 50px;
  margin-right: 20px;
}
p {
  text-align: center;
  font-size: 30px;
  letter-spacing: 0.1em;
  overflow: hidden;
}
li {
  flex-grow: 1;
  flex-basis: 200px;
  color: #403939;
  font-size: 18px;
  padding: 10px;
  width: 200px;
  line-height: 2;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
  margin: 20px;
  margin-bottom: 40px;
}

ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  width: 1000px;
  margin-bottom: 100px;
  margin-left: 50px;
  align-self: center;
  vertical-align: center;
}
#header {
  text-align: center;
  line-height: 1;
}

button {
  margin-bottom: 50px;
  font-family: Futura;
  height: 40px;
  text-align: center;
  background: #ed83a7;
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
  background: #d25a7e;
  transition: all 0.5s;
  border-radius: 10px;
  box-shadow: 0px 6px 15px #ed83a7;
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