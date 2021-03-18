<template>
  <div>
    <Header></Header>
    <img src="../assets/TopPic.png"/>
    <div class='signup'>
      <img id='logo' src="../assets/logo.png"/>
      

    </div>
    
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
.signup {
  
  border: 1px solid rgb(95, 0, 32);
  border-radius: 10px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
 

}
#logo {
  width: 150px;
  
}

</style>