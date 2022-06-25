import {createRouter, createWebHistory} from 'vue-router';
import Home from "../views/Home.vue";
import ProductoDetalle from "../views/ProductoDetalle.vue";
import Carrito from "../components/Carrito.vue";
import Productos from "../views/Productos.vue";
import Login from "../components/Login.vue"
import Registro from "../components/Registro.vue"
import Busqueda from "../views/Busqueda.vue"

const logged = () => {
    console.log("estoy acaaa")
    console.log(localStorage.logged)
    if (localStorage.logged == 0 || !localStorage.logged) {

        return { path: '/Login', name: 'Login', component: Login }
    }
}

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
    }
];

const router = createRouter({
    history: createWebHistory(''),
    routes,
});

export default router;