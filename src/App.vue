<template>
  <div>
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/shared/Navbar.vue";

export default {
  name: "App",
  components:{
    NavBar
  },

  created(){
    localStorage.logged = 0;
    console.log("app.vue", localStorage.logged);
  }
};
</script>