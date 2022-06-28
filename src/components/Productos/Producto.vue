<template>
  <div class="row justify-content-center">
    <div class="card text-center" style="width: 18rem;">
      <router-link :to="url">
        <img :src= "producto.img" class="card-img-top" alt="Responsive image" style="width: 70%"/>
        <h5 class="card-title"> {{producto.nombre}}</h5>
      </router-link>
      <div class="card-body">
        <p class="card-text">Precio: ${{producto.precio}}</p>
        <p class="card-text">Estado: {{this.disponible}}</p>
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
      disponible: "Disponible"
    };
  },
  props: {
    producto: Object,
  },
  methods:{
    disponibilidad(){
      if(this.producto.eliminado){
        this.disponible = "No disponible";
      }
    }
  },
  created(){
    this.disponibilidad();
  }
};
</script>