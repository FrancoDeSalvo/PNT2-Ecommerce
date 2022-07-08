<template>
  <div class="container d-flex justify-content-center mt-5 text-info">
  <!-- <div class="card col-sm-4 p-3 border border-2 border-primary"> -->
  <div class="col-sm-4 p-3">

    <div class="mb-3 text-center">
      <img src="../../assets/logo-ecommerce.png" class="img-fluid w-25" alt="" >
    </div>
    
    <div class="mb-3 text-center">
        <h4 class="text-white bg-primary rounded px-3 py-2">
        <!-- <h4 class="text-primary border border-3 border-primary rounded-pill px-3 py-2"> -->
            Iniciar Sesion
        </h4>
    </div>

    <form v-on:submit.prevent="login" class="row g-3">
        <div class="col-12">
            <label for="nombre">Nombre de Usuario</label>
            <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Ingrese nombre de usuario" v-model="form.username">
        </div>
        <div class="col-12">
            <label for="password">Contraseña</label>
            <input type="password" class="form-control" name="password" id="password" placeholder="Ingrese contraseña" required v-model="form.password">
        </div>

        <div class="mb-2 mt-4 text-center">   
            <button class="btn btn-primary text-white" type="submit">Ingresar</button>
        </div>
        <div class="text-center"> 
            <router-link class="link active" to="/Registro">No tienes cuenta? Registrate</router-link>
        </div>
    </form>

    </div>
    </div>

   <div class="container text-center pb-4 mt-4">
      <router-link to="/">
        <button type="button" class="btn btn-warning"> Home
        <i class="fas fa-home"></i>
      </button>
      </router-link>
    </div>

</template>

<script>
import axios from "axios";

export default {
  name: "LoginX",
  data() {
    return {
      users: null,
      form: {
        username: null,
        password: null,
      }
    };
  },
  props: {},
  methods: { 
    async login() {
      const user = await this.loginUser();
      const admin = await this.loginAdmin();
      if(user || admin){
        this.$router.push({name: "Home"});
      }
      else{
        alert("usuario o contraseña incorrecto")
      }
    },  

    async getUser(){
      const response = await axios.get("https://62a389b85bd3609cee6be5d9.mockapi.io/Usuarios"); 
      this.users = response.data; 
      const x = this.users.find(u => u.nombreUsuario == this.form.username && u.password == this.form.password)
      return x;
    },

    async loginUser() {
      const user = await this.getUser();
      let ok = false;
      if(user && !user.admin){
        localStorage.logged = 1;
        localStorage.userLogged = user.id;
        localStorage.userLoggedName = user.nombreUsuario;
        ok = true;
      }
      return ok;
    },  

    async loginAdmin(){
      const admin = await this.getUser();
      let ok = false;
      if(admin && admin.admin){
        localStorage.logged = 2;
        localStorage.userLogged = admin.id;
        localStorage.userLoggedName = `admin ${admin.nombreUsuario}`;
        ok = true; 
      }
      return ok;
    }
  },
};

</script>