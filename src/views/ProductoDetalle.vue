<template>

  <NavBar></NavBar>

  <div class="d-flex justify-content-center">
    <div class="text-center mt-3">
      <h3 class="fw-normal mb-0 text-primary border border-3 border-primary rounded-pill px-3 py-1">
        {{ producto.nombre }}
      </h3>
    </div>
  </div>

  <div class="container mt-3">
    <div class="row">

      <div class="col-6 text-center" >
        <img :src= "producto.img" class="img-fluid" alt="Responsive image" style="width: auto; height: 300px"/>
      </div>

      <div class="col-6">
        <h5 class="text-secondary">Precio</h5>
        <p class="card-text">${{producto.precio}}</p>

        <h5 class="text-secondary">Estado</h5>
        <p class="card-text">{{this.disponible}}</p>

        <h5 class="text-secondary">Stock</h5>
        <p class="card-text">{{producto.stock}}</p>

        <h5 class="text-secondary mt-3">Descripcion</h5>
        <p class="card-text">{{producto.descripcion}}</p>

        <div class="d-flex justify-content-center mt-4">
          <button class="btn btn-outline-success" type="button" @click="addtoCart">
            Agregar al Carrito <i class="fa-solid fa-cart-shopping"></i>
          </button>

          <!-- ADMIN -->
          <router-link :to=urlModificar class="mx-2" v-if="admin == 2">
            <button class="btn btn-outline-warning" type="button">
                Modificar <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </router-link>  

          <router-link :to=urlHabilitacion v-if="admin == 2" class="me-2">
            <button class="btn btn-outline-primary" type="button">
              Habilitar <i class="fa-solid fa-check"></i> |
              Deshabilitar <i class="fa-solid fa-trash-can"></i>
            </button>
          </router-link>
          <!-------------------------->  
        </div>
      </div>

    </div>
  </div>
  
  <div class="container text-center pb-4 mt-4">
    <router-link :to=urlProductos>
      <button type="button" class="btn btn-secondary"><i class="fas fa-arrow-left"></i></button>
    </router-link>
  </div>

</template>

<script>
import axios from "axios";
import NavBar from "../components/shared/Navbar.vue";

export default {
  name: "ProductoDetalle",
  data() {
    return {
      id: this.$route.params.id,
      producto: Object,
      disponible: "Disponible",
      productos: [],
      admin: localStorage.logged,
      urlModificar: `/EditarProducto/${this.$route.params.id}`,
      urlHabilitacion: `/HabilitacionProducto/${this.$route.params.id}`,
      urlProductos: "",
    };
  },
  components:{
    NavBar
  },
  methods: {
    async loadProducto() {
      const response = await axios.get(`https://62a389b85bd3609cee6be5d9.mockapi.io/Productos/${this.id}`);
      this.producto = response.data;
      this.disponibilidad()
    },
    async getCategoria(){
      const response = await axios.get(`https://62a389b85bd3609cee6be5d9.mockapi.io/Categorias`)
      const categorias = response.data;
      const {nombre} = categorias.find(x => x.idCategoria === this.producto.categoria)
      this.urlProductos = `/Productos/${nombre}`;
    },
    async getCarrito(){
      const response = await axios.get(`https://62a389b85bd3609cee6be5d9.mockapi.io/Carritos/${localStorage.userLogged}`)
      const {productos} = response.data;
      this.productos = productos;
    },
    async addtoCart(){
      const p = [... this.productos]
      p.push(this.producto)
      const carrito = {idUsuario: localStorage.userLogged, productos: p}
      await axios.put(`https://62a389b85bd3609cee6be5d9.mockapi.io/Carritos/${localStorage.userLogged}`, carrito)
      this.$router.push({name: "Carrito"});
    },
    async disponibilidad(){
      if(this.producto.eliminado){
        this.disponible = "No disponible";
      }
    },
  },
  async created() {
    await this.loadProducto();
    await this.getCarrito();
    await this.getCategoria();
  },
};

</script>