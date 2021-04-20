<template>
  <div>
    <!-- INFO FORM FOR ALL BUSINESS -->

    <h2>{{ name }}</h2>
    <br />

    <div id="container">
      <div id="content" class="flexbox">
        <!-- TOGGLE RESERVATIONS FOR EAT BUSINESS -->
        <div v-show="eat">
          <h2>Reservation Status:</h2>
          <p v-show="acceptReservation == true">
            Currently Accepting Reservations
          </p>
          <p v-show="acceptReservation == false">
            Currently Not Accepting Reservations
          </p>

          <button id="resToggle" v-on:click="acceptRes()">
            Accept Reservations
          </button>
          <button id="resToggle" v-on:click="stopRes()">
            Do Not Accept Reservations
          </button>
        </div>

        <br />
        <h2>Business Information</h2>
        <form>
          <label for="name">NAME:</label><br />
          <input type="name" id="name" name="name" v-model="name" /><br /><br />
          <label for="email">EMAIL:</label><br />
          <input
            type="email"
            id="email"
            name="email"
            v-model="email"
          /><br /><br />
          <label for="mobile">CONTACT NUMBER:</label><br />
          <input
            type="text"
            id="mobile"
            name="mobile"
            v-model="mobile"
          /><br /><br />
          <label for="address">ADDRESS:</label><br />
          <textarea id="address" name="address" v-model="address" /><br /><br />
          <label for="openingHours">Opening Hours:</label><br />
          <input
            type="text"
            id="openingHours"
            name="openingHours"
            v-model="openingHours"
          /><br /><br />
          <label for="description">Description:</label><br />
          <textarea
            id="description"
            name="description"
            v-model="description"
          ></textarea>
          <br /><br />
          <input type="button" id="submit1" value="SAVE" @click="save" />
        </form>
        <br />
      </div>

      <!-- MENU PORTION FOR EAT BUSINESS -->
      <div id="menuInfo" class="flexbox" v-show="eat">
        <h2>Add Menu Item</h2>
        <br>
        <div id="addFood" name="addFood">
          <br />
          <form id="addForm">
            <label for="foodName">Name of food item:</label> &nbsp;
            <input
              id="addForm1"
              name="itemName"
              v-model="foodName"
              required
            /><br /><br />

            <label for="foodPrice">Price of food item:</label> &nbsp;
            <input
              id="addForm2"
              name="itemPrice"
              v-model="foodPrice"
              required
            /><br /><br />

            <label for="foodImage">Image URL of food item:</label> &nbsp;
            <input
              id="addForm3"
              name="itemImage"
              v-model="foodImage"
              required
            /><br /><br />

            <label for="foodDescription">Description of food item:</label>
            &nbsp;
            <textarea
              id="addForm4"
              name="itemDescription"
              v-model="foodDescription"
              required
            ></textarea
            ><br /><br />

            <input
              type="button"
              id="submit2"
              value="Add to menu"
              v-on:click="requiredFood()"
            />
          </form>
          <br />
        </div>
      </div>

      <!-- PRODUCTS PORTION FOR SHOP BUSINESS -->
      <div id="menuInfo" class="flexbox" v-show="shop">
        <h2>Add Shop Product</h2>
        <br>
        <div id="addProduct" name="addProduct">
          <br />
          <form id="addForm5">
            <label for="productName">Name of product:</label> &nbsp;
            <input
              id="addForm6"
              name="itemName"
              v-model="productName"
              required
            /><br /><br />

            <label for="productPrice">Price of product:</label> &nbsp;
            <input
              id="addForm7"
              name="itemPrice"
              v-model="productPrice"
              required
            /><br /><br />

            <label for="productImage">Image URL of product:</label> &nbsp;
            <input
              id="addForm8"
              name="itemImage"
              v-model="productImage"
              required
            /><br /><br />

            <label for="productDescription">Description of product:</label>
            &nbsp;
            <textarea
              id="addForm9"
              name="itemDescription"
              v-model="productDescription"
              required
            ></textarea
            ><br /><br />

            <input
              type="button"
              id="submit3"
              value="Add to product listing"
              v-on:click="requiredProduct()"
            />
          </form>
          <br />
        </div>
      </div>
    </div>

    <!-- Display list of food / product items for eat / shop respectively -->
    <ul id="displayFood">
      <li v-for="product in menu" :key="product.index">
        <div id="float-container">
          <div id="Image">
            <img
              :src="product['foodImage']"
              width="200"
              height="200"
              v-show="eat"
            />
            <img
              :src="product['productImage']"
              width="200"
              height="200"
              v-show="shop"
            />
          </div>
          <div id="Description">
            <h1>{{ product["foodName"] }}</h1>
            <h1>{{ product["productName"] }}</h1>

            <h2>{{ product["foodPrice"] }}</h2>
            <h2>{{ product["productPrice"] }}</h2>

            <p>{{ product["foodDescription"] }}</p>
            <p>{{ product["productDescription"] }}</p>

            <button id="menuBtn" v-on:click="deleteFood(product)" v-show="eat">
              Delete
            </button>
            &nbsp;
            <button
              id="menuBtn"
              v-on:click="deleteProduct(product)"
              v-show="shop"
            >
              Delete
            </button><br>
            &nbsp;
          </div>
        </div>
        <hr />
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
      uid: "",
      type: "",
      merchantDetails: [],
      documentId: "",
      merchantId: "",
      name: "",
      email: "",
      mobile: "",
      address: "",
      openingHours: "",
      description: "",
      acceptReservation: true,
      menu: {},
      information: true,
      dashboard: false,
      merchant: false,

      // check eat or shop to toggle merchant eat / shop information
      eat: false,
      shop: false,

      // inputs for eat merchant account
      foodName: "",
      foodPrice: "",
      foodDescription: "",
      foodImage: "",

      // inputs for shop merchant account
      productName: "",
      productPrice: "",
      productDescription: "",
      productImage: "",

      // for customer leaderboard for food only
      customers: [],
    };
  },
  methods: {
    // Fetches Merchant/Business information
    fetchMerchant() {
      this.uid = firebase.auth().currentUser.uid;
      database
        .collection("users")
        .doc(this.uid)
        .get()
        .then((doc) => {
          this.type=doc.data().business_type
          if (this.type=="eat") {
            database
            .collection("eat")
            .where("user_id","==", this.uid)
            .get()
            .then((snapshot) => {
              snapshot.docs.forEach((doc) => {
                  this.merchantDetails.push(doc.data());
                  this.mobile = doc.data().mobile;
                  this.name = doc.data().name;
                  this.address = doc.data().address;
                  this.openingHours = doc.data().openingHours;
                  this.description = doc.data().description;
                  this.type = doc.data().type;
                  this.documentId = doc.data().document_id;
                  this.menu = doc.data().menu;
                  this.eat = true;
                  this.acceptReservation = doc.data().acceptReservations;
              
                localStorage.clear();
              });
            });
          } else {

            database
            .collection("shop")
            .where("user_id","==", this.uid)
            .get()
            .then((snapshot) => {
              snapshot.docs.forEach((doc) => {
                  this.merchantDetails.push(doc.data());
                  this.mobile = doc.data().telephone;
                  this.name = doc.data().name;
                  this.address = doc.data().address;
                  this.openingHours = doc.data().openingHours;
                  this.description = doc.data().description;
                  this.type = doc.data().type;
                  this.documentId = doc.data().document_id;
                  this.menu = doc.data().menu;
                  this.shop = true;
            
                localStorage.clear();
              });
            });
          }
        });    
    },

    // Fetches current user's details
    fetchDetails() {
      this.uid = firebase.auth().currentUser.uid;
      this.email = firebase.auth().currentUser.email;
      this.phone = firebase.auth().currentUser.phoneNumber;
    },
    // Saves the user's contact information and updates Firestore
    save() {
      database
        .collection(this.type)
        .doc(this.documentId)
        .update({
          name: this.name,
          email: this.email,
          mobile: this.mobile,
          address: this.address,
          openingHours: this.openingHours,
          description: this.description,
        })
        .then(() => {
          location.reload();
        });
    },

    //Check all inputs for new food filled up
    requiredFood() {
      if (this.foodName === "") {
        alert("Please input a food name");
      } else if (this.foodPrice === "") {
        alert("Please input a food price");
      } else if (this.foodImage === "") {
        alert("Please input a food image URL");
      } else if (this.foodDescription === "") {
        alert("Please input a food description");
      } else {
        this.addFood();
      }
    },

    //Check all inputs for new product filled up
    requiredProduct() {
      if (this.productName === "") {
        alert("Please input a product name");
      } else if (this.productPrice === "") {
        alert("Please input a product price");
      } else if (this.productImage === "") {
        alert("Please input a product image URL");
      } else if (this.productDescription === "") {
        alert("Please input a product description");
      } else {
        this.addProduct();
      }
    },

    // add food to eat business menu
    addFood() {
      var newFood = {
        foodName: this.foodName,
        foodPrice: this.foodPrice,
        foodDescription: this.foodDescription,
        foodImage: this.foodImage,
      };

      this.menu[this.foodName] = newFood;
      database
        .collection("eat")
        .doc(this.documentId)
        .update({
          menu: this.menu,
        })
        .then(() => {
          location.reload();
        });
    },

    // add product to shop business menu
    addProduct() {
      var newProduct = {
        productName: this.productName,
        productPrice: this.productPrice,
        productDescription: this.productDescription,
        productImage: this.productImage,
      };

      this.menu[this.productName] = newProduct;

      database
        .collection("shop")
        .doc(this.documentId)
        .update({
          menu: this.menu,
        })
        .then(() => {
          location.reload();
        });
    },

    // delete food from eat business menu
    deleteFood(food) {
      for (var x in this.menu) {
        if (this.menu[x] == food) {
          delete this.menu[x];
          break;
        }
      }
      database
        .collection(this.type)
        .doc(this.documentId)
        .update({
          menu: this.menu,
        })
        .then(() => {
          location.reload();
        });
    },

    // delete product from shop business menu
    deleteProduct(product) {
      for (var x in this.menu) {
        if (this.menu[x] == product) {
          delete this.menu[x];
          break;
        }
      }
      database
        .collection("shop")
        .doc(this.documentId)
        .update({
          menu: this.menu,
        })
        .then(() => {
          location.reload();
        });
    },

    // accepting reservations
    acceptRes() {
      if (this.acceptReservation == true) {
        return;
      }
      this.acceptReservation = true;
      database
        .collection("eat")
        .doc(this.documentId)
        .update({
          acceptReservations: this.acceptReservation,
        })
        .then(() => {
          location.reload();
        });
    },

    // stop accepting reservations
    stopRes() {
      if (this.acceptReservation == false) {
        return;
      }
      this.acceptReservation = false;
      database
        .collection("eat")
        .doc(this.documentId)
        .update({
          acceptReservations: this.acceptReservation,
        })
        .then(() => {
          location.reload();
        });
    },
  },
  created() {
    this.fetchDetails();
    this.fetchMerchant();
  },
};
</script>

<style scoped>
h2 {
  margin: 50px;
}
#container {
  display: flex;
}

#content {
  align-items: center;
  width: 400px;
  padding: 30px;
  margin: 40px auto;
  background: #fff;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
  -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
  -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
}

#menuInfo {
  width: 650px;
  padding: 30px;
  margin: 40px auto;
  background: #fff;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
  -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
  -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
}

#addForm > textarea {
  height: 150px;
}
input {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
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
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
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
#address {
  height: 45px;
}
#submit1, #submit2, #submit3 {
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

#menuBtn {
  cursor: pointer;
  background-color: #ed83a7;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  padding: 7px;
}
#menuBtn:hover {
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
}

#addForm, #addform1, #addform2, #addform3, 
#addform4, #addform5, #addform6, #addform7, #addform8, #addform9, #addform10 {
  align-items: flex-start;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
#displayFood {
  width: 1200px;
  padding: 30px;
  margin: 40px auto;
  background: #fff;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
  -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
  -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
}
#float-container {
  border: 3px solid #fff;
  padding: 10px;
  height: 200px;
}

h1 {
  margin-top: 0;
  margin-bottom: 0px;
}

h2 {
  margin: 0;
}

#Image {
  float: left;
  padding-right: 10px;
}

#Description {
  margin-top: 0;
  /*padding: 10px;*/
  padding-top: 0;
  text-align: left;
}

#resToggle {
  cursor: pointer;
  background-color: #ed83a7;
  border: none;
  height: 30px;
  border-radius: 5px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.1);
  color: white;
}
</style>