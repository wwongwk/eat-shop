<template>
  <div class="footer">
    <footer>
      <div class="subscribe">
      <form id="form">
        <label for="email">Receive monthly newsletters and exclusive promotions:</label><br>
        <input type="textArea" id="email" v-model="email" /><br>
        <input type="submit" value="Subscribe" v-on:click="displayMsg" id="submitBtn">
      </form><br>
      </div>
      <p id="AboutUs">About us    </p>
      <p id="Partnership">Partnership    </p>
      <p id="Terms">Terms of use    </p>
    </footer>
  </div>
</template>

<script>
  export default {
    methods: {
      displayMsg:function () {
        alert("You are subscribed to our website!");
      }
    }
  }
</script>

<style scoped>
  footer {
    background-color:#ED83A7;
    /*background-opacity:0.6;*/
    padding:5px;
    height: 200px;
    color: #000000;
    font-size: 18px;
    
  }
  #email, #submitBtn {
    display: inline-flex;
  }
  
  #submitBtn {
    background-color:#D25A7e;
    font-size: 20px;
    border-radius: 8px;
    padding: 7px 20px;
    color: #403939;
    border: none;
    cursor: pointer;
  }
  p {
    font-size: 10px;
    color: #000000;
    display: inline;
    margin: 50px;
  }
  #AboutUs {
    /* font-family:; */
    color: #000000;
    font-size: 18px;
  }
  #Partnership{
    /* font-family: ; */
    color: #000000;
    font-size: 18px;
  }
  #Terms {
    /* font-family: ; */
    color: #000000;
    font-size: 18px;
  }
</style>

