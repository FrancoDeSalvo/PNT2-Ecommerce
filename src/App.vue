<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "App",
  components:{
  },
  created(){
    localStorage.logged = 0;
    localStorage.currentPage = "/";
    console.log("app.vue", localStorage.logged);
  }
};
</script>