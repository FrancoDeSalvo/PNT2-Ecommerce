<template>
    <div class="container d-flex justify-content-center mt-4 text-info">
    <div class="card col-sm-6 p-3 border border-2 border-danger">

        <div class="mb-3 text-center">
            <h4 class="text-white bg-danger rounded px-3 py-2">
                Eliminar Categoria
            </h4>
        </div>

        <form v-on:submit.prevent="eliminarCategoria" class="row g-3">
            <div class="col-md-6"> 
                <label for="nombre">Nombre de la categoria</label>
                <select class="form-select" v-model="form.nombreCategoria">
                    <option disabled value>-- Elige una categoria --</option>
                    <option :key="c.id" v-for="c in categorias">{{c.nombre}}</option>
                </select>
            </div>
            <div class="col-md-6"> 
                <label for="password">ID</label>
                <input type="text" class="form-control" name="id" id="id" placeholder="Ingrese ID" required v-model="form.id">
            </div>

            <div class="d-block mt-4 text-center">   
                <button class="btn btn-outline-danger px-4" type="submit">
                    Eliminar <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </form>
            
    </div>
    </div>

    <div class="d-flex justify-content-center mt-4">
        <div class="text-center">
            <h5 class="text-info border border-3 border-info rounded-pill px-3 py-1">
                Categorias Actuales
            </h5>
        </div>
    </div>
    <div class="container mt-2">
        <div class="d-flex text-center">
        <div :key="c.id" v-for="c in categorias" >
            <div class="border border-2 pt-2">
                <p><strong>Nombre:</strong> {{c.nombre}} <strong>Codigo:</strong> {{c.idCategoria}}</p>
            </div>
        </div>
        </div>
    </div>

    <div class="container text-center pb-4 mt-4">
      <router-link to="/">
        <button type="button" class="btn btn-warning">
            Home <i class="fas fa-home"></i>
        </button>
      </router-link>
    </div>

</template>


<script>
import axios from "axios";
export default {
  name: "AgregarCategoria",
  data() {
    return {
        categorias: [],
        form: {
            nombreCategoria: null,
            id: null,
        }
    };
  },
  props: {},
  methods: { 
    async eliminarCategoria() {
        const categoria = await this.verificarCategoria();
        if(categoria){
            let ok = confirm(`Esta seguro de eliminar la categoria ${this.form.nombreCategoria} (ID: ${this.form.id})`)
            if(ok) {
                await axios.delete(`https://62a389b85bd3609cee6be5d9.mockapi.io/Categorias/${categoria.id}`);
                alert("Categoria eliminada con exito")
                this.$router.push({name: "Home"});
            }
        }else{
            alert("No se encontró dicha categoria")
        }
    },  
    async verificarCategoria(){
      const response = await axios.get("https://62a389b85bd3609cee6be5d9.mockapi.io/Categorias"); 
      const categorias = response.data; 
      const x = categorias.find(u => u.nombre == this.form.nombreCategoria && u.idCategoria == this.form.id)
      return x;
    },

    async obtenerCategorias(){
      const response = await axios.get("https://62a389b85bd3609cee6be5d9.mockapi.io/Categorias")
      this.categorias = response.data
    },
  },
  created(){
    this.obtenerCategorias()
  }
};

</script>