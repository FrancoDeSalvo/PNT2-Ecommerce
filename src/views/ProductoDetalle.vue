<template>

  <div class="text-center">
      <h3 class="d-block text-white bg-secondary row rounded pt-2 pb-2">{{ producto.nombre }}</h3>
  </div>

  <div class="container mt-3">
    <div class="row">

      <!-- <div class="col-6 text-center border border-3"> -->
      <div class="col-6 text-center mt-5">
        <img :src= "producto.img" class="card-img-top img-fluid w-50" alt="Responsive image" />
      </div>

      <!-- <div class="col-6 border border-3 text-center"> -->
      <div class="col-6">
        <h5 class="text-secondary">Precio</h5>
        <p class="card-text">${{producto.precio}}</p>

        <h5 class="text-secondary">Estado</h5>
        <p class="card-text">{{this.disponible}}</p>

        <h5 class="text-secondary">Stock</h5>
        <p class="card-text">{{producto.stock}}</p>

        <h5 class="text-secondary mt-3">Descripcion</h5>
        <p class="card-text">{{producto.descripcion}}</p>

        <div class="text-center mt-4">
              <button class="btn btn-outline-success" type="button">Agregar al Carrito</button>
        </div>

      </div>
    </div>
  </div>

  <div class="container text-center mb-4 mt-5">
    <router-link to="/">Home</router-link>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "ProductoDetalle",
  data() {
    return {
      id: this.$route.params.id,
      producto: Object,
      disponible: "Disponible",
    };
  },
  methods: {
    async loadProducto() {
      const response = await axios.get(`https://62a389b85bd3609cee6be5d9.mockapi.io/Productos/${this.id}`);
      this.producto = response.data;
      this.disponibilidad()
    },
    async disponibilidad(){
      if(this.producto.disponible){
        this.disponible = "No disponible";
      }
    }
  },
  created() {
    this.loadProducto();
  },
};
</script>