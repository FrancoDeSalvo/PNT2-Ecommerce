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

      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Buscas algun producto?" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Buscar</button>
      </form>

      <li class="nav-item d-flex">
        <router-link class="nav-link active" to="/login" :disabled="logeado()">
          <button class="btn btn-outline-primary" type="submit">Ingresar</button>
        </router-link>
      </li>

    </div>
  </nav>

</template>

<script>
export default {
  name: "NavBar",
  methods: {
    logeado(){
      let x = false
       if(localStorage.logged != 0 && localStorage.logged){
      x = true
      }
      return x;
    }
    
  }
};
</script>