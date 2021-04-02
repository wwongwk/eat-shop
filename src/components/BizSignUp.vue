<template>
  <div>
    <app-header></app-header>
    <img src="../assets/TopPic.png"/>
    <div class='signup'>
      <img id='logo' src="../assets/logo.png"/>
      <h1>LET'S COLLAB!!</h1>
      
      <form>
        <input type="name" id="name" name="name" placeholder="NAME" v-model="form.name"><br><br>
        <input type="email" id="email1" name="email" placeholder="BIZ EMAIL" v-model="form.email"><br><br>
        <input type="number" id="mobile" name="mobile" placeholder= "CONTACT NUMBER" v-model="form.mobile"><br>
        
        <div class='container'>
          <div class='radioBtn'>
            <input type="radio" id="eat" name="type" value="eat">
            <label for="male">EAT</label><br>
          </div>
          <div class='radioBtn'>
            <input type="radio" id="play" name="type" value="play">
            <label for="female">PLAY</label><br>
          </div>
          <div class='radioBtn'>
            <input type="radio" id="shop" name="type" value="shop">
            <label for="shop">SHOP</label>
          </div>
        </div>
        <input type="button" id='submit' value="SIGN UP" v-on:click="register()">
      </form>  
          
      <router-link to="/" id='no' exact> NO, THANK YOU</router-link>
   
    </div>   
  </div>

</template>

<script>
  import Header from './Header.vue';
  import 'firebase/auth'

  export default {
    data() {
      return {
        form: {
          name: "",
          email: "",
          mobile:""
        },
      };
    },

    components: {
      AppHeader:Header
    },
   
    methods: {
       register: function() {
         if (this.form.name=="" || this.form.email=="" || this.form.mobile=="") {
          alert("Incomplete submission!");
        } else {    
          console.log();
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
.container {
  width: 100px;
  //clear: both;
  align-items: left;
  text-align: left;
  padding-left: 45px;
}
#eat, #play, #shop {
  //align-items: left;
  //text-align: left;
  padding-left: 30px;
  position: absolute;
  //padding-right: 10px;
}
label {
  display:block;
  padding-left:80px; 
  position: relative;
}
.radioBtn {
  display:flex;
  flex-direction: row; 
  justify-content: center; 
  align-items: center;
  padding-top:10px;
  padding-bottom: 10px;
  padding-left: 20px;
}
#logo {
  width: 150px;
  
}

#no {
  text-decoration-line: underline;
  font-size: 10px;
  color: #A90065;
  margin: 50px;
  padding: 0px;
}

</style>