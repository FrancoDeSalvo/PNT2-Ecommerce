<template>
  
    <div class="container mt-4 text-center">
      <div class="row justify-content-center">
        <div class="col-8 ">
          <h2 class="text-white bg-secondary rounded">{{ producto.nombre }}</h2>
          <img :src= "producto.img" class="card-img-top mt-3" alt="Responsive image" style="width: 40%"/>
        </div>
      </div>
    </div>
  

    <div class="container mt-4 mb-4">
      <div class="row text-dark justify-content-center">

        <div class="col-2">
          <h5 class="text-primary">Descripcion</h5>
          <p class="card-text">{{producto.descripcion}}</p>
        </div>

        <div class="col-2">
          <h5 class="text-primary">Stock</h5>
          <p class="card-text">{{producto.stock}}</p>
        </div>

        <div class="col-2">
          <h5 class="text-primary">Precio</h5>
          <p class="card-text">${{producto.precio}}</p>
        </div>

        <div class="col-2">
          <h5 class="text-primary">Disponibilidad</h5>
          <p class="card-text">{{this.disponible}}</p>
        </div>

      </div>
    </div>

    <div class="container">
      <div class="row text-dark justify-content-center">
        <div class="col-3 d-grid gap-2 mx-3 my-3 mt-5">
            <button class="btn btn-outline-success" type="button">Agregar al Carrito</button>
        </div>
      </div>
    </div>

    <div class="container text-center mb-4 mt-1">
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
      disponible: null,
    };
  },
  methods: {
    async loadProducto() {
      const response = await axios.get(`https://62a389b85bd3609cee6be5d9.mockapi.io/Productos/${this.id}`);
      this.producto = response.data;
      this.disponible = !this.producto.disponible;
    },
  },
  created() {
    this.loadProducto();
  },
};
</script>