<template>
  <div class="row justify-content-center">
    <div class="card text-center" style="width: 18rem;">

      <router-link :to="urlDetalleUsuario">
        <img :src="usuario.avatar" class="card-img-top" alt="Responsive image" style="width: 50%"/>
        <h5 class="card-title"> {{usuario.nombreUsuario}}</h5>
      </router-link>

      <div class="card-body">
        <p class="card-text">Nombre: {{usuario.nombre}}</p>
        <p class="card-text">Apellido: {{usuario.apellido}}</p>
        <p class="card-text">Dni: {{usuario.dni}}</p>
        <p class="card-text">Admin: {{usuario.admin}}</p>
        
        <div class="mt-2">
          <router-link :to="urlEditar">
            <button type="button" class="btn btn-warning" > Editar usuario </button>
          </router-link>
        </div>
        
        <div class="mt-2" v-if="!usuario.admin">
          <!-- <router-link :to="urlEliminar"> -->
            <button type="button" class="btn btn-success" @click="hacerAdmin()"> Hacer administrador </button>
          <!-- </router-link> -->
        </div>

        <div class="mt-2" v-if="usuario.admin">
          <!-- <router-link :to="urlEliminar"> -->
            <button type="button" class="btn btn-danger" @click="sacarAdmin()"> Sacar administrador </button>
          <!-- </router-link> -->
        </div>

        <div class="mt-2">
          <router-link :to="urlEliminar">
            <button type="button" class="btn btn-danger" > Eliminar usuario </button>
          </router-link>
        </div>
      </div>

    </div>         
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UsuarioX",
  data() {
    return {
      url: `/Usuario/${this.usuario.id}`,
      urlEliminar:`/EliminarUsuario/${this.usuario.id}`,
      urlEditar:`/EditarUsuario/${this.usuario.id}`,
      urlDetalleUsuario:`/UsuarioDetalle/${this.usuario.id}`
    };
  },
  props: {
    usuario: Object,
  },
  methods:{
    async hacerAdmin(){
      if(!this.usuario.admin){
        const user = this.adminTemplate(true)
        await axios.put(`https://62a389b85bd3609cee6be5d9.mockapi.io/Usuarios/${this.usuario.id}`, user);
        alert(`Nuevo administrador: ${this.usuario.nombreUsuario}`)
        this.$router.push({name: "Home"});
      }
      else{
        alert("Ya es administrador")
      }
    },

    async sacarAdmin(){
      if(this.usuario.admin){
        const user = this.adminTemplate()
        await axios.put(`https://62a389b85bd3609cee6be5d9.mockapi.io/Usuarios/${this.usuario.id}`, user);
        alert(`${this.usuario.nombreUsuario} dejó de ser administrador`)
        this.$router.push({name: "Home"});
      }
      else{
        alert("No es administrador")
      }
    },

    adminTemplate(bool = false){
      const userAdmin = {admin: bool}
      return userAdmin;
    }
  },
  created(){
    this.adminTemplate();
  }
};
</script>