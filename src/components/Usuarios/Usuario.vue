<template>
  <div class="row justify-content-center">
    <div class="card text-center" style="width: 18rem;">
      <router-link :to="urlDetalleUsuario">
       
        <img src= "https://thumbs.dreamstime.com/b/icono-de-la-persona-en-el-fondo-blanco-111394209.jpg" class="card-img-top" alt="Responsive image" style="width: 70%"/>
        <h5 class="card-title"> {{usuario.nombreUsuario}}</h5>
      </router-link>
      <div class="card-body">
        <p class="card-text">Nombre: {{usuario.nombre}}</p>
        <p class="card-text">Apellido: {{usuario.apellido}}</p>
        <p class="card-text">Dni: {{usuario.dni}}</p>
        <p class="card-text">Admin: {{usuario.admin}}</p>
        
        <router-link :to="urlEditar">
       <button type="button" class="btn btn-warning" > Editar usuario </button>
        </router-link>
        
        <router-link :to="urlEliminar">
        <button type="button" class="btn btn-danger" > Eliminar usuario </button>
        </router-link>
      </div>
    </div> 

    <div>

    </div>         
  </div>
</template>

<script>

export default {
  name: "UsuarioX",
  data() {
    return {
      url: `/Usuario/${this.usuario.id}`,
      urlEliminar:`/Eliminar/${this.usuario.id}`,
      urlEditar:`/Editar/${this.usuario.id}`,
      urlDetalleUsuario:`/UsuarioDetalle/${this.usuario.id}`
      
    };
  },
  props: {
    usuario: Object,
  },
  methods:{
    
  },
  created(){
    
  }
};
</script>