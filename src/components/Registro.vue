<template>
     <section class="d-flex justify-content-center mt-4 text-info">
        <div class="card col-sm-6 p-3">
        <div class="mb-3">
            <h4>Registrarse</h4>
        </div>
        <div class="mb-2">
            <form v-on:submit.prevent="registro">
                <div class="mb-2"> 
                    <label for="nombreUsuario">Nombre de Usuario</label>
                    <input type="text" class="form-control" name="nombreUsuario" id="nombreUsuario" placeholder="Ingrese su nombre de usuario" v-model="form.username">
                </div>
                <div class="mb-2"> 
                    <label for="password">Contraseña</label>
                    <input type="password" class="form-control" name="password" id="password" placeholder="Ingrese contraseña" required v-model="form.password">
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
                    <label for="dni">Dni</label>
                    <input type="text" class="form-control" name="dni" id="dni" placeholder="Ingrese su dni" v-model="form.dni">
                </div>
                <div class="mb-2 d-inline me-3"> 
                    <button class="btn btn-primary text-white" type="submit">Registrarse</button>
                </div>
                <div class="mb-2 d-inline"> 
                    <router-link class="link active" to="/Login">Ya tienes cuenta? Iniciar sesion</router-link>
                </div>
            </form>
        </div>
        </div>
    </section>

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
            dni:null
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
            const usuario = { nombreUsuario: this.form.username, password:this.form.password, nombre: this.form.nombre, apellido: this.form.apellido, dni:this.form.dni, id: Math.random() };
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
        const carrito ={idUsuario: usuario.id, productos :[]}
        const response1 = await axios.post("https://62a389b85bd3609cee6be5d9.mockapi.io/Carritos", carrito);
        carrito.id = response1.data.id
    }
  },
};
</script>