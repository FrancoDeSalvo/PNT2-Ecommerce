<template>

  <div>
    <div class="container mt-4 ">
      <div class="row justify-content-center">
        <div class="col text-center">
          <h1 class="d-inline text-white bg-dark row rounded">{{ producto.nombre }}</h1><br>
          <img :src= "producto.img" class="card-img-top" style="width: 30%">
        </div>
      </div>
    </div>
  </div>

    <div class="container mt-4 mb-4">
      <div class="row text-dark justify-content-center">

        <div class="col-2">
          <h5 class="text-success">Descripcion</h5>
          <p class="card-text">{{producto.descripcion}}</p>
        </div>

        <div class="col-2">
          <h5 class="text-success">Stock</h5>
          <p class="card-text">{{producto.stock}}</p>
        </div>

        <div class="col-2">
          <h5 class="text-success">Precio</h5>
          <p class="card-text">${{producto.precio}}</p>
        </div>

        <div class="col-2">
          <h5 class="text-success">Disponibilidad</h5>
          <p class="card-text">{{this.disponible}}</p>
        </div>

      </div>
    </div>

    <div class="container">
      <div class="row text-dark justify-content-center">
        <div class="col-2 d-grid gap-2 mx-3 my-3">
          <input class="btn btn-info text-white" type="submit" value="Agregar al carrito"/>
        </div>
      </div>
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
      const response = await axios.get(`https://6282d2e692a6a5e4621a2391.mockapi.io/Producto/${this.id}`);
      this.producto = response.data;
      this.disponible = !this.producto.disponible
    },
  },
  created() {
    this.loadProducto();
  },
};
</script>