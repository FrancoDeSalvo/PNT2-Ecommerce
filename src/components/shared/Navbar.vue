<template>

  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">

      <router-link class="navbar-brand" to="/">Market</router-link>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">

          <li class="nav-item">
            <router-link class="nav-link active" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Carrito">Carrito</router-link>
          </li>

        </ul>
      </div>

      <form v-on:submit.prevent="onSubmit" class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Buscas algun producto?" aria-label="Search"  v-model="form.nombre">
        <!-- <router-link :to="url"> -->
          <input class="btn btn-outline-success" type="submit" value="Buscar" />
        <!-- </router-link> -->
      </form>
  
    
      <li class="nav-item d-flex">
        <router-link class="nav-link active" to="/login">
          <input class="btn btn-outline-primary" type="submit" value="Ingresar" />
        </router-link>
      </li>
    
    
      <li class="nav-item d-flex">
        <router-link class="nav-link active" to="/registro">
          <input class="btn btn-outline-primary" type="submit" value="Registrarse" />
        </router-link>
      </li>


  </div>                                
  </nav>

</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      url: "/Busqueda/",
      form:{
        nombre: null
      }
    };
  },
  methods: {
    logeado(){
      let x = false
       if(localStorage.logged != 0 && localStorage.logged){
      x = true
      }
      return x;
    },
    onSubmit(){
      localStorage.productoABuscar = this.form.nombre;
      // console.log("Soy el localstorage de productoAbUSCAR", localStorage.productoABuscar);
    }
  }
};
</script>