<template>

  <NavBar></NavBar>

  <div class="container">
    <div class="row mb-4 text-dark" id="cards" >
      <div :key="u.id" v-for="u in usuariosData" class = "col-4 mt-4">
          <Usuario :usuario="u" />
      </div>
    </div>
  </div>

  <div class="container mt-4">
      <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center" id="paginator">
            <button :disabled="currentPage == 1" id="prev" class="page-item border border-2 mx-1" @click="prevPage"><i class="fa-solid fa-angle-left"></i></button>
            <button :disabled="usuariosData.length < perPage" id="next" class="page-item border border-2 mx-1" @click="nextPage"><i class="fa-solid fa-angle-right"></i></button>
          </ul>
      </nav>
  </div>
  
</template>

<script>
import axios from "axios";
import Usuario from "../components/Usuarios/Usuario.vue";
import NavBar from "../components/shared/Navbar.vue";

export default {
  name: "UsuariosX",
  data() {
    return {

      usuarios: [],
      perPage: 3,
      currentPage: 1,
     
      
    };
  },
  components: {
    Usuario, NavBar
  },

  computed:{
    usuariosData() {
      let data = [];
      this.usuarios.forEach(u =>{
        data.push(u)
      })
      data = data.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
      return data;
    },
  },

  methods: 
  { 
    async loadUsers(url = "https://62a389b85bd3609cee6be5d9.mockapi.io/Usuarios") {
      const response = await axios.get(url);
      this.usuarios = response.data;
    },

    prevPage(){
      this.currentPage--;
    },
    nextPage() {
      this.currentPage++;
    },
  },
  async created() { 
    await this.loadUsers();
  },
};
</script>