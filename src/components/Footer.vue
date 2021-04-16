<template>
  <div class="footer">
    <footer>
      <div id="subscribe">
        <label id="text">Receive monthly newsletters and exclusive promotions:     </label>
        
          <input type="textArea" id="address" />
          <input type="submit" value="SUBSCRIBE" v-on:click="displayMsg" id="submitBtn">
        <br>
      </div>
      <p id="AboutUs">About us    </p>
      <p id="Partnership">Partnership    </p>
      <p id="Terms">Terms of use    </p><br>
      <p id="copyright">&copy;2021 by team</p>
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
    background-color:#F6D9E9;
    /*background-opacity:0.6;*/
    padding:20px;
    height: 250px;
    color: #000000;
    font-size: 18px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    clear: both;
    /*position: absolute;*/
    bottom: 0;
    width: 90%;
    margin-left: 50px;
    margin-bottom: 50px;
  }


  #subscribe {
    display: flex;
    margin-left: 200px;
    margin-bottom: 80px;
    margin-top: 30px;
  }
  input {
    border-radius: 10px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    outline: none;
    border:0;
    box-shadow:4px 4px 10px rgba(0,0,0,0.06);
    width: 300px;
    height: 30px;
    background-color: none;
  }
  #text {
    margin-right: 20px;
  }
  #submitBtn {
    background-color:#ED83A7;
    font-size: 16px;
    font-family: Futura, light;
    border: none;
    cursor: pointer;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    width: 100px;
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
  #copyright {
    text-align: center;
    font-size: 14px;
    line-height: 4;
  }
</style>

