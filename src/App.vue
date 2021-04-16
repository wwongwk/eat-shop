<template>
  <div id="app">
   <router-view></router-view>
   <Footer></Footer>
   
  </div>
</template>

<script>

import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    'Footer': Footer, 
  }
}
</script>

<style>
#app {
  text-align: center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
