<template>
    
        <form v-on:submit.prevent="editarUsuario">
            <div class="card col-sm-6 p-3">
                <div class="mb-3">
            <h4>Editar Datos</h4>
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
                    <button class="btn btn-primary text-white" type="submit">Editar</button>
                </div>
            </div>
            </form>
</template>


<script>
import axios from "axios";
export default {
  name: "EditarX",
  data() {
    return {
    id: this.$route.params.id,
    usuario1 : null,
     form: {
            password: null,
            nombre:null,
            apellido:null,
            dni:null,
            
        },
    };
  },
   props: {
    usuario: Object,

  },
  methods: { 

    async traerUsuario(){
        this.usuario1 = await axios.get(`https://62a389b85bd3609cee6be5d9.mockapi.io/Usuarios/${this.id}`)
    },

    async editarUsuario(){
    const usuarioCambios = {nombreUsuario : this.usuario1.nombreUsuario, password: this.form.password, nombre: this.form.nombre, apellido: this.form.apellido, dni:this.form.dni}
    await axios.put(`https://62a389b85bd3609cee6be5d9.mockapi.io/Usuarios/${this.id}`, usuarioCambios);
    
    
     }
    },
   async created(){
        await this.traerUsuario()
    }
  

};
</script>