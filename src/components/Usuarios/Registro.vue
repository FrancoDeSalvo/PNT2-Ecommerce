<template>
    <div class="container d-flex justify-content-center mt-4 text-info">
    <div class="card col-sm-6 p-3 border border-2 border-primary">

        <div class="mb-3 text-center">
            <h4 class="text-white bg-primary rounded px-3 py-2">
                Registrate!
            </h4>
        </div>

    <form v-on:submit.prevent="registro" class="row g-3">
        <div class="col-md-6">
            <label for="nombre">Nombre</label>
            <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Ingrese su nombre" required v-model="form.nombre">
        </div>
        <div class="col-md-6">
            <label for="apellido">Apellido</label>
            <input type="text" class="form-control" name="apellido" id="apellido" placeholder="Ingrese su apellido" required v-model="form.apellido">
        </div>
        <div class="col-md-6">
            <label for="nombreUsuario">Nombre de Usuario</label>
            <input type="text" class="form-control" name="nombreUsuario" id="nombreUsuario" placeholder="Ingrese nombre de usuario" required v-model="form.username">
        </div>
        <div class="col-md-6">
            <label for="password">Contraseña</label>
            <input type="password" class="form-control" name="password" id="password" placeholder="Ingrese contraseña" required v-model="form.password">
        </div>
        <div class="col-12">
            <label for="dni">DNI</label>
            <input type="text" class="form-control" name="dni" id="dni" placeholder="Ingrese su dni" required v-model="form.dni">
        </div>
        <div class="col-12">
            <label for="profilePic">Foto de perfil</label>
            <input type="text" class="form-control" name="profilePic" id="profilePic" placeholder="Ingrese Foto de perfil" v-model="form.profilePic">
        </div>
        <div class="mb-2 mt-4 text-center"> 
            <button class="btn btn-outline-primary" type="submit">Crea tu cuenta!</button>
        </div>
        <div class="text-center"> 
            <router-link class="link active" to="/Login">Ya tienes cuenta? Iniciar sesion</router-link>
        </div>
    </form>
    </div>
    </div>

   <div class="container text-center pb-4 mt-4">
      <router-link to="/"><button type="button" class="btn btn-warning">Home
        <i class="fas fa-home"></i>
      </button>
      </router-link>
    </div>

</template>


<script>
import axios from "axios";
export default {
  name: "RegistroX",
  data() {
    return {
        users: null,
        form: {
            username: null,
            password: null,
            nombre:null,
            apellido:null,
            dni:null,
            profilePic: "https://portal.sistemas.edu.bo/images/docente/DEFECTO.jpg"
        }
    };
  },
  props: {},
  methods: { 
    async mismoNombreUsuario(nombre){
        const response = await axios.get("https://62a389b85bd3609cee6be5d9.mockapi.io/Usuarios");
        this.users = response.data;
        const usuarioEncontrado = this.users.find(u => u.nombreUsuario == nombre);
        return usuarioEncontrado
    },
    async registro(){
        if(await this.mismoNombreUsuario(this.form.username) == undefined ){
            const usuario = { nombreUsuario: this.form.username, password:this.form.password, nombre: this.form.nombre, apellido: this.form.apellido, dni:this.form.dni, id: Math.random(), admin: false, avatar: this.form.profilePic };
            const response = await axios.post("https://62a389b85bd3609cee6be5d9.mockapi.io/Usuarios", usuario);
            usuario.id = response.data.id;
            this.postCarrito(usuario);
            alert("Registro con exito")
            this.$router.push({name: "Login"});
        }else{
            alert("No podes usar ese nombre de usuario")
        }
    },
    async postCarrito(usuario){
        const carrito = {idUsuario: usuario.id, productos :[]}
        const response1 = await axios.post("https://62a389b85bd3609cee6be5d9.mockapi.io/Carritos", carrito);
        carrito.id = response1.data.id
    }
  },
};
</script>