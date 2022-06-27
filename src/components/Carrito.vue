<template>
<!-- <section class="h-100" style="background-color: #eee;">
  <div class="container h-100 py-5">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-10">

        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-normal mb-0 text-black">Carrito de compras</h3>
        </div>

      <div :key="p.id" v-for="p in productosData" class = "col-4 mt-4">
          <ItemCarrito :itemCarrito="p" />
       

        <div class="card mb-4">
          <div class="card-body p-4 d-flex flex-row">
            <div class="form-outline flex-fill">
              <input type="text" id="form1" class="form-control form-control-lg" />
              <label class="form-label" for="form1">Discound code</label>
            </div>
            <button type="button" class="btn btn-outline-warning btn-lg ms-3">Apply</button>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <button type="button" class="btn btn-warning btn-block btn-lg" @click="mostrarProductos">Proceed to Pay</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</section> -->
<div class="container">
    <div class="row mb-4 text-dark" id="cards">
      <div :key="c.id" v-for="c in myVar" class="col-4 mt-4">
        <ItemCarrito :producto="c" />
      </div>
    </div>
  </div>
</template>

<script>
import ItemCarrito from "../components/ItemCarrito.vue";
export default {
  name: "CarritoProductos",
 
  data() {
    return {
       myVar: this.globalVar,
    };
  },
  props: {
    
  },
  components: {
    ItemCarrito, 
  },
  methods: {
    mostrarProductos(){
      this.myVar.forEach( p => {
        console.log(p)
      });
    }
  }
};
</script>