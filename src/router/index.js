import {createRouter, createWebHistory} from 'vue-router';
import HelloWorld from "../components/HelloWorld.vue";
import ProductoDetalle from "../components/ProductoDetalle.vue";
import Carrito from "../components/Carrito.vue";

const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
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
    }
];

const router = createRouter({
    history: createWebHistory(''),
    routes,
});

export default router;