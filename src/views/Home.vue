<template>

  <NavBar></NavBar>

  <div class="container">
    <div class="row mb-4 text-dark" id="cards">
      <div :key="c.id" v-for="c in categorias" class="col-4 mt-4">
        <Categoria :categoria="c" />
      </div>
    </div>
  </div>

  <!-- ADMIN -->
  <div class="d-flex justify-content-center mt-5 mb-5" v-if="admin == 2">
    <router-link to="/AgregarCategoria" class="me-3">
      <button class="btn btn-outline-success" type="button">
        Agregar Nueva Categoria <i class="fa-solid fa-plus"></i>
      </button>
    </router-link> 

    <router-link to="/EliminarCategoria">
      <button class="btn btn-outline-danger" type="button">
        Eliminar Categoria <i class="fa-solid fa-trash-can"></i>
      </button>
    </router-link>    
  </div>
  <!-------------------------->

</template>

<script>
import axios from "axios";
import Categoria from "../components/Categorias/Categorias.vue";
import NavBar from "../components/shared/Navbar.vue";

export default {
  name: "HomeIndex",
  data() {
    return {
      productos: [],
      categorias: [],
      admin: localStorage.logged,
    };
  },
  components: {
    NavBar,
    Categoria, 
  },

  methods: {
    async loadProductos(
      page = "https://62a389b85bd3609cee6be5d9.mockapi.io/Categorias"
    ) {
      const response = await axios.get(page);
      this.categorias = response.data;
    },

    async loadProducto(page) {
      const response = await axios.get(page);
      this.productos = response.data;
    },
  },
  created() {
    this.loadProductos();
    console.log("localstorage home.vue", localStorage.logged);
  },
};
</script>