<template>
  <div>
    <Header></Header>
    <img src="../assets/TopPic.png"/>
    <div class='profile'>
      <img id='logo' src="../assets/logo.png"/>
      <h1>MY PROFILE PAGE</h1>
      <section>
      <div>
        <router-link tag="button" to="/profile" exact>BASIC DETAILS</router-link><br>
        <router-link tag="button" to="/" exact>UPCOMING <br>RESERVATIONS</router-link><br>
        <router-link tag="button" to="/" exact>PAST EVENTS</router-link>
      </div>
    <div id="content" class="flexbox">
      <form>
        <label for="fname">FIRST NAME:</label><br>
        <input type="fname" id="fname" name="fname"><br><br>
        <label for="lname">LAST NAME:</label><br>
        <input type="lname" id="lname" name="lname"><br><br>
        <label for="email">YOUR EMAIL:</label><br>
        <input type="email" id="email" name="email" ><br><br>
        <label for="mobile">BIRTHDAY</label><br>
        <input type="tel" id="mobile" name="mobile" ><br><br>
        <div style="color: #D25A7E; text-decoration:underline">CLICK TO CHANGE PASSWORD</div><br>
        <input type="submit" id='submit' value="SAVE">
      </form>
      <br>
    </div>
      </section>
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

button {
  width: 140px;
  padding:10px;
  border: 1px solid #D25A7E;
  background-color: white;
  color: #D25A7E;
}
button.router-link-active {

  border: 1px solid #D25A7E;
  background-color: #D25A7E;
  color: white;
}
section {
  display: flex;
  overflow: hidden;
  margin: 30px;
  text-align: left;
  width: 800px;
  border:1px solid #D25A7E;
  
  
}
.flexbox {
  box-sizing: border-box;
  padding: 10px;
  border-left: 1px solid #D25A7E;
}
  
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
.profile {
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