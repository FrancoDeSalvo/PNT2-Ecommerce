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
  name: "AgregarX",
  data() {
    return {
        
        form: {
            nombre: null,
            stock: null,
            descripcion:null,
            precio:null,
            eliminado:false,
            id:null,
            marca:null,
            categoria:null,
        }
    };
  },
  props: {},
  methods: { 
    async eliminarProducto(){
    await axios.delete(`https://62a389b85bd3609cee6be5d9.mockapi.io/Productos/${this.form.id}`);
    
     }
    },
  

};
</script>