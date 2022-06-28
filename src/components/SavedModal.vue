<template>
  <transition name="modal-fade">
    <div class="modal-overlay" @click="$emit('close-modal')">
      
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 v-show= "!vacio"  class="modal-title">Carrito Confirmado</h5>
        <h5 v-show= "vacio" class="modal-title">Carrito Vacio</h5>
        <button v-show= "vacio" type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div v-show= "!vacio" class="modal-body">
        <img class="check" src="../assets/succses.png" alt="" />
        <p>Gracias por elegirnos</p>
      </div>

      <div v-show= "vacio" class="modal-body">
        <img class="check" src="../assets/carrito.png" alt="" />
        <p> Añada productos al carrito </p>
      </div>

      <div v-show= "!vacio" class="modal-footer">
        <router-link to="/" class="mx-2">
                  <button v-show= "!vacio" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </router-link>
  
      </div>
      
    </div>
  </div>
</div>
  </transition>
</template>

<script>
export default {

  data() {
    return {
    
    };
  },
  props: {
    vacio: Boolean,
  },
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: white;
  height: 500px;
  width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
}
.check {
  width: 150px;
  justify-content: center;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>