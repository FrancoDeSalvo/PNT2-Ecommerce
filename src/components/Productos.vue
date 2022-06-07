<template>

  <div class="container mt-4">
    <form v-on:submit.prevent="onSubmit" class="border border-2 rounded-3 text-center">
      <div class="row text-dark justify-content-center">

        <!-- Buscar por Nombre -->
        <div class = "col-3">
          <div class="mb-3 mx-3 my-3">
            <label for="" class="form-label">Buscar por Nombre</label>
            <input type="text" class="form-control" v-model="form.nombre">
          </div>
          
          <div class="d-grid gap-2 mx-3 my-3">
            <input class="btn btn-info text-white" type="submit" value="Buscar"/>
          </div>
        </div>
        
      </div>
    </form>
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
import Producto from "./Producto.vue";

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
    async loadProductos(page = "https://6282d2e692a6a5e4621a2391.mockapi.io/Producto") {
      const response = await axios.get(page); 
      const p = response.data; 
      this.productos = p.filter(x => x.categoria === this.categoria)
      console.log(this.categoria);
    }, 

    async loadProducto(page) {
      const response = await axios.get(page); 
      this.productos = response.data;
    }, 

    onSubmit() {
        let url = "https://6282d2e692a6a5e4621a2391.mockapi.io/Producto"
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
