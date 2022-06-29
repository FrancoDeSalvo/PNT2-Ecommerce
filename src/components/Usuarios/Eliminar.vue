<template>

<section class="d-flex justify-content-center mt-4">
    <div class="card col-sm-6 p-3 mb-5 mt-5">

      <div class="mb-3">
        <h5>Confirmar eliminacion del usuario {{usuario.nombreUsuario}}</h5>
      </div>
      <button class="btn btn-outline-danger mt-2" type="button" @click="eliminarUsuario()">
        Eliminar<i class="fa-solid fa-trash-can"></i>
      </button>

    </div>
  </section>
    
  <div class="container text-center mb-3 mt-3">
    <router-link to="/">Home</router-link>
  </div>

</template>


<script>
import axios from "axios";

export default {
  name: "EliminarX",
  data() {
    return {
      id: this.$route.params.id,
      usuario: Object
    };
  },
  methods: { 
    async getUsuario(){
      const response = await axios.get(`https://62a389b85bd3609cee6be5d9.mockapi.io/Usuarios/${this.id}`);
      this.usuario = response.data;
    },
    async eliminarUsuario(){
      await axios.delete(`https://62a389b85bd3609cee6be5d9.mockapi.io/Usuarios/${this.id}`);
      await axios.delete(`https://62a389b85bd3609cee6be5d9.mockapi.io/Carritos/${this.id}`);
      alert("Eliminado con exito")
      this.$router.push({name: "AdministrarUsuarios"});
     }
  },
  async created(){
    await this.getUsuario();   
  }
};
</script>