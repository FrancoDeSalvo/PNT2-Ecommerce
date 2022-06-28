<template>
    <section class="d-flex justify-content-center mt-4 text-info">
    <div class="card col-sm-6 p-3 mb-5">
        <div class="mb-3">
            <h4>Eliminar Categoria</h4>
        </div>

        <div class="mb-2">
            <form v-on:submit.prevent="eliminarCategoria">
                <div class="mb-2"> 
                    <label for="nombre">Nombre de la categoria</label>
                    <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Ingrese nombre" v-model="form.nombreCategoria">
                </div>
                <div class="mb-2"> 
                    <label for="password">ID</label>
                    <input type="text" class="form-control" name="id" id="id" placeholder="Ingrese ID" required v-model="form.id">
                </div>

                <div class="mb-2 d-inline"> 
                    <button class="btn btn-danger text-white" type="submit">Eliminar</button>
                </div>
            </form>
            
        </div>
        </div>
    </section>

</template>


<script>
import axios from "axios";
export default {
  name: "AgregarCategoria",
  data() {
    return {
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
    } 
  },
};

</script>