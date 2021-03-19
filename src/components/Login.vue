<template>
  <div>
    <Header></Header>
    <img src="../assets/TopPic.png"/>
    <div id='login'>
      <img id='logo' src="../assets/logo.png"/>
      <h1>LOGIN</h1>
      <form>
        <input type="email" id="email" name="email" placeholder="YOUR EMAIL"><br><br>
        <input type="password" id="password" name="password" placeholder= "PASSWORD"><br><br>
        <input type="submit" id='submit' value="LOGIN">
      </form>
      <br>
      <div id='forgetPW'>FORGET PASSWORD</div>
      <div id='signup' style="font-size: 13px; margin: 10px; ">NO ACCOUNT? <span> SIGN UP!</span></div>

    </div>
    
  </div>

</template>

<script>
  import Header from './Header.vue'
  export default {
    components: {
      Header:Header
    },
    data() {
      return {  
      }
    },
    methods: {
    }
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
}

h1 {
  margin: 0pc;
  margin-bottom: 20px;
  color:#D25A7E;
}
::placeholder {
  color: #b86a9960;
  font-size: 14px; 
  padding:5px
}
#login {
  
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

#forgetPW, span {
  text-decoration-line: underline;
  font-size: 12px;
  color: #A90065;
  margin: 0px;
}

</style>