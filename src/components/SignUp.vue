<template>
  <div>
    <app-header></app-header>
    <img src="../assets/TopPic.png"/>
    <div class='signup'>
      <img id='logo' src="../assets/logo.png"/>
      <h1>JOIN US</h1>
      <form>
        <input type="name" id="name" name="name" placeholder="USERNAME" v-model="form.name" v-on:keyup.enter="register"><br><br>
        <input type="email" id="email1" name="email" placeholder="YOUR EMAIL" v-model="form.email" v-on:keyup.enter="register"><br><br>
        <input type="password" id="password" name="password" placeholder= "PASSWORD" v-model="form.password" v-on:keyup.enter="register"><br><br>
        <input type="number" id="mobile" name="mobile" placeholder= "MOBILE" v-model="form.mobile" v-on:keyup.enter="register"><br><br>
        <input type="button" id='submit' value="SIGN UP" v-on:click="register">
      </form>      
      <router-link to="/" id='no' exact> NO, THANK YOU</router-link><br>
      <router-link to="/bizsignup" id='biz' exact>FOR BUSINESS</router-link>
   
    </div>   
  </div>

</template>

<script>
  import Header from './Header.vue';
  import database from '../firebase.js'
  import firebase from "firebase/app"
  import 'firebase/auth'
  

  export default {
    data() {
      return {
        form: {
          name: "",
          email: "",
          password: "",
          mobile:""
        },
      };
    },

    components: {
      AppHeader:Header
    },
   
    methods: {

      // user sign up with email and password,
      //Ensure that form is filled, else there will be an alert
       register: function() {
         if (this.form.name=="" || this.form.email=="" || this.form.password=="" || this.form.mobile=="") {
          alert("Incomplete submission!");
        } else {    
          firebase
          .auth()
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then((data) => {
            database
            .collection("users")
            .doc(data.user.uid)
            .set({
              user_id: data.user.uid,
              name: this.form.name,
              mobile:this.form.mobile,
              business:false,
              favorites:{}
              })
              .then(() => {
                alert('Successfully signed up'); 
                this.$router.replace({ path: "/" });
              });
            }).catch((error) => {
            console.log(error.message);
          });
        }
      },
    },
  }
</script>

<style scoped>
img {
  width: 80%;
  height: auto;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input {
  width: 200px;
  height: 25px;
}

#submit {
  background-color: #D25A7E;
  width: auto;
  color:white;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 13px;
  padding-bottom: 13px;
  height: auto;
  margin: 0px;
  border-style: none;
  margin-bottom: 3px;
  cursor: pointer;
}

h1 {
  margin: 0pc;
  margin-bottom: 20px;
  color:#D25A7E;
}
::placeholder {
  color: #b86a9960;
  font-size: 10px;
  padding:5px
}
.signup {
  
  border: 1px solid rgb(95, 0, 32);
  border-radius: 10px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  padding:20px;
  margin-top: 70px;
  margin-bottom: 70px;
}
form {
  padding-left: 50px;
  padding-right: 50px;

}
#logo {
  width: 150px;
  
}

#no, #biz {
  text-decoration-line: underline;
  font-size: 10px;
  color: #A90065;
  margin: 50px;
  padding: 0px;
}

</style>