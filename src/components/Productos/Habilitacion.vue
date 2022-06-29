<template>
  <section class="d-flex justify-content-center mt-4 text-info">
    <div class="card col-sm-6 p-3 mt-5">

      <div class="mb-3">
        <h4>Deshabilitar Producto: {{producto.nombre}}</h4>
      </div>
      <button class="btn btn-outline-success" type="button" @click="habilitarProducto()">
        Habilitar <i class="fa-solid fa-check"></i>
      </button>
      <button class="btn btn-outline-danger mt-2" type="button" @click="eliminarProducto()">
        Eliminar <i class="fa-solid fa-trash-can"></i>
      </button>

    </div>
  </section>

  <div class="container text-center mb-4 mt-4">
    <router-link to="/">Home</router-link>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "EliminarProducto",
  data() {
    return {
      form: {
          nombre: null,
          marca: null,
          categoria: null,
      },
      producto: Object,
      id: this.$route.params.id,
    };
  },
  props: {},
  methods: {
    async habilitarProducto(){
      if(this.producto.eliminado){
        const producto = this.buildProduct()
        await axios.put(`https://62a389b85bd3609cee6be5d9.mockapi.io/Productos/${this.id}`, producto);
        alert("Producto habiltado con exito")
        this.$router.push({name: "ProductoDetalle"});
      }
      else{
          alert("El producto ya esta habilitado")
      }      
    },
    async eliminarProducto(){
      if(!this.producto.eliminado){
        const producto = this.buildProduct(true)
        await axios.put(`https://62a389b85bd3609cee6be5d9.mockapi.io/Productos/${this.id}`, producto);
        alert("Producto deshabiltado con exito")
        this.$router.push({name: "ProductoDetalle"});
      }
      else{
          alert("El producto ya esta deshabilitado")
      }
      console.log("eliminado producto", this.producto.eliminado);
    },
    async getProducto(){
      const response = await axios.get(`https://62a389b85bd3609cee6be5d9.mockapi.io/Productos/${this.id}`); 
      this.producto = response.data; 
    },
    buildProduct(eliminado = false){
      const p = this.producto;
      let producto;
      if(p){
          producto = { 
            nombre: p.nombre, 
            img: p.img, 
            categoria: p.categoria,
            stock: p.stock,
            marca: p.marca,
            precio: p.precio,
            descripcion: p.descripcion,
            eliminado: eliminado
          }
      }
      return producto;
    }
  },
  async created(){
    await this.getProducto();
  }
};
</script>