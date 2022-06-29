<template>
  <section class="d-flex justify-content-center mt-4 text-info">
    <div class="card col-sm-6 p-3">

      <div class="mb-3">
        <h4>Agregar nuevo Producto</h4>
      </div>

      <div class="mb-2">
        <form v-on:submit.prevent="agregarProducto">
          <div class="mb-2">
            <label for="nombre">Nombre del producto</label>
            <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Ingrese nombre" v-model="form.nombre"/>
          </div>
          <div class="mb-2">
            <label for="descripcion">Descripcion</label>
            <input type="descripcion" class="form-control" name="descripcion" id="descripcion" placeholder="Ingrese descripcion" required v-model="form.descripcion"/>
          </div>
          <div class="mb-2">
            <label for="stock">Stock</label>
            <input type="text" class="form-control" name="stock" id="stock" placeholder="Ingrese stock" v-model="form.stock"/>
          </div>
          <div class="mb-2">
            <label for="precio">Precio</label>
            <input type="text" class="form-control" name="precio" id="precio" placeholder="Ingrese precio" v-model="form.precio"/>
          </div>
          <div class="mb-2">
            <label for="categoria">Categoria</label>
            <input type="text" class="form-control" name="categoria" id="categoria" placeholder="Ingrese categoria" v-model="form.categoria"/>
          </div>
          <div class="mb-2">
            <label for="img">Imagen</label>
            <input type="text" class="form-control" name="img" id="img" placeholder="Ingrese imagen" v-model="form.img"/>
          </div>
          <div class="mb-2">
            <label for="marca">Marca</label>
            <input type="text" class="form-control" name="marca" id="marca" placeholder="Ingrese marca" v-model="form.marca"/>
          </div>

          <div class="d-block mt-4 text-center">   
            <button class="btn btn-success text-white px-4" type="submit">Agregar</button>
          </div>

        </form>
      </div>

    </div>
  </section>

  <div class="container text-center mt-4 mb-4">
    <router-link to="/">Home</router-link>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "AgregarProducto",
  data() {
    return {
        form: {
            nombre: null,
            stock: null,
            descripcion: null,
            precio: null,
            eliminado: false,
            marca: null,
            categoria: null,
            img: null
        }
    };
  },
  props: {},
  methods: { 
    async agregarProducto() {
        let ok = await this.verificarProducto()
        if(!ok){
            const producto = { 
                nombre: this.form.nombre, 
                img: this.form.img, 
                categoria: this.form.categoria,
                stock: this.form.stock,
                marca: this.form.marca,
                precio: this.form.precio,
                descripcion: this.form.descripcion,
                eliminado: false
            }
            await axios.post("https://62a389b85bd3609cee6be5d9.mockapi.io/Productos", producto);
            alert("Producto agregado con exito")
            this.$router.push({name: "Productos"});
        }else{
            alert("El producto ya existe")
        }
    },  
    async verificarProducto(){
      const response = await axios.get("https://62a389b85bd3609cee6be5d9.mockapi.io/Productos"); 
      const productos = response.data; 
      const x = productos.some(u => u.nombre == this.form.nombre && u.categoria == this.form.categoria)
      return x;
    } 
  },
};
</script>