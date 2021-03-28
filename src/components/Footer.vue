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
  }

  #subscribe {
    margin-bottom: 50px;
  }

  #submitBtn {
    background-color:#D25A7e;
    font-size: 20px;
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

