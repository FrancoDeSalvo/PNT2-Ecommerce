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
    console.log("app.vue", localStorage.logged);
  }
};
</script>