<template>
    <section class="d-flex justify-content-center mt-4 text-info">
    <div class="card col-sm-6 p-3 mb-5">
        <div class="mb-3">
            <h4>Agregar nueva Categoria</h4>
        </div>

        <div class="mb-2">
            <form v-on:submit.prevent="agregarCategoria">
                <div class="mb-2"> 
                    <label for="nombre">Nombre de la categoria</label>
                    <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Ingrese nombre" v-model="form.nombreCategoria">
                </div>
                <div class="mb-2"> 
                    <label for="img">Imagen</label>
                    <input type="text" class="form-control" name="img" id="img" placeholder="Ingrese imagen" required v-model="form.img">
                </div>
                <div class="mb-2"> 
                    <label for="idCategoria">ID</label>
                    <input type="text" class="form-control" name="idCategoria" id="idCategoria" placeholder="Ingrese ID" required v-model="form.id">
                </div>

                <div class="mb-2 d-inline"> 
                    <button class="btn btn-success text-white" type="submit">Agregar</button>
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
            const categoria = { nombre: this.form.nombreCategoria, img:this.form.img, idCategoria: this.form.id};
            await axios.post("https://62a389b85bd3609cee6be5d9.mockapi.io/Categorias", categoria);
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
    } 
  },
};

</script>