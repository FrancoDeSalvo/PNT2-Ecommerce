<template>
    <div class="container d-flex justify-content-center mt-4 text-info">
    <div class="card col-sm-6 p-3 border border-2 border-success">

        <div class="mb-3 text-center">
            <h4 class="text-white bg-success rounded px-3 py-2">
                Agregar nueva Categoria
            </h4>
        </div>

        <form v-on:submit.prevent="agregarCategoria" class="row g-3">
            <div class="col-md-6"> 
                <label for="nombre">Nombre de la categoria</label>
                <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Ingrese nombre" required v-model="form.nombreCategoria">
            </div>
            <div class="col-md-6"> 
                <label for="idCategoria">ID</label>
                <input type="text" class="form-control" name="idCategoria" id="idCategoria" placeholder="Ingrese ID" required v-model="form.id">
            </div>
            <div class="col-12"> 
                <label for="img">Imagen</label>
                <input type="text" class="form-control" name="img" id="img" placeholder="Ingrese imagen" required v-model="form.img">
            </div>

            <div class="d-block mt-4 text-center">   
                <button class="btn btn-outline-success px-4" type="submit">
                    Agregar <i class="fa-solid fa-plus"></i>
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
        <button type="button" class="btn btn-warning">Home
            <i class="fas fa-home"></i>
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
            img: null,
            id: null,
        }
    };
  },
  props: {},
  methods: { 
    async agregarCategoria() {
        let ok = await this.verificarCategoria()
        if(!ok){
            const nuevaCategoria = this.categoriaTemplate()
            await axios.post("https://62a389b85bd3609cee6be5d9.mockapi.io/Categorias", nuevaCategoria);
            alert("Categoria agregada con exito")
            this.$router.push({name: "Home"});
        }else{
            alert("Categoria ya registrada")
        }
    },  
    async verificarCategoria(){
      const response = await axios.get("https://62a389b85bd3609cee6be5d9.mockapi.io/Categorias"); 
      const categorias = response.data; 
      const x = categorias.some(u => u.nombre == this.form.nombreCategoria || u.idCategoria == this.form.id)
      return x;
    },
    categoriaTemplate(){
        const categoria = { nombre: this.form.nombreCategoria, img:this.form.img, idCategoria: this.form.id};
        return categoria;
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