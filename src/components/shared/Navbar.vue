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

      <div class="d-flex">
        <router-link class="link active me-2" to="/Login">
          <input class="btn btn-outline-primary" type="submit" value="Ingresar" />
        </router-link>

        <router-link class="link active me-2" to="/Registro">
          <input class="btn btn-outline-secondary" type="submit" value="Registrarse" />
        </router-link>
      </div>

      <div class="d-flex">
        <!--<p class="text-white d-flex me-2">Hola! {{userLogueadoNombre}}</p>-->
        <router-link class="link active me-2" to="/"> 
          <input class="btn btn-outline-danger" type="submit" value="Salir" @click="salir()"/>
        </router-link>
      </div>
      <div class="d-flex">
        <!--<p class="text-white d-flex me-2">Hola! {{userLogueadoNombre}}</p>-->
        <router-link class="link active me-2" to="/Usuarios"> 
          <input class="btn btn-outline-warning" type="submit" value="Administrar usuarios" >
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
      //url: `/Editar/${this.usuario.id}`,
      logged: localStorage.logged,
      dataBusqueda:"",
    };
  },

  props:{
    usuario:Object,
  },
  computed:{
    userLogueadoNombre(){
      let x;
      if(localStorage.userLogged){
        x = localStorage.userLogged
      }
      return x;
    },
    logeado(){
      let ok = false;
      // localStorage.logged = 1;
      if(localStorage.logged != 0){
        ok = true ;
      }
      return ok;
    },
  },
  methods: {
    busqueda() {
      if (!this.dataBusqueda) {
        this.$router.push({name: "Home",});
      }        
      this.$router.push({name: "Busqueda",params: { nombre: this.dataBusqueda }});
    },
    salir(){
      localStorage.logged = 0
    }
  },
  created() {
    console.log("logged (navbar)", this.logeado);
    console.log("localstorage (navbar)", localStorage.logged);
  },
};
</script>