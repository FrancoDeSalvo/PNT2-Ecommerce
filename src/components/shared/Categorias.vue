<template>
  <div class="row justify-content-center">
    <div class="card" style="width: 18rem;">
      <div class="card-body text-center" >
        <router-link :to="url">
          <img :src= "categoria.img" class="card-img-top" alt="Responsive image" style="width: 40%"/>
          <h5 class="card-title"> {{categoria.nombre}}</h5>
        </router-link>
      </div>
    </div>          
  </div>
</template>

<script>

export default {
  name: "CategoriaX",
  data() {
    return {
      url: `/Productos/${this.categoria.nombre}`,
    };
  },
  props: {
    categoria: Object,
  },
};
</script>
