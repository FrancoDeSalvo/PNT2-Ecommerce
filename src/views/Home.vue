<template>

  <div class="container">
    <div class="row mb-4 text-dark" id="cards">
      <div :key="c.id" v-for="c in categorias" class="col-4 mt-4">
        <Categoria :categoria="c" />
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import Categoria from "../components/shared/Categorias.vue";

export default {
  name: "HomeIndex",
  data() {
    return {
      productos: [],
      categorias: [],
      form: {
        nombre: null,
      },
    };
  },
  components: {
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

    onSubmit() {
      let url = "https://62a389b85bd3609cee6be5d9.mockapi.io/Productos";
      if (this.form.nombre) {
        this.form.nombre ? (url = url + "?nombre=" + this.form.nombre) : null;
      }
      this.loadProducto(url);
    },
  },
  created() {
    this.loadProductos();

    // localStorage.logged;

    console.log("localstorage home.vue", localStorage.logged);
  },
};
</script>