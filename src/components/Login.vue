<template>
     <section class="d-flex justify-content-center mt-4 text-info">
        <div class="card col-sm-6 p-3">
        <div class="mb-3">
            <h4>Ingresar</h4>
        </div>
        <div class="mb-2">
            <form v-on:submit.prevent="login">
                <div class="mb-2"> 
                    <label for="nombre">Nombre de Usuario</label>
                    <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Ingrese su nombre" v-model="form.username">
                </div>
                <div class="mb-3"> 
                    <label for="password">Contraseña</label>
                    <input type="password" class="form-control" name="password" id="password" placeholder="Ingrese contraseña" required v-model="form.password">
                </div>

                <div class="mb-2 d-inline me-3"> 
                    <button class="btn btn-primary text-white" type="submit">Ingresar</button>
                </div>

                <div class="mb-2 d-inline"> 
                    <router-link class="link active" to="/Registro">No tienes cuenta? Registrate</router-link>
                </div>
            </form>
        </div>
        </div>
    </section>

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
  props: {
  },
  methods: 
  { 
    async login() {
      const response = await axios.get("https://62a389b85bd3609cee6be5d9.mockapi.io/Usuarios"); 
      this.users = response.data; 
      const x = this.users.find(u => u.nombreUsuario == this.form.username && u.password == this.form.password)
      console.log(x)
      if(x != undefined){
          localStorage.logged = 1;
      } else{
          alert("usuario o contraseña incorrecto")
      }
      console.log("LocalStorage login", localStorage.logged)
    },  
  },
};

</script>
