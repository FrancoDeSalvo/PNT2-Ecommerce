<template>
    <section class="d-flex justify-content-center mt-4 text-info ">
    <div class="card col-sm-6 p-3 border border-4">
    <form v-on:submit.prevent="editarUsuario">

        <div class="mb-3">
            <h4>Editar Datos: {{usuarioActual.nombreUsuario}}</h4>
        </div>

        <div class="mb-2"> 
            <label for="nombre">Nombre</label>
            <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Ingrese su nombre" v-model="form.nombre">
        </div>
        <div class="mb-2"> 
            <label for="apellido">Apellido</label>
            <input type="text" class="form-control" name="apellido" id="apellido" placeholder="Ingrese su apellido" v-model="form.apellido">
        </div>
        <div class="mb-2"> 
            <label for="username">Nombre de usuario</label>
            <input type="text" class="form-control" name="username" id="username" placeholder="Ingrese nuevo nombre de usuario" v-model="form.username">
        </div>
        <div class="mb-2"> 
            <label for="password">Contraseña</label>
            <input type="password" class="form-control" name="password" id="password" placeholder="Ingrese contraseña nueva" v-model="form.password">
        </div>
        <div class="mb-2"> 
            <label for="profilePic">Foto de perfil</label>
            <input type="text" class="form-control" name="profilePic" id="profilePic" placeholder="Ingrese Foto de perfil" v-model="form.profilePic">
        </div>
        
        <div class="mb-2 mt-4 text-center"> 
            <button class="btn btn-primary text-white" type="submit">Editar</button>
        </div>

    </form>
    </div>
    </section>
    
    <div class="container text-center mb-4 mt-3">
        <router-link to="/">Home</router-link>
    </div>
</template>


<script>
import axios from "axios";
export default {
  name: "EditarX",
  data() {
    return {
        id: this.$route.params.id,
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
  methods: { 
    async traerUsuario(){
        const response = await axios.get(`https://62a389b85bd3609cee6be5d9.mockapi.io/Usuarios/${this.id}`);
        this.usuarioActual = response.data;
    },

    async editarUsuario(){
        const user = this.usuarioActual;
        if(user){
            this.form.username == null ? this.form.username = user.nombreUsuario : console.log(this.form.username);
            this.form.password == null ? this.form.password = user.password : console.log(this.form.password);
            this.form.nombre == null ? this.form.nombre = user.nombre : console.log(this.form.nombre);
            this.form.apellido == null ? this.form.apellido = user.apellido : console.log(this.form.apellido);
            this.form.profilePic == null ? this.form.profilePic = user.avatar : console.log(this.form.profilePic);
            const usuarioCambios = {
                nombreUsuario : this.form.username, 
                password: this.form.password, 
                nombre: this.form.nombre, 
                apellido: this.form.apellido,
                avatar: this.form.profilePic,
            }
            await axios.put(`https://62a389b85bd3609cee6be5d9.mockapi.io/Usuarios/${this.id}`, usuarioCambios);
            alert(`Usuario ${this.form.username} editado con exito`)
            this.$router.push({name: "Home"});
        }
        else{
            alert("Usuario invalido")
        }
    },
    },
    async created(){
        await this.traerUsuario()
    }
};
</script>