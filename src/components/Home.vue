<template>
  <div class="home">
    <Header></Header>
    <img src="../assets/TopPic.png"/>
    
  </div>

</template>

<script>
  import Header from './Header.vue'
  export default {
    components: {
      Header:Header
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
img {
  width: 80%;
  height: auto;
}

</style>