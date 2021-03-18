<template>
  <div id="app">
  
    <MyCart></MyCart>
    <Footer></Footer>
    
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Footer from './components/Footer.vue'
import MyCart from './components/MyCart.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld,
    'MyCart': MyCart,
    'Footer': Footer,

  }
}
</script>

<style>
#app {
  text-align: center;
}
</style>
