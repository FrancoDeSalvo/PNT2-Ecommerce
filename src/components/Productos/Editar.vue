<template>
  <section class="d-flex justify-content-center mt-4 text-info">
    <div class="card col-sm-6 p-3">

      <div class="mb-3">
        <h4>Editar Producto</h4>
      </div>

    <div>
        <h4 class="text-black">Producto a editar: {{producto.nombre}}</h4>
    </div>

      <div class="mb-2">
        <form v-on:submit.prevent="editarProducto">
          <div class="mb-2">
            <label for="nombre">Nombre del producto</label>
            <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Ingrese nombre" v-model="form.nombre"/>
          </div>
          <div class="mb-2">
            <label for="descripcion">Descripcion</label>
            <input type="descripcion" class="form-control" name="descripcion" id="descripcion" placeholder="Ingrese descripcion" required v-model="form.descripcion"/>
          </div>
          <div class="mb-2">
            <label for="stock">Stock</label>
            <input type="text" class="form-control" name="stock" id="stock" placeholder="Ingrese stock" v-model="form.stock"/>
          </div>
          <div class="mb-2">
            <label for="precio">Precio</label>
            <input type="text" class="form-control" name="precio" id="precio" placeholder="Ingrese precio" v-model="form.precio"/>
          </div>
          <div class="mb-2">
            <label for="categoria">Categoria</label>
            <input type="text" class="form-control" name="categoria" id="categoria" placeholder="Ingrese categoria" v-model="form.categoria"/>
          </div>
          <div class="mb-2">
            <label for="img">Imagen</label>
            <input type="text" class="form-control" name="img" id="img" placeholder="Ingrese imagen" v-model="form.img"/>
          </div>
          <div class="mb-2">
            <label for="marca">Marca</label>
            <input type="text" class="form-control" name="marca" id="marca" placeholder="Ingrese marca" v-model="form.marca"/>
          </div>

          <div class="d-block mt-4 text-center">   
            <button class="btn btn-success text-white" type="submit">Editar</button>
          </div>
 
        </form>
      </div>
    <!-- </div> -->

    </div>
  </section>

  <div class="container text-center mb-4 mt-4">
    <router-link to="/">Home</router-link>
  </div>

</template>


<script>
import axios from "axios";
export default {
  name: "EditarProducto",
  data() {
    return {
        form: {
            nombre: null,
            stock: null,
            descripcion: null,
            precio: null,
            eliminado: false,
            marca: null,
            categoria: null,
            img: null
        },
        producto: Object,
        id: this.$route.params.id,
    };
  },
  props: {},
  methods: { 
    async editarProducto(){
        const encontrado = await this.getProducto();
        if(encontrado){
            this.form.nombre == null ? this.form.nombre = encontrado.nombre : console.log(this.form.nombre);
            this.form.img == null ? this.form.img = encontrado.img : console.log(this.form.img);
            this.form.categoria == null ? this.form.categoria = encontrado.categoria : console.log(this.form.categoria);
            this.form.stock == null ? this.form.stock = encontrado.stock : console.log(this.form.stock);
            this.form.precio == null ? this.form.precio = encontrado.precio : console.log(this.form.precio);
            this.form.descripcion == null ? this.form.descripcion = encontrado.descripcion : console.log(this.form.descripcion);
            this.form.marca == null ? this.form.marca = encontrado.marca : console.log(this.form.marca);

            const nuevoProducto = this.productoTemplate()
            await axios.put(`https://62a389b85bd3609cee6be5d9.mockapi.io/Productos/${encontrado.id}`, nuevoProducto);
            alert("Producto editado con exito")
            this.$router.push({name: "ProductoDetalle"});
        }
        else{
            alert("No se pudo editar el producto")
        }
    },
    async getProducto(){
      const response = await axios.get(`https://62a389b85bd3609cee6be5d9.mockapi.io/Productos/${this.id}`); 
      this.producto = response.data; 
      return this.producto;
    },
    productoTemplate(){
      const producto = { 
        nombre: this.form.nombre, 
        img: this.form.img, 
        categoria: this.form.categoria,
        stock: this.form.stock,
        marca: this.form.marca,
        precio: this.form.precio,
        descripcion: this.form.descripcion,
        eliminado: false
      }
      return producto;
    }
    },
    async created(){
        await this.getProducto();
    }
};
</script>