<template>
  <div class="footer">
    <footer>
      <div id="subscribe">
        <label>Receive monthly newsletters and exclusive promotions:</label>
        <span>
          <input type="textArea" id="address" />
          <input type="submit" value="Subscribe" v-on:click="displayMsg" id="submitBtn">
        </span><br>
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
    padding:20px;
    height: 200px;
    color: #000000;
    font-size: 18px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    clear: both;
    //position: absolute;
    bottom: 0;
  }

  label {
    margin-bottom:50px;
  }

  span {
    display: block;
    overflow: hidden;
    padding: 0px 4px 0px 6px;
  }

  input {
    border-radius: 5px;
    padding: 10px 3px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    outline: none;
    height: 45px;
    border:0;
    box-shadow:4px 4px 10px rgba(0,0,0,0.06);
  }

  #subscribe {
    margin-bottom: 50px;
  }

  #submitBtn {
    background-color:#D25A7e;
    font-size: 18px;
    //color: #403939;
    border: none;
    cursor: pointer;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
  }
  #submitBtn:hover {
    box-shadow:0 0 4px rgba(0,0,0,0.5);
  }
  p {
    font-size: 10px;
    color: #000000;
    display: inline;
    margin: 70px;
  }
  #AboutUs {
    color: #000000;
    font-size: 18px;
  }
  #Partnership{
    color: #000000;
    font-size: 18px;
  }
  #Terms {
    color: #000000;
    font-size: 18px;
  }
</style>

