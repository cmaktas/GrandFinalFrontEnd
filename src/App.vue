<template>
  <div id="app">
    <navbar v-if="$route.path != '/Login'"></navbar>
    <footer v-if="$route.path != '/Login'"></footer>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: {   
    Navbar,    
    },
    created() {
      let token = localStorage.getItem("user");
       if(!token){
        this.$router.push("login")
      }
    }
}
</script>



<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
</style>
