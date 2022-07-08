<template>
  <div class="container d-flex justify-content-center mt-4">
  <div class="card col-sm-6 p-3 border border-2 border-primary">

    <div class="mb-2 text-center">
      <h4 class="text-white bg-primary rounded px-3 py-2">
        {{producto.nombre}}
      </h4>
      <p class="text-primary mt-4">Estado Actual: {{estadoActual}}</p>
    </div>

    <div class="row g-3">
        <button class="btn btn-outline-success col-12" type="button" @click="habilitarProducto()">
          Habilitar <i class="fa-solid fa-check"></i>
        </button>
        <button class="btn btn-outline-danger col-12" type="button" @click="eliminarProducto()">
          Deshabilitar <i class="fa-solid fa-trash-can"></i>
        </button>
    </div>

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
  name: "EliminarProducto",
  data() {
    return {
      producto: Object,
      id: this.$route.params.id,
      urlProductoDetalle: `/ProductoDetalle/${this.$route.params.id}`
    };
  },
  computed:{
    estadoActual(){
      let mensaje = "";
      !this.producto.eliminado ? mensaje = "Habilitado" : mensaje = "Deshabilitado";
      return mensaje;
    }
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
      let producto;
      if(this.producto){
        producto = {eliminado: eliminado}
      }
      return producto;
    }
  },
  async created(){
    await this.getProducto();
  }
};
</script>