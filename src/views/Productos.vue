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
  name: "ProductosX",
  data() {
    return {
      productos: [],
      perPage: 3,
      currentPage: 1,
      categoria: this.$route.params.categoria,
      categoriaId: null,
    };
  },
  components: {
    Producto
  },

  computed:{
    productosData() {
      let data = [];
      for (let i = 0; i < this.productos.length; i++) {
        if (this.productos[i].categoria == this.categoriaId) {
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
      this.categoriaId = c[0].id;
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