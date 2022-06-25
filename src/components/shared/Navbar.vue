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

      <form class="d-flex me-2">
        <input class="form-control me-2" type="search" placeholder="Buscas algun producto?" aria-label="Search"  v-model="form.nombre">
          <input class="btn btn-outline-success " type="submit" value="Buscar" />
      </form>
  
      <div>
        <div v-if=logged>
          <div class="d-flex">
            <router-link class="link active me-2" to="/login">
              <input class="btn btn-outline-primary" type="submit" value="Ingresar" v-on="logeado()"/>
            </router-link>

            <router-link class="link active me-2" to="/registro">
              <input class="btn btn-outline-primary" type="submit" value="Registrarse" />
            </router-link>
          </div>
        </div>

        <div v-else>
          <div class="d-flex">
            <router-link class="link active me-2" to="/">
              <input class="btn btn-outline-danger" type="submit" value="Salir" v-on="salir()"/>
            </router-link>
          </div>
        </div>
      </div>

    </div>                                
  </nav>

</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      logged: false,
      form:{
        nombre: null
      }
    };
  },
  methods: {
    loadNavBar(){
      this.logeado()
    },
    logeado(){
      if(localStorage.logged !== 0){
        this.logged = true;
      
      }
      console.log("logged (navbar)", this.logged);

    },
    salir(){
      localStorage.logged === 0
    }
  },
  created() {
    this.loadNavBar();
    console.log("logged (navbar)", !this.logged);
  },
};
</script>