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
            <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Ingrese nombre" required v-model="form.nombre"/>
          </div>
          <div class="mb-2">
            <label for="descripcion">Descripcion</label>
            <input type="descripcion" class="form-control" name="descripcion" id="descripcion" placeholder="Ingrese descripcion" required v-model="form.descripcion"/>
          </div>
          <div class="mb-2">
            <label for="stock">Stock</label>
            <input type="text" class="form-control" name="stock" id="stock" placeholder="Ingrese stock" required v-model="form.stock"/>
          </div>
          <div class="mb-2">
            <label for="precio">Precio</label>
            <input type="number" class="form-control" name="precio" id="precio" placeholder="Ingrese precio" required v-model="form.precio"/>
          </div>
          <div class="mb-2">
            <label for="categoria">Categoria</label>
            <select class="form-select" v-model="form.categoria">
              <option disabled value>-- Elige una categoria --</option>
              <option :key="c.id" v-for="c in nombreCategorias">{{c}}</option>
            </select>
          </div>
          <div class="mb-2">
            <label for="img">Imagen</label>
            <input type="text" class="form-control" name="img" id="img" placeholder="Ingrese imagen" required v-model="form.img"/>
          </div>
          <div class="mb-2">
            <label for="marca">Marca</label>
            <input type="text" class="form-control" name="marca" id="marca" placeholder="Ingrese marca" required v-model="form.marca"/>
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
      categorias: [],
      form: {
        nombre: null,
        stock: null,
        descripcion: null,
        precio: null,
        marca: null,
        categoria: '',
        img: null
      }
    };
  },
  props: {},
  computed:{
    nombreCategorias(){
      let data = [];
      this.categorias.forEach(c => {
        data.push(c.nombre)
      })
      return data;
    }
  },
  methods: { 
    async obtenerCategorias(){
      const response = await axios.get("https://62a389b85bd3609cee6be5d9.mockapi.io/Categorias")
      this.categorias = response.data
    },
    async agregarProducto() {
      let ok = await this.verificarProducto()
      if(!ok){
        const nuevoProducto = this.productoTemplate()
        await axios.post("https://62a389b85bd3609cee6be5d9.mockapi.io/Productos", nuevoProducto);
        alert("Producto agregado con exito")
        this.$router.push({path: `/Productos/${this.form.categoria}`});
      }else{
        alert("El producto ya existe")
      }
    },  
    async verificarProducto(){
      const response = await axios.get("https://62a389b85bd3609cee6be5d9.mockapi.io/Productos"); 
      const productos = response.data; 
      const x = productos.some(u => u.nombre == this.form.nombre && u.categoria == this.obtenerCodigoCategoria())
      console.log(x);
      return x;
    },
    productoTemplate(){
      const producto = { 
        nombre: this.form.nombre, 
        img: this.form.img, 
        categoria: this.obtenerCodigoCategoria(),
        stock: this.form.stock,
        marca: this.form.marca,
        precio: this.form.precio,
        descripcion: this.form.descripcion,
        eliminado: false
      }
      return producto;
    },
    obtenerCodigoCategoria(){
      const categoria = this.categorias.find(x => x.nombre === this.form.categoria)
      return categoria.idCategoria;
    }
  },
  async created(){
    await this.obtenerCategorias()
  }
};
</script>