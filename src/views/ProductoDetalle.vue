<template>

  <div class="text-center">
      <h3 class="d-block text-white bg-secondary row rounded pt-2 pb-2">{{ producto.nombre }}</h3>
  </div>

  <div class="container mt-3">
    <div class="row">

      <!-- <div class="col-6 text-center border border-3"> -->
      <div class="col-6 text-center mt-5">
        <img :src= "producto.img" class="card-img-top img-fluid w-50" alt="Responsive image" />
      </div>

      <!-- <div class="col-6 border border-3 text-center"> -->
      <div class="col-6">
        <h5 class="text-secondary">Precio</h5>
        <p class="card-text">${{producto.precio}}</p>

        <h5 class="text-secondary">Estado</h5>
        <p class="card-text">{{this.disponible}}</p>

        <h5 class="text-secondary">Stock</h5>
        <p class="card-text">{{producto.stock}}</p>

        <h5 class="text-secondary mt-3">Descripcion</h5>
        <p class="card-text">{{producto.descripcion}}</p>

        <div class="text-center mt-4">
              <button class="btn btn-outline-success" type="button" @click="addtoCart">Agregar al Carrito</button>
        </div>

      </div>
    </div>
  </div>

  <div class="container text-center mb-4 mt-5">
    <router-link to="/">Home</router-link>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "ProductoDetalle",
  data() {
    return {
      id: this.$route.params.id,
      producto: Object,
      disponible: "Disponible",
      myVar: this.globalVar,
    };
  },
  methods: {
    async loadProducto() {
      const response = await axios.get(`https://62a389b85bd3609cee6be5d9.mockapi.io/Productos/${this.id}`);
      this.producto = response.data;
      this.disponibilidad()
    },
    async disponibilidad(){
      if(this.producto.disponible){
        this.disponible = "No disponible";
      }
    },
    addtoCart(){
       localStorage.cart = [this.producto.id]
      // console.log(localStorage.cart)

      // var array = [this.producto.id]

      // localStorage.setItem('carrito', JSON.stringify(array));
    // if(localStorage.carrito == null){
    //    var a = JSON.parse(localStorage.getItem('carrito'));
    //    console.log(a)
    // }else{
    //   console.log("no entro")
    //   localStorage.cart = [this.producto.id]
    // }


  
   this.myVar.push(this.producto)
  console.log(this.myVar)

    //  console.log("---")
    // console.log($myGlobalVariable)

    //  a.push(this.producto.id)

    //   localStorage.setItem('cart', JSON.stringify(p));
    //   var a = JSON.parse(localStorage.getItem('productos'));
    //   console.log(a)

    //   a.push[datosDeCadaEquipoRecuperado];
    //   localStorage.setItem('myArray', JSON.stringify(a));
    }
  },
  created() {
    this.loadProducto();
  },
};
</script>