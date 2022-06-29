<template>
  <section class="d-flex justify-content-center mt-4 text-info">
    <div class="card col-sm-4 p-3 mt-5 border border-4">

      <div class="mb-3 text-center">
          <h4>Ingresar</h4>
      </div>

      <div class="mb-2">
        <form v-on:submit.prevent="login">
          
            <div class="mb-2 text"> 
                <label for="nombre">Nombre de Usuario</label>
                <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Ingrese nombre de usuario" v-model="form.username">
            </div>
            <div class="mb-4"> 
                <label for="password">Contraseña</label>
                <input type="password" class="form-control" name="password" id="password" placeholder="Ingrese contraseña" required v-model="form.password">
            </div>

            <div class="d-block mb-4 text-center">   
                <button class="btn btn-primary text-white" type="submit">Ingresar</button>
            </div>
            <div class="text-center"> 
                <router-link class="link active" to="/Registro">No tienes cuenta? Registrate</router-link>
            </div>

        </form>
      </div>

    </div>
  </section>

  <div class="container text-center mb-4 mt-4">
    <router-link to="/">Home</router-link>
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