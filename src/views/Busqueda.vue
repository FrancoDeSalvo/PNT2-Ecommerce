<template>

  <div class="container">
    <div class="row mb-4 text-dark" id="cards" >
      <div :key="p.id" v-for="p in productos" class = "col-4 mt-4">
          <Producto :producto="p" />
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from "axios";
import Producto from "../components/Producto.vue";

export default {
  name: "BusquedaProducto",
  data() {
    return {
      productos: [],
      nombre: /*this.$route.params.nombre*/"",
    };
  },
  components: {
    Producto
  },

  methods: 
  { 
    async loadProductos(page = `https://62a389b85bd3609cee6be5d9.mockapi.io/Productos?nombre=${this.nombre}`) {
      const response = await axios.get(page); 
      this.productos = response.data;
    }, 
  },
  created() { 
      this.loadProductos();
      console.log("local", localStorage.productoABuscar);
  },
};
</script>
