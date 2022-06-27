<template>
<section class="h-100" style="background-color: #eee;">
  <div class="container h-100 py-5">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-10">

        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-normal mb-0 text-black">Carrito de compras</h3>
        </div>

      <div :key="c.id" v-for="c in items" class="">
        <ItemCarrito :producto="c" />
      </div>

        <div class="card mb-4">
          <div class="card-body p-4 d-flex flex-row">
            <h4 class="fw-normal mb-0 text-black">Total $ {{this.total}}</h4>
            <button type="button" class="btn btn-outline-warning btn-lg ms-3">Comprar</button>
          </div>
        </div>

       

      </div>
    </div>
  </div>
</section>
<!-- <div class="container">
    <div class="row mb-4 text-dark" id="cards">
      <div :key="c.id" v-for="c in myVar" class="col-4 mt-4">
        <ItemCarrito :producto="c" />
      </div>
    </div>
  </div> -->
</template>

<script>
import ItemCarrito from "../components/ItemCarrito.vue";
export default {
  name: "CarritoProductos",
 
  data() {
    return {
       myVar: this.globalVar,
       total: 0,
       items: Array
    };
  },
  props: {
    
  },
  components: {
    ItemCarrito, 
  },
  methods: {
    contarUnidades(){
    let key = "id"
    let arr2 = [];
    
  this.myVar.forEach((x)=>{
     if(arr2.some((val)=>{ return val[key] == x[key] })){
       arr2.forEach((k)=>{
         if(k[key] === x[key]){ 
           k["occurrence"]++
           k.nombre = x.nombre
           k.img = x.img
           k.precio = x.precio
          k.precioTotal = x.precio * k.occurrence
         }
      })
         
     }else{
  
       let a = {}
       a[key] = x[key]
       a.nombre = x.nombre
        a.img = x.img
       a.precio = x.precio
      //  a.precioTotal = x.precioTotal
       a["occurrence"] = 1
       arr2.push(a);
     }
  })

    arr2.forEach(element => {
      console.log(element)
    });
    this.items = arr2

    },


    calcularTotal(){
      this.myVar.forEach( p => {
        this.total += p.precio
      });
    }
  },
  created() { 
    this.calcularTotal();
    this.contarUnidades();
  },
};
</script>