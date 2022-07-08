<template>
    <div class="container d-flex justify-content-center mt-4 text-info">
    <div class="card col-sm-6 p-3 border border-2 border-warning">

        <div class="mb-3 text-center">
            <h4 class="text-dark bg-warning rounded px-3 py-2">
                Editar Datos: {{usuarioActual.nombreUsuario}}       
            </h4>
        </div>

    <form v-on:submit.prevent="editarUsuario" class="row g-3">
        <div class="col-md-6"> 
            <label for="nombre">Nombre</label>
            <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Ingrese su nombre" v-model="form.nombre">
        </div>
        <div class="col-md-6"> 
            <label for="apellido">Apellido</label>
            <input type="text" class="form-control" name="apellido" id="apellido" placeholder="Ingrese su apellido" v-model="form.apellido">
        </div>
        <div class="col-md-6"> 
            <label for="username">Nombre de usuario</label>
            <input type="text" class="form-control" name="username" id="username" placeholder="Ingrese nuevo nombre de usuario" v-model="form.username">
        </div>
        <div class="col-md-6"> 
            <label for="password">Contraseña</label>
            <input type="password" class="form-control" name="password" id="password" placeholder="Ingrese contraseña nueva" v-model="form.password">
        </div>
        <div class="col-12"> 
            <label for="profilePic">Foto de perfil</label>
            <input type="text" class="form-control" name="profilePic" id="profilePic" placeholder="Ingrese Foto de perfil" v-model="form.profilePic">
        </div>
        
        <div class="mb-2 mt-4 text-center"> 
            <button class="btn btn-outline-warning" type="submit">Editar <i class="fa-solid fa-pen-to-square"></i></button>
        </div>
    </form>

    </div>
    </div>
    
    <div class="container text-center pb-4 mt-4">
        <router-link to=/AdministrarUsuarios/ class="me-2" v-if=admin>
            <button type="button" class="btn btn-secondary"><i class="fas fa-arrow-left"></i>
                Administrar Usuarios
            </button>
        </router-link>
        <router-link :to=urlMiCuenta class="me-2">
            <button type="button" class="btn btn-secondary"><i class="fas fa-arrow-left"></i>
                Mi Cuenta
            </button>
        </router-link>
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
  name: "EditarX",
  data() {
    return {
        id: this.$route.params.id,
        urlMiCuenta: `/MiCuenta/${this.$route.params.id}`,
        usuarioActual : Object,
        form: {
            password: null,
            nombre:null,
            apellido:null,
            profilePic: null,
            username: null,
        },
    };
  },
  computed:{
    admin(){
        let ok;
        localStorage.logged == 2 ? ok = true : ok = false;
        return ok
    }
  },
  methods: { 
    async traerUsuario(){
        const response = await axios.get(`https://62a389b85bd3609cee6be5d9.mockapi.io/Usuarios/${this.id}`);
        this.usuarioActual = response.data;
    },

    async editarUsuario(){
        const user = this.usuarioActual;
        if(user){
            this.form.username == null ? this.form.username = user.nombreUsuario : localStorage.userLoggedName = this.form.username;
            this.form.password == null ? this.form.password = user.password : console.log(this.form.password);
            this.form.nombre == null ? this.form.nombre = user.nombre : console.log(this.form.nombre);
            this.form.apellido == null ? this.form.apellido = user.apellido : console.log(this.form.apellido);
            this.form.profilePic == null ? this.form.profilePic = user.avatar : console.log(this.form.profilePic);
            const nuevoUsuario = this.userTemplate()
            await axios.put(`https://62a389b85bd3609cee6be5d9.mockapi.io/Usuarios/${this.id}`, nuevoUsuario);
            alert(`Usuario ${this.form.username} editado con exito`)
            this.$router.push({name: "UsuarioDetalle"});
        }
        else{
            alert("Usuario invalido")
        }
    },
    userTemplate(){
        const usuarioCambios = {
                nombreUsuario : this.form.username, 
                password: this.form.password, 
                nombre: this.form.nombre, 
                apellido: this.form.apellido,
                avatar: this.form.profilePic,
            }
        return usuarioCambios;
    }
    },
    async created(){
        await this.traerUsuario()
    }
};
</script>