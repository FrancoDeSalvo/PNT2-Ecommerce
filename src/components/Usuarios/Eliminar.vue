<template>
    
         <input class="btn btn-danger" type="submit" value="BORRAR USUARIO " @click="eliminarUsuario()"/>

</template>


<script>
import axios from "axios";
export default {
  name: "EliminarX",
  data() {
    return {
    id: this.$route.params.id,
    };
  },
   props: {
    usuario: Object,

  },
  methods: { 
    async eliminarUsuario(){
        console.log(this.id)
    await axios.delete(`https://62a389b85bd3609cee6be5d9.mockapi.io/Usuarios/${this.id}`);
    await axios.delete(`https://62a389b85bd3609cee6be5d9.mockapi.io/Carritos/${this.id}`);
    
     }
    },
   async created(){
        
    }
  

};
</script>