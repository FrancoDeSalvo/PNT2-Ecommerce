<template>

<div class="card rounded-3 mb-4">
          <div class="card-body p-4">
            <div class="row d-flex justify-content-between align-items-center">
              <div class="col-md-2 col-lg-2 col-xl-2">
                <img
                  :src="producto.img"
                  class="img-fluid rounded-3" >
              </div>
              <div class="col-md-3 col-lg-3 col-xl-3">
                <p class="lead fw-normal mb-2">{{producto.nombre}}</p>
              </div>
              <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                <!-- <button class="btn btn-link px-2"
                  onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                  <i class="fas fa-minus"></i>
                </button>

                <input id="form1" min="0" name="quantity" value="1" type="number"
                  class="form-control form-control-sm" />

                <button class="btn btn-link px-2"
                  onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                  <i class="fas fa-plus"></i>
                </button> -->
                <p class="lead fw-normal mb-2">{{producto.occurrence}}</p>
              </div>
              <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 class="mb-0">$ {{producto.precio}}  {{producto.precioTotal}} </h5>
              </div> 
              
              <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
              </div>
            </div>
          </div>
        </div>


 

 <!-- <div class="row justify-content-center">
    <div class="card text-center" style="width: 18rem;">

        <img :src= "producto.img" class="card-img-top" alt="Responsive image" style="width: 70%"/>
        <h5 class="card-title"> {{producto.nombre}}</h5>
      <div class="card-body">
        <p class="card-text">Precio: ${{producto.precio}}</p>
    
      </div>
    </div>          
  </div> -->

</template> 


<script>

export default {
  name: "ItemCarrito",
  data() {
    return {
    };
  },
  props: {
    producto: Object,
  },
  methods:{
  },
  created(){
 
  }
};
</script>