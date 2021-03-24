<template>
  <div class="header">
    <div class="flexWrap">
      <div class="flexCol">
        <img id="logo" src="../assets/logo.png">
      </div>
      <div class="flexCol">
        <a id="home"> <router-link to="/" exact>HOME</router-link></a>
        CATEGORY
      </div>
      <div id='side' class="flexCol">
        <router-link to="/cart" exact>My Cart</router-link>
        <router-link tag="button" to="/signup" exact>Sign Up</router-link>
        <router-link tag="button" to="/login" exact>My Account</router-link>
       <router-link tag="button" to="/profile" exact>Profile</router-link>        
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
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

.flexWrap {
  display: flex;
  overflow: hidden;
  margin: 30px;
  margin-bottom: 15px;
  border-bottom: 1px solid #000;

}
.flexCol {
  box-sizing: border-box;
  padding: 10px;
  width: 33.3%
}

/* (B) BREAK DOWN 1 COLUMN ON SMALL SCREENS */
@media only screen and (max-width: 768px) {
  .flexWrap { flex-wrap: wrap; }
  .flexCol { width: 100%; }
}
#logo {
  width: 150px;
  float: left;
}

#side {
  text-align: right;
}

/* Style the header links */
.header a {
  color: #ED83A7;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 18px; 
  line-height: 25px;
}

button {
  margin: 3px;
  background-color: white;
  border-radius: 11px;
  border-style: solid;
  border-color: #ED83A7;
  padding: 3px 10px;
}
a.router-link-active{
  
  text-decoration: underline;
  text-decoration-color:grey;
  text-decoration-thickness: 2px;
} 
button.router-link-active{
  background-color: #ED83A7;
  color: white;
} 

/* Change the background color on mouse-over */
/* .header a:hover {
  background-color: #ddd;
  color: black;
}
*/
/*Style the active/current link*/


</style>