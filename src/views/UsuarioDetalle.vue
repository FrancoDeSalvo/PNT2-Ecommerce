<template>

  <NavBar></NavBar>

  <div class="text-center">
      <h4 class="d-block text-white bg-secondary row rounded pt-2 pb-2">
        Detalles de mi cuenta
      </h4>
  </div>

  <div class="container mt-4">
    <div class="row">

      <div class="col-6 text-center">
        <img :src= "usuario.avatar" class="card-img-top" alt="Responsive image" style="width: 50%"/>
      </div>

      <div class="col-6">
        <h5 class="text-secondary">Nombre de usuario</h5>
        <p class="card-text">{{usuario.nombreUsuario}}</p>

        <h5 class="text-secondary">Nombre</h5>
        <p class="card-text">{{usuario.nombre}}</p>

        <h5 class="text-secondary">Apellido</h5>
        <p class="card-text">{{usuario.apellido}}</p>

        <h5 class="text-secondary mt-3">Dni</h5>
        <p class="card-text">{{usuario.dni}}</p>
      </div>

    </div>
  </div>

  <div class="d-flex justify-content-center mt-5">
    <router-link :to=urlEditarUsuario>
      <button class="btn btn-outline-warning" type="button">
        Editar mi cuenta <i class="fa-solid fa-pen-to-square"></i>
      </button>
    </router-link>   
  </div>

</template>

<script>
import axios from "axios";
import NavBar from "../components/shared/Navbar.vue";

export default {
  name: "UsuarioDetalle",
  data() {
    return {
      id: this.$route.params.id,
      usuario: Object,
      usuarios: [],
      urlEditarUsuario: `/EditarUsuario/${this.$route.params.id}`
    };
  },
  components:{
    NavBar
  },
  methods: {
    async loadUser() {
      const response = await axios.get(`https://62a389b85bd3609cee6be5d9.mockapi.io/Usuarios/${this.id}`);
      this.usuario = response.data;
    },
  },
  async created() {
    await this.loadUser();
  },
};

</script>