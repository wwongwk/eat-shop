<template>
  <div id="app">
   <router-view></router-view>
   <Footer></Footer>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
//import MyCart from './components/MyCart.vue' 
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld,
    /* 'MyCart': MyCart,*/
    'Footer': Footer, 

  }
}
</script>

<style>
#app {
  text-align: center;
}
</style>
