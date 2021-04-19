<template>
  <div class="footer">
    <footer>
      <div id="subscribe">
        <label id="text">Receive monthly newsletters and exclusive promotions:     </label>
        
          <input type="textArea" id="address" />
          <button v-on:click="displayMsg" id="submitBtn">SUBSCRIBE</button>
        <br>
      </div>
      <p id="copyright"><i>&copy;2021 by EAT&SHOP</i></p>
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
    padding:20px;
    height: 200px;
    color: #000000;
    font-size: 18px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    clear: both;
    bottom: 0;
    margin-left: 50px;
    margin-right: 50px;
    margin-bottom: 50px;
    background-color: #f9d1b7;
    background-image: linear-gradient(315deg, #f9d1b7 0%, #f894a4 74%);
  }

  #subscribe {
    margin-left: 200px;
    margin-bottom: 30px;
    margin-top: 30px;
    text-align: center;
    align-content: center;
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
    height: 40px;
    background-color: none;
    margin-right: 10px;
  }
  #text {
    margin-right: 20px;
  }
  #submitBtn {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  height: 40px;
  text-align: center;
  background: #ED83A7;
  cursor: pointer;
  font-size: 16px;
  border: 0;
  transition: all 0.5s;
  border-radius: 10px;
  width: auto;
  position: relative;
}
  #submitBtn::after {
    content: '\00bb';
    font-weight: 400;
    position: absolute;
    left: 85%;
    top: 22%;
    right: 5%;
    bottom: 0;
    opacity: 0;
  }
  
  #submitBtn:hover {
    background: #D25A7e;
    transition: all 0.5s;
    border-radius: 10px;
    box-shadow: 0px 6px 15px #ED83A7;
    padding-right: 20px;
  }
  #submitBtn:hover::after {
    opacity: 1;
    transition: all 0.5s;
  }
  
  p {
    font-size: 10px;
    color: #000000;
    display: inline;
    margin: 70px;
  }
  
  #copyright {
    text-align: center;
    font-size: 18px;
    line-height: 4;
  }
</style>

