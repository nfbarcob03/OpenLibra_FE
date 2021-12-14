import Vue from "vue";
import VueRouter from 'vue-router'


import CrearLibro from "./components/CrearLibro.vue";
import ListLibros from "./components/ListLibros.vue";
    
Vue.use(VueRouter)

const routes = [
    {
    path: "/CrearLibro",
    name: "CrearLibro",
    component: CrearLibro
    },
    {
    path: "/",
    name: "ListLibros",
    component: ListLibros
    },
  ];

  const router = new VueRouter({
  mode: "history",
  routes
});

export default router;