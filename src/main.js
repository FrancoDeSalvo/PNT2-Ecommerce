import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

// const myGlobalVariable = { 
//     data(){
//         return {
//             array: Array
//         }
//     }
// }

const app = createApp(App)
app.config.globalProperties.globalVar = []
// app.provide('myGlobalVariable', globalVariable)
// app.mixin()
app.use(router).mount('#app')