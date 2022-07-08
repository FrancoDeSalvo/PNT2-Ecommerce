import {createRouter, createWebHistory} from 'vue-router';
import Home from "../views/Home.vue";
import Busqueda from "../views/Busqueda.vue"
import Carrito from "../views/Carrito.vue";
import Login from "../components/Usuarios/Login.vue"
import Registro from "../components/Usuarios/Registro.vue"

//-- CATEGORIA --
import AgregarCategoria from "../components/Categorias/AgregarCategoria.vue"
import EliminarCategoria from "../components/Categorias/EliminarCategoria.vue"

//-- PRODUCTOS --
import Productos from "../views/Productos.vue";
import Agregar from "../components/Productos/Agregar.vue"
import Editar from "../components/Productos/Editar.vue"
import Habilitacion from "../components/Productos/Habilitacion.vue"
import ProductoDetalle from "../views/ProductoDetalle.vue";

//-- USUARIOS --
import AdministrarUsuarios from "../views/Usuarios.vue"
import EliminarUsuario from "../components/Usuarios/Eliminar.vue"
import EditarUsuario from "../components/Usuarios/Editar.vue"
import UsuarioDetalle from "../views/UsuarioDetalle.vue"

//-------------------------------------------------------------------------------------
const logged = () => {
    // console.log("index.js localStorage.logged user", localStorage.logged)
    if (localStorage.logged == 0 || !localStorage.logged) {
        return { path: '/Login', name: 'Login', component: Login }
    }
}

const admin = () => {
    // console.log("index.js localStorage.logged admin", localStorage.logged)
    if (localStorage.logged == 2) {
        return true
    }
    else{
        return { path: '/Login', name: 'Login', component: Login }
    }
}

//-------------------------------------------------------------------------------------
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/Carrito',
        name: 'Carrito',
        component: Carrito,
        beforeEnter: [logged]
    },
    {
        path: '/ProductoDetalle/:id', 
        name: 'ProductoDetalle',
        component: ProductoDetalle,
        beforeEnter: [logged]
    },
    {
        path: '/Login', 
        name: 'Login',
        component: Login
    },
    {
        path: '/Productos/:categoria', 
        name: 'Productos',
        component: Productos
    },
    {
        path: '/Registro', 
        name: 'Registro',
        component: Registro
    },
    {
        path: '/Busqueda/:nombre', 
        name: 'Busqueda',
        component: Busqueda,
    },
    {
        path: '/AgregarCategoria', 
        name: 'AgregarCategoria',
        component: AgregarCategoria,
        beforeEnter: [admin]
    },
    {
        path: '/EliminarCategoria', 
        name: 'EliminarCategoria',
        component: EliminarCategoria,
        beforeEnter: [admin]
    },
    {
        path: '/AgregarProducto/:categoria', 
        name: 'AgregarProducto',
        component: Agregar,
        beforeEnter: [admin]
    },
    {
        path: '/EditarProducto/:id', 
        name: 'EditarProducto',
        component: Editar,
        beforeEnter: [admin]
    },
    {
        path: '/HabilitacionProducto/:id', 
        name: 'HabilitacionProducto',
        component: Habilitacion,
        beforeEnter: [admin]
    },
    {
        path: '/AdministrarUsuarios', 
        name: 'AdministrarUsuarios',
        component: AdministrarUsuarios,
        beforeEnter: [admin]
    },
    {
        path: '/EditarUsuario/:id',
        name: 'EditarUsuario',
        component: EditarUsuario,
        beforeEnter: [logged]
    },
    {
        path: '/EliminarUsuario/:id',
        name: 'EliminarUsuario',
        component: EliminarUsuario,
        beforeEnter: [admin]
    },
    {
        path: '/UsuarioDetalle/:id', 
        name: 'UsuarioDetalle',
        component: UsuarioDetalle,
        beforeEnter: [logged]
    },
    {
        path: '/MiCuenta/:id', 
        name: 'MiCuenta',
        component: UsuarioDetalle,
        beforeEnter: [logged]
    },
];

//-------------------------------------------------------------------------------------
const router = createRouter({
    history: createWebHistory(''),
    routes,
});

export default router;