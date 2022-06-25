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
      form: {
        nombre: null,
      }
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
    }, 
    async getCategoria(){
      const c = await this.getResponse("https://62a389b85bd3609cee6be5d9.mockapi.io/Categorias"); 
      const categoriaEncontrada = c.find(x => x.nombre === this.categoria);
      return categoriaEncontrada;
    },
    async getResponse(page){
      const response = await axios.get(page); 
      return response.data; 
    },
    async loadProducto(page) {
      const response = await axios.get(page); 
      this.productos = response.data;
    }, 
    onSubmit() {
        let url = "https://62a389b85bd3609cee6be5d9.mockapi.io/Productos"
        if(this.form.nombre){
          this.form.nombre ? (url = url + '?nombre=' + this.form.nombre) : null;
        }
        this.loadProducto(url);
    },
  },
  created() { 
      this.loadProductos();
  },
};
</script>