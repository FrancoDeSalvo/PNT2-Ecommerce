<template>

  <div class="text-center">
      <h3 class="d-block text-white bg-secondary row rounded pt-2 pb-2">{{ usuario.nombreUsuario }}</h3>
  </div>

  <div class="container mt-3">
    <div class="row">

      <div class="col-6 text-center mt-5">
        <img src= "https://thumbs.dreamstime.com/b/icono-de-la-persona-en-el-fondo-blanco-111394209.jpg" class="card-img-top" alt="Responsive image" style="width: 70%"/>
      </div>

      <div class="col-6">
        <h5 class="text-secondary">Nombre de usuario</h5>
        <p class="card-text">{{this.usuario.nombreUsuario}}</p>

        <h5 class="text-secondary">Nombre</h5>
        <p class="card-text">{{this.usuario.nombre}}</p>

        <h5 class="text-secondary">Apellido</h5>
        <p class="card-text">{{this.usuario.apellido}}</p>

        <h5 class="text-secondary mt-3">Dni</h5>
        <p class="card-text">{{this.usuario.dni}}</p>

       
      </div>

    </div>
  </div>

  <div class="container text-center mb-4 mt-5">
    <router-link to="/">Home</router-link>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "UsuarioDetalle",
  data() {
    return {
      id: this.$route.params.id,
      usuario: Object,
    usuarios: []
    };
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