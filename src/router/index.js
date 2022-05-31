import {createRouter, createWebHistory} from 'vue-router';
import HelloWorld from "../components/HelloWorld.vue";
import ProductoDetalle from "../components/ProductoDetalle.vue";
import Carrito from "../components/Carrito.vue";
import Login from "../components/Login.vue"

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
        name: 'HelloWorld',
        component: HelloWorld,
        beforeEnter: [logged]
    },
    {
        path: '/Carrito',
        name: 'Carrito',
        component: Carrito
    },
    {
        path: '/ProductoDetalle/:id', 
        name: 'ProductoDetalle',
        component: ProductoDetalle
    },
    {
        path: '/Login', 
        name: 'Login',
        component: Login
    }
];

const router = createRouter({
    history: createWebHistory(''),
    routes,
});

export default router;