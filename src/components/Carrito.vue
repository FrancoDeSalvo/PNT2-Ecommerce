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

          <div class="card mb-4 text-center">
            <!-- <div class="card-body p-4 d-flex flex-row justify-content-center"> -->

              <!--<button type="button" class="btn btn-outline-warning btn-lg ms-3">Comprar</button>
              <button type="button" class="btn btn-success" data-toggle="modal" data-target="#modal1"> Generar compra </button>-->
              
              <h4 class="fw-normal mb-0 text-black">Total $ {{this.total}}</h4>
              
              <div class="d-flex mt-2 mb-2 mx-2">
                <router-link to="/" class="mx-2">
                  <button type="button" class="btn btn-success" data-toggle="modal" data-target="#modal1" @click="vaciarCarrito()"> Generar compra </button>
                </router-link>

                <button type="button" class="btn btn-danger" @click="vaciarCarrito()"> Vaciar Carrito </button>
              </div>

            <!-- </div> -->
          </div>

          <!-- Modal -->
          <!-- <div class="modal fade" id="modal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  ...
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div> -->

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
import axios from "axios";
export default {
  name: "CarritoProductos",
 
  data() {
    return {
       total: 0,
       items: [],
       productos :[]
    };
  },
  props: {
    carrito: Object,
  },
  components: {
    ItemCarrito, 
  },
  methods: {
    async vaciarCarrito(){
      this.productos =[]
      const carrito = {idUsuario: localStorage.userLogged, productos: []}
      await axios.put(`https://62a389b85bd3609cee6be5d9.mockapi.io/Carritos/${localStorage.userLogged}`, carrito)
    },

    async traerProductos(){
      const response = await axios.get(`https://62a389b85bd3609cee6be5d9.mockapi.io/Carritos/${localStorage.userLogged}`)
      const {productos} = response.data
    this.productos = productos
    },
    
    contarUnidades(){
      let key = "id"
      let arr2 = [];

      this.productos.forEach((x)=>{
        if(arr2.some((val)=>{ return val[key] == x[key] })){
          arr2.forEach((k)=>{
            if(k[key] === x[key]){ 
              k["occurrence"]++
              k.nombre = x.nombre
              k.img = x.img
              k.precio = x.precio
              k.precioTotal = x.precio * k.occurrence
        }})
        }
        else{
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

    async calcularTotal(){
      this.productos.forEach( p => {
        this.total += p.precio
      });
    }
  },
  async created() { 
    await this.traerProductos();
    await this.calcularTotal();
    this.contarUnidades();
  },
};
</script>