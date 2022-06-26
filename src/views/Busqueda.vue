<template>

  <div class="container">
    <div class="row mb-4 text-dark" id="cards" >
      <div :key="p.id" v-for="p in productosData" class = "col-4 mt-4">
          <Producto :producto="p" />
      </div>
    </div>
  </div>

  <!-- PAGINATION -->
  <div class="container mt-4">
      <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center" id="paginator">
            <button :disabled="currentPage == 1" id="prev" class="page-item border border-2" @click="prevPage">Previous</button>
            <button :disabled="productosData.length < perPage" id="next" class="page-item border border-2" @click="nextPage">Next</button>
          </ul>
      </nav>
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
      perPage: 3,
      currentPage: 1,
    };
  },
  components: {
    Producto
  },
  computed:{
    productosData() {
      let data = [];
      if(!this.$route.params.nombre){
        return this.productos
      }
      for (let i = 0; i < this.productos.length; i++) {
        if (this.productos[i].nombre
            .toLowerCase()
            .includes(this.$route.params.nombre.toLowerCase())) {
          data.push(this.productos[i]);
        } 
      }
      data = data.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
      return data;
    },
  },

  methods: 
  { 
    async loadProductos(page = `https://62a389b85bd3609cee6be5d9.mockapi.io/Productos`) {
      const response = await axios.get(page);
      this.productos = response.data;
    },
    prevPage(){
      this.currentPage--;
    },
    nextPage() {
      this.currentPage++;
    },
  },
  created() {
    this.loadProductos();
  },
};
</script>