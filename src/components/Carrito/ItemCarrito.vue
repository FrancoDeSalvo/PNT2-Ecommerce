<template>

<div class="card rounded-3 mb-4">
  <div class="card-body p-4">
    <div class="row d-flex justify-content-between align-items-center">
      <div class="col-md-2 col-lg-2 col-xl-2">
        <img
          :src="producto.img"
          class="img-fluid rounded-3" >
      </div>
      <div class="col-md-3 col-lg-3 col-xl-3">
        <p class="lead fw-normal mb-2">{{producto.nombre}}</p>
      </div>
      <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
        <p class="lead fw-normal mb-2">Cantidad: {{producto.occurrence}}</p>
      </div>

      <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">

        <div class="d-flex">
          <div class="me-3">
            <button type="button" class="btn btn-success" @click="agregarProducto()">+</button>
          </div>
          <div>
            <button type="button" class="btn btn-danger" @click="eliminarProducto()">-</button>
          </div>
        </div>
        <div class="mt-2 mb-2">
          <h5 class="mb-0">${{producto.precio}}  ${{producto.precioTotal}} </h5>
        </div>
        <router-link class="link active" :to= url>Volver al detalle del producto</router-link>
      </div>


    </div>
  </div>
</div>

</template> 


<script>
import axios from "axios";
export default {
  name: "ItemCarrito",
  data() {
    return {
       url: `/ProductoDetalle/${this.producto.id}`,
       productos:[]
    };
  },
  props: {
    producto: Object,
    carrito :Object,
  },
  methods:{
    async traerProductos(){
      const response = await axios.get(`https://62a389b85bd3609cee6be5d9.mockapi.io/Carritos/${localStorage.userLogged}`)
      const {productos} = response.data
      this.productos = productos
    },

    async agregarProducto(){
      this.productos.push(this.producto)
      const carrito = {idUsuario: localStorage.userLogged, productos: this.productos}
      await axios.put(`https://62a389b85bd3609cee6be5d9.mockapi.io/Carritos/${localStorage.userLogged}`, carrito)
    },

    async eliminarProducto(){
      this.productos.pop(this.producto)
      const carrito = {idUsuario: localStorage.userLogged, productos: this.productos}
      await axios.put(`https://62a389b85bd3609cee6be5d9.mockapi.io/Carritos/${localStorage.userLogged}`, carrito)
    }
  },
  async created(){
    await this.traerProductos()
  }
};
</script>