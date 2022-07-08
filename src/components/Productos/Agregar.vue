<template>
  <div class="container d-flex justify-content-center mt-4 text-info">
  <div class="card col-sm-6 p-3 border border-2 border-success">

      <div class="mb-3 text-center">
        <h4 class="text-white bg-success rounded px-3 py-2">
          Agregar nuevo Producto            
        </h4>
      </div>
  
      <form v-on:submit.prevent="agregarProducto" class="row g-3">
        <div class="col-md-6">
          <label for="nombre">Nombre del producto</label>
          <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Ingrese nombre" required v-model="form.nombre"/>
        </div>
        <div class="col-md-6">
          <label for="descripcion">Descripcion</label>
          <input type="descripcion" class="form-control" name="descripcion" id="descripcion" placeholder="Ingrese descripcion" required v-model="form.descripcion"/>
        </div>
        <div class="col-md-6">
          <label for="categoria">Categoria: {{form.categoria}}</label>
        </div>
        <div class="col-md-6">
          <label for="marca">Marca</label>
          <input type="text" class="form-control" name="marca" id="marca" placeholder="Ingrese marca" required v-model="form.marca"/>
        </div>
        <div class="col-md-6">
          <label for="stock">Stock</label>
          <input type="number" class="form-control" name="stock" id="stock" placeholder="Ingrese stock" required v-model="form.stock"/>
        </div>
        <div class="col-md-6">
          <label for="precio">Precio</label>
          <input type="number" class="form-control" name="precio" id="precio" placeholder="Ingrese precio" required v-model="form.precio"/>
        </div>
        <div class="col-12">
          <label for="img">Imagen</label>
          <input type="text" class="form-control" name="img" id="img" placeholder="Ingrese imagen" required v-model="form.img"/>
        </div>

        <div class="d-block mt-4 text-center">   
          <button class="btn btn-outline-success px-4" type="submit">Agregar <i class="fa-solid fa-plus"></i></button>
        </div>

      </form>

    </div>
    </div>

  <div class="container text-center pb-4 mt-4">
    <router-link :to=urlProductos class="me-2">
      <button type="button" class="btn btn-secondary"><i class="fas fa-arrow-left"></i>
        Volver a {{form.categoria}}
      </button>
    </router-link>
    <router-link to="/" >
      <button type="button" class="btn btn-warning"> Home <i class="fas fa-home"></i></button>
    </router-link>
  </div>

</template>


<script>
import axios from "axios";

export default {
  name: "AgregarProducto",
  data() {
    return {
      categorias: [],
      urlProductos: `/Productos/${this.$route.params.categoria}`,
      form: {
        nombre: null,
        stock: null,
        descripcion: null,
        precio: null,
        marca: null,
        categoria: this.$route.params.categoria,
        img: null
      }
    };
  },
  props: {},
  // computed:{
  //   nombreCategorias(){
  //     let data = [];
  //     this.categorias.forEach(c => {
  //       data.push(c.nombre)
  //     })
  //     return data;
  //   }
  // },
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