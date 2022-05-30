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

        <!-- Filtrar por Categoria -->
        <div class = "col-3">
          <label for="" class="form-label mt-3">Filtrar por Categoria</label><br>
          <select class="mt-3" name="select" v-model="form.categoria">
            <!-- <option value="selectEstado" selected>-- Categoria --</option> -->
            <option value="Heladeras">Heladeras</option>
            <option value="Hardware">Hardware</option>
            <option value="PC">PC</option>
            <option value="Lavarropas">Lavarropas</option>
            <option value="Microondas">Microondas</option>
            <option value="Televisores">Televisores</option>
            <option value="Celulares">Celulares</option>
          </select>
          <div class="d-grid gap-2 mx-3 my-3">
            <input class="btn btn-info text-white" type="submit" value="Buscar"/>
          </div>
        </div>

      </div>
    </form>
  </div>

  <!-- PAGINATION -->
  <!-- <div class="container mt-4">
      <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center" id="paginator">
            <button id="prev" class="page-item border border-2" @click="prevPage">Previous</button>
            <button id="next" class="page-item border border-2" @click="nextPage">Next</button>
          </ul>
      </nav>
  </div> -->

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
  name: "HelloWorld",
  data() {
    return {
      productos: [],
      form: {
        nombre: null,
        categoria: null
      }
    };
  },
  components: {
    Producto,
  },

  methods: 
  { 
    async loadProductos(page = "https://6282d2e692a6a5e4621a2391.mockapi.io/Producto") {
      const response = await axios.get(page); 
      this.productos = response.data; 
      // this.next = next;
      // this.prev = prev;
      // document.getElementById("prev").disabled = !this.prev;
      // document.getElementById("next").disabled = !this.next;
    }, 

    async loadProducto(page) {
      const response = await axios.get(page); 
      this.productos = response.data;
    }, 

    // prevPage(){
    //   this.loadProductos(this.prev)
    // },
    // nextPage() {
    //   this.loadProductos(this.next)
    // },

    onSubmit() {
        let url = "https://6282d2e692a6a5e4621a2391.mockapi.io/Producto"
        this.form.nombre ? (url = url + '?nombre=' + this.form.nombre) : null;
        this.loadProducto(url);
    },
  },
  created() { 
      this.loadProductos();
  },
};
</script>
