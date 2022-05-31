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



        <select class="me-2" name="select">
          <option value="selectEstado" selected>-- Categoria --</option>
          <option value="Heladeras">Heladeras</option>
          <option value="Hardware">Hardware</option>
          <option value="PC">PC</option>
          <option value="Lavarropas">Lavarropas</option>
          <option value="Microondas">Microondas</option>
          <option value="Televisores">Televisores</option>
          <option value="Celulares">Celulares</option>
        </select>

        <input class="form-control me-2" type="search" placeholder="Buscas algun producto?" aria-label="Search">

        <button class="btn btn-outline-success" type="submit">Buscar</button>
          
      </form>

        <li class="nav-item">
            <router-link class="nav-link active" to="/login" :disabled="logeado()">Ingresar</router-link>
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