<template>
  <div>
    <app-header></app-header>
    <img src="../assets/TopPic1.png"/>
    <div class='changepw'>
      <img id='logo' src="../assets/logo.png"/>
      <h1>CHANGE PASSWORD</h1>
      <div id="content" class="flexbox">
        <form>
          <label for="new">*New Password:</label><br>
          <input type="text" id="new" v-model="newpw"><br><br>
          <label for="re-enter">*Re-Enter New Password:</label><br>
          <input type="text" id="re-enter" v-model="re_enter"><br><br>
          <input type="button" id='submit' value="CHANGE" v-on:click="change()">
        </form>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from './Header.vue'
  import firebase from "firebase/app"
  import 'firebase/auth'

  export default {
    components: {
      AppHeader:Header
    },
    data() {
      return {  
        newpw:"",
        re_enter:""
      }
    },
    methods: {
      change: function() {
        if (this.newpw==this.re_enter) {
          var user = firebase.auth().currentUser;
          user.updatePassword(this.newpw).then(()=> {             
            console.log("Change successfully!");
            this.$router.replace({ path: "/" });          
          }).catch(function(error) {
            console.log(error.message);
          });
        } else {
          alert("Your passwords do not match!")
        }
      }
    },
  }
</script>

<style scoped>

button {
  width: 140px;
  padding:10px;
  border: 1px solid #D25A7E;
  background-color: white;
  color: #D25A7E;
}

input {
  width: 200px;
  height: 25px;
  border: none;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  background-color: #fff;
}
input:focus {
  outline: none;
  border-bottom: 2px solid #ED83A7;
}
#submit {
  background-color: #D25A7E;
  width: auto;
  color:white;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
  height: auto;
  margin: 0px;
  border-style: none;
}
label {
  color: #D25A7E
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
.changepw {
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


</style>