<template>
  <div class="container d-flex justify-content-center mt-4 text-info">
  <div class="card col-sm-6 p-3 border border-2 border-warning">

    <div class="mb-3 text-center">
      <h4 class="text-dark bg-warning rounded px-3 py-2">
          Producto a editar: {{producto.nombre}}
      </h4>
    </div>

    <form v-on:submit.prevent="editarProducto" class="row g-3">
      <div class="col-md-6"> 
        <label for="nombre">Nombre del producto</label>
        <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Ingrese nombre" v-model="form.nombre"/>
      </div>
      <div class="col-md-6"> 
        <label for="descripcion">Descripcion</label>
        <input type="descripcion" class="form-control" name="descripcion" id="descripcion" placeholder="Ingrese descripcion" v-model="form.descripcion"/>
      </div>
      <div class="col-md-6"> 
        <label for="categoria">Categoria</label>
        <select class="form-select" v-model="form.categoria">
          <option disabled value>-- Elige una categoria --</option>
          <option :key="c.id" v-for="c in nombreCategorias">{{c}}</option>
        </select>
      </div>
      <div class="col-md-6"> 
        <label for="marca">Marca</label>
        <input type="text" class="form-control" name="marca" id="marca" placeholder="Ingrese marca" v-model="form.marca"/>
      </div>
      <div class="col-md-6"> 
        <label for="stock">Stock</label>
        <input type="number" class="form-control" name="stock" id="stock" placeholder="Ingrese stock" v-model="form.stock"/>
      </div>
      <div class="col-md-6"> 
        <label for="precio">Precio</label>
        <input type="number" class="form-control" name="precio" id="precio" placeholder="Ingrese precio" v-model="form.precio"/>
      </div>
      <div class="col-12"> 
        <label for="img">Imagen</label>
        <input type="text" class="form-control" name="img" id="img" placeholder="Ingrese imagen" v-model="form.img"/>
      </div>

      <div class="d-block mt-4 text-center">   
        <button class="btn btn-outline-warning" type="submit">Editar <i class="fa-solid fa-pen-to-square"></i></button>
      </div>
    </form>

  </div>
  </div>

  <div class="container text-center pb-4 mt-4">
    <router-link :to=urlProductoDetalle class="me-2">
      <button type="button" class="btn btn-secondary"><i class="fas fa-arrow-left"></i>
        Volver al detalle del producto
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
  name: "EditarProducto",
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
      },
      categorias: [],
      producto: Object,
      id: this.$route.params.id,
      urlProductoDetalle: `/ProductoDetalle/${this.$route.params.id}`
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
    async editarProducto(){
        const encontrado = await this.getProducto();
        if(encontrado){
            this.form.nombre == null ? this.form.nombre = encontrado.nombre : console.log(this.form.nombre);
            this.form.img == null ? this.form.img = encontrado.img : console.log(this.form.img);
            this.form.categoria == null ? this.form.categoria = encontrado.categoria : console.log(this.form.categoria);
            this.form.stock == null ? this.form.stock = encontrado.stock : console.log(this.form.stock);
            this.form.precio == null ? this.form.precio = encontrado.precio : console.log(this.form.precio);
            this.form.descripcion == null ? this.form.descripcion = encontrado.descripcion : console.log(this.form.descripcion);
            this.form.marca == null ? this.form.marca = encontrado.marca : console.log(this.form.marca);

            const nuevoProducto = this.productoTemplate()
            await axios.put(`https://62a389b85bd3609cee6be5d9.mockapi.io/Productos/${encontrado.id}`, nuevoProducto);
            alert("Producto editado con exito")
            this.$router.push({name: "ProductoDetalle"});
        }
        else{
            alert("No se pudo editar el producto")
        }
    },
    async getProducto(){
      const response = await axios.get(`https://62a389b85bd3609cee6be5d9.mockapi.io/Productos/${this.id}`); 
      this.producto = response.data; 
      return this.producto;
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
    async obtenerCategorias(){
      const response = await axios.get("https://62a389b85bd3609cee6be5d9.mockapi.io/Categorias")
      this.categorias = response.data
    },
    obtenerCodigoCategoria(){
      const categoria = this.categorias.find(x => x.nombre === this.form.categoria)
      return categoria.idCategoria;
    }
  },
  async created(){
      await this.getProducto();
      await this.obtenerCategorias();
  }
};
</script>