<template>
  <div id="header">  
    <h1>
      <pre id="Home">Home        </pre>
      <pre id="Category">        Category</pre>
    </h1>
    <h2>
      <pre id="SignUp">Sign up   </pre>
      <p id="MyAccount">My account</p>
    </h2>
    <hr>
    <h3>My Cart</h3>
  </div>
</template>

<script>
  export default {
    components: {

    },
    name: "Cart Header",
    data() {
      return {
            
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  #header {
    height: 200px;
    text-align: center;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
  h1 {
    font-size: 20px;
    //position: absolute;
    top: 8px;
  }

  h2 {
    font-size: 20px;
    position: absolute;
    top: 8px;
    right: 16px;
  }

  h3 {
    position: absolute;
    font-size: 64px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #403939;
    //margin: 20px;
    left: 60px;
  }

  p {
    align-content: center;
  }

  #Home, #Category {
    color: #ED83A7;
    display: inline;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    align-items: center;
  }

  #SignUp, #MyAccount {
    display: inline;
    color: #403939;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

</style>