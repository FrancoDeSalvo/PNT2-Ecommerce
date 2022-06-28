<template>
  <section class="h-100" style="background-color: #eee;">
    <div class="container h-100 py-5">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-10">

          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-normal mb-0 text-black">Carrito de compras</h3>
          </div>

          <div :key="c.id" v-for="c in productosData" class="">
            <ItemCarrito :producto="c" />
          </div>

          <!-- PAGINATION -->
          <div class="container mt-4">
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center" id="paginator">
                <button :disabled="currentPage == 1" id="prev" class="page-item border border-2 mx-1" @click="prevPage"><i class="fa-solid fa-angle-left"></i></button>
                <button :disabled="productosData.length < perPage" id="next" class="page-item border border-2 mx-1" @click="nextPage"><i class="fa-solid fa-angle-right"></i></button>
              </ul>
            </nav>
        </div>

          <div class="card mb-4 text-center">
              
              <h4 class="fw-normal mb-0 text-black">Total $ {{this.total}}</h4>
              
              <div class="d-flex mt-2 mb-2 mx-2">
                <div class="save-btn">
                    <button  type="button" class="btn btn-success" @click=" finalizarCarrito()">Generar compra</button>
                  </div>
                <router-link to="/Carrito">
                  <button type="button" class="btn btn-danger" @click="vaciarCarrito()"> Vaciar Carrito </button>
                </router-link>
              </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div>
    <SavedModal v-show="showModal" @close-modal="showModal = false" />
  </div>

</template>

<script>
import ItemCarrito from "../components/ItemCarrito.vue";
import SavedModal from '../components/SavedModal.vue'
import axios from "axios";
export default {
  name: "CarritoProductos",
 
  data() {
    return {
      total: 0,
      items: [],
      productos :[],
      perPage: 5,
      currentPage: 1,
      showModal: false,
    };
  },
  props: {
    carrito: Object,
  },
  components: {
    ItemCarrito, 
    SavedModal,
  },
  computed:{
    productosData() {
      let data = this.items.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
      return data;
    },
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

    prevPage(){
      this.currentPage--;
    },
    nextPage() {
      this.currentPage++;
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
    },

    finalizarCarrito(){
      this.showModal = true
      this.vaciarCarrito()
    },
  },
  
  async created() { 
    await this.traerProductos();
    await this.calcularTotal();
    this.contarUnidades();
  },
};
</script>