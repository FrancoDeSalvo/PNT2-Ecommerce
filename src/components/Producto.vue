<template>
  <div >
    <div class="card" style="width: 18rem;">
      <img :src= "producto.img" class="card-img-top" alt="...">
      <div class="card-body">
          <router-link :to="url"><h5 class="card-title"> {{producto.nombre}}</h5></router-link>
          <p class="card-text">Precio: ${{producto.precio}}</p>
          <p class="card-text">Disponibilidad: {{this.disponible}}</p>
      </div>
    </div>          
  </div>
</template>

<script>

export default {
  name: "ProductoX",
  data() {
    return {
      url: `/ProductoDetalle/${this.producto.id}`,
      disponible: !this.producto.eliminado
    };
  },
  props: {
    producto: Object,
  },
};
</script>