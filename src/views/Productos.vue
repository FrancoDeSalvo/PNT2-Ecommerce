<template>

  <div>
    <div class="text-center">
      <h1 class="d-block text-white bg-success row rounded pt-2 pb-2">- {{ categoria }} -</h1><br>
    </div>
  </div>

  <div class="container">
    <div class="row mb-4 text-dark" id="cards" >
      <div :key="p.id" v-for="p in productosData" class = "col-4 mt-4">
          <Producto :producto="p" />
      </div>
    </div>
  </div>

  <div class="container mt-4">
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center" id="paginator">
        <button :disabled="currentPage == 1" id="prev" class="page-item border border-2 mx-1" @click="prevPage"><i class="fa-solid fa-angle-left"></i></button>
        <button :disabled="productosData.length < perPage" id="next" class="page-item border border-2 mx-1" @click="nextPage"><i class="fa-solid fa-angle-right"></i></button>
      </ul>
    </nav>
  </div>

  <!-- ADMIN -->
  <div class="d-flex justify-content-center mt-5 mb-5" v-if="admin == 2">
    <router-link to="/AgregarProducto" class="me-3">
      <button class="btn btn-outline-primary" type="button">
        Agregar Nuevo Producto <i class="fa-solid fa-plus"></i>
      </button>
    </router-link> 
  </div>
  <!-------------------------->

</template>

<script>
import axios from "axios";
import Producto from "../components/Productos/Producto.vue";

export default {
  name: "ProductosX",
  data() {
    return {
      productos: [],
      perPage: 3,
      currentPage: 1,
      categoria: this.$route.params.categoria,
      categoriaId: null,
      admin: localStorage.logged,
    };
  },
  components: {
    Producto
  },

  computed:{
    productosData() {
      let data = [];
      for (let i = 0; i < this.productos.length; i++) {
        if(this.productos[i].categoria == this.categoriaId && this.admin == 2){
          data.push(this.productos[i]);
        }
        else if (this.productos[i].categoria == this.categoriaId && !this.productos[i].eliminado) {
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
      await this.getCategoria()
    },
    async getCategoria(page = `https://62a389b85bd3609cee6be5d9.mockapi.io/Categorias?nombre=${this.categoria}`){
      const response = await axios.get(page); 
      const c = response.data;
      this.categoriaId = c[0].idCategoria;
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