<template>
  <div>
    user: {{ uid }}
    <br />
  
    <br />
    merchant : {{ merchantDetails }}

    <br />
    mobile : {{ mobile }}

    document_id: {{ documentId }}

    dashboard: {{ dashboard }}

    <!-- INFO FORM FOR BUSINESS -->
    <h2>{{name}}</h2>
    <div id="content" class="flexbox">
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
        <input type="button" id="submit" value="SAVE" @click="save" />
      </form>
      <br />
    </div>
    <hr>
    <!-- MENU PORTION FOR BUSINESS -->
    <div id="menuInfo" class="flexbox">
      <h2> Menu Items </h2>
      <button id="menuBtn" v-on:click="toogleAddItem()">Add Item</button>
      <div id="addFood" name="addFood" v-show="add">
        <br>
        <form id="addForm">
          
            <label for="foodName">Name of food item:</label> &nbsp;
              <input
                id="addForm"
                name="foodName"
                v-model="foodName"
                required
              ><br><br>
          
            <label for="foodPrice">Price of food item:</label> &nbsp;
              <input
                id="addForm"
                name="foodPrice"
                v-model="foodPrice"
                required
              ><br><br>
         
          <label for="foodImage">Image URL of food item:</label> &nbsp;
            <input
              id="addForm"
              name="foodImage"
              v-model="foodImage"
              required
            ><br><br>

          <label for="foodDescription">Description of food item:</label> &nbsp;
            <textarea
              id="addForm"
              name="foodDescription"
              v-model="foodDescription"
              required
            ></textarea><br><br>

          <input type="button" id="submit" value="Add to menu" v-on:click="required()"/>
        </form>
        <br>
      </div>
      <ul>
          <li v-for="food in menu" :key="food.index">
              <div id="float-container">
                  <div id="foodImage">
                      <img :src='food["foodImage"]'
                      width="200" height="200">
                  </div>
                  <div id="foodDescription">
                      <h1>{{ food["foodName"] }}</h1> 
                      <h2>{{ food["foodPrice"] }}</h2>
                      <p>{{ food["foodDescription"] }}</p>
                      
                      <button id="menuBtn" v-on:click="deleteFood(food)">Delete</button> &nbsp;
                      
                  </div>    
              </div>
              <hr>
          </li>
      </ul>  
      

    </div>
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
      documentId:"",
      merchantId: "",
      name: "",
      email: "",
      mobile: "",
      address: "",
      openingHours: "",
      description: "",
      menu: {},
      information: true,
      dashboard: false,
      merchant: false,
      
      // Attributes for Add functionality
      add:true, // change back to false
      foodName: "",
      foodPrice: "",
      foodDescription: "",
      foodImage: "",

    };
  },
  methods: {
    fetchMerchant() {
      database
        .collection("eat")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().user_id == this.uid) {
              this.merchantDetails.push(doc.data());
              this.mobile = doc.data().telephone;
              this.name = doc.data().name;
              this.address = doc.data().address;
              this.openingHours = doc.data().openingHours;
              this.description = doc.data().description;
              this.type = doc.data().type;
              this.documentId = doc.data().document_id;
              this.menu = doc.data().menu;         
              //console.log(typeof this.menu)             
            }
            localStorage.clear();
          });
        });
    },
    fetchDetails() {
      this.uid = firebase.auth().currentUser.uid;
      this.email = firebase.auth().currentUser.email;
      this.phone = firebase.auth().currentUser.phoneNumber;
    },
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
    required() {
      if (this.foodName === ""){
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
    addFood() {
      console.log(this.menu)
      var newFood = {foodName: this.foodName,
                     foodPrice: this.foodPrice,
                     foodDescription: this.foodDescription,
                     foodImage: this.foodImage}
                    
      this.menu[this.foodName] = newFood;
                    
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
    deleteFood(food) {
      
      for (var x in this.menu) {
        if (this.menu[x] == food){
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
    toogleAddItem() {
      this.add = !this.add;
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
#content {
  align-items: center;
  width:450px;
	padding:30px;
	margin:40px auto;
	background: #FFF;
	border-radius: 10px;
	-webkit-border-radius:10px;
	-moz-border-radius: 10px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
	-moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
	-webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
}

#menuInfo {
  width:1000px;
	padding:30px;
	margin:40px auto;
	background: #FFF;
	border-radius: 10px;
	-webkit-border-radius:10px;
	-moz-border-radius: 10px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
	-moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
	-webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
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
  border-radius:15px;
  border:0;
  box-shadow:4px 4px 10px rgba(0,0,0,0.06);
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
	height: 45px;
  border-radius:15px;
  border:0;
  box-shadow:4px 4px 10px rgba(0,0,0,0.06);
}

#submit {
  cursor: pointer;
  background-color:#ED83A7;
  border: none;
  border-radius: 5px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
}

#submit:hover {
  box-shadow:0 0 4px rgba(0,0,0,0.5);
}

#menuBtn {
  cursor: pointer;
  background-color:#D25A7e;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
  padding: 12px 7px;
  margin-top: 5px;
}
#menuBtn:hover {
  box-shadow:0 0 4px rgba(0,0,0,0.5);
}

#addForm {
  align-items: flex-start;
}

ul{
  list-style-type: none;
  padding: 0;
  margin: 0;
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

#foodImage {
    float: left;
    padding-right: 10px;
}

#foodDescription {
    margin-top: 0;
    //padding: 10px;
    padding-top: 0;
    text-align: left;
}

</style>