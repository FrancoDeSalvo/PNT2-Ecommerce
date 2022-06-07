<template>
  <div >
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <router-link :to="url"><h5 class="card-title"> {{categoria}}</h5></router-link>
      </div>
    </div>          
  </div>
</template>

<script>

export default {
  name: "CategoriaX",
  data() {
    return {
      url: `/Productos/${this.categoria}`,
    };
  },
  props: {
    categoria: Object,
  },
};
</script>
