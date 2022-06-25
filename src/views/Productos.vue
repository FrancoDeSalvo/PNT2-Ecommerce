<template>

 <div>
    <div class="text-center">
      <h1 class="d-block text-white bg-success row rounded pt-2 pb-2">- {{ categoria }} -</h1><br>
    </div>
  </div>

  <div class="container">
    <div class="row mb-4 text-dark" id="cards" >
      <div :key="p.id" v-for="p in productos" class = "col-4 mt-4">
          <Producto :producto="p" />
      </div>
    </div>
  </div>

  <!-- PAGINATION -->
  <div class="container mt-4">
      <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center" id="paginator">
            <button id="prev" class="page-item border border-2" @click="prevPage">Previous</button>
            <button id="next" class="page-item border border-2" @click="nextPage">Next</button>
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
      categoria: this.$route.params.categoria,
      // perPage: 3
      // form: {
      //   nombre: null,
      // }
    };
  },
  components: {
    Producto
  },

  methods: 
  { 
    async loadProductos(page = "https://62a389b85bd3609cee6be5d9.mockapi.io/Productos") {
      const p = await this.getResponse(page); 
      const categoria = await this.getCategoria();
      this.productos = await p.filter(x => x.categoria == categoria.id)
      // this.next = next;
      // this.prev = prev;
      // document.getElementById("prev").disabled = !this.prev;
      // document.getElementById("next").disabled = !this.next;
    }, 
    // prevPage(){
    //   this.loadProductos(this.prev)
    // },
    // nextPage() {
      
    //   this.loadProductos(this.next)
    // },
    async getCategoria(){
      const c = await this.getResponse("https://62a389b85bd3609cee6be5d9.mockapi.io/Categorias"); 
      const categoriaEncontrada = c.find(x => x.nombre === this.categoria);
      return categoriaEncontrada;
    },
    async getResponse(page){
      const response = await axios.get(page); 
      return response.data; 
    },
    // async loadProducto(page) {
    //   const response = await axios.get(page); 
    //   this.productos = response.data;
    // }, 
    // onSubmit() {
    //     let url = "https://62a389b85bd3609cee6be5d9.mockapi.io/Productos"
    //     if(this.form.nombre){
    //       this.form.nombre ? (url = url + '?nombre=' + this.form.nombre) : null;
    //     }
    //     this.loadProducto(url);
    // },
  },
  created() { 
      this.loadProductos();
  },
};
</script>