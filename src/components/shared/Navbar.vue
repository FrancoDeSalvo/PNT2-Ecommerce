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
            <router-link class="nav-link active" to="/Carrito">
              Carrito <i class="fa-solid fa-cart-shopping"></i>
            </router-link>
          </li>

        </ul>
      </div>

      <form class="d-flex me-2" v-on:submit.prevent>
        <input class="form-control me-2" type="search" placeholder="Buscas algun producto?" aria-label="Search"  
          v-model="dataBusqueda" @keyup="busqueda">
      </form>

      <div class="d-flex" v-if="logged == 0">
        <router-link class="link active me-2" to="/Login">
          <input class="btn btn-outline-primary" type="submit" value="Ingresar" />
        </router-link>
        <router-link class="link active me-2" to="/Registro">
          <input class="btn btn-outline-secondary" type="submit" value="Registrarse" />
        </router-link>
      </div>

      <div class="d-flex" v-else>
        <router-link class="link active me-2" to="/AdministrarUsuarios" v-if="logged == 2"> 
          <button class="btn btn-outline-warning" type="submit" value="Usuarios">
            Usuarios <i class="fa-solid fa-users"></i>
          </button>
        </router-link>
        <router-link class="link active me-2" :to="urlMiCuenta"> 
          <button class="btn btn-outline-warning" type="submit" value="Mi Cuenta">
            {{userLogueadoNombre}} <i class="fa-solid fa-user"></i>
          </button>
        </router-link>
        <router-link class="link active me-2" to="/Login"> 
          <input class="btn btn-outline-danger" type="submit" value="Salir" @click="salir()"/>
        </router-link>
      </div>

    </div>                                
  </nav>

</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      urlMiCuenta: `/MiCuenta/${localStorage.userLogged}`,
      logged: localStorage.logged,
      dataBusqueda:"",
    };
  },
  computed:{
    userLogueadoNombre(){
      let x;
      if(localStorage.userLogged){
        x = localStorage.userLoggedName
      }
      return x;
    },
    // logeado(){
    //   let ok = false;
    //   if(localStorage.logged != 0){
    //     ok = true ;
    //   }
    //   return ok;
    // },
  },
  methods: {
    busqueda() {
      if (!this.dataBusqueda) {
        this.$router.push({name: "Home"});
      }        
      this.$router.push({name: "Busqueda", params: { nombre: this.dataBusqueda }});
    },
    salir(){
      localStorage.logged = 0
    }
  },
};
</script>