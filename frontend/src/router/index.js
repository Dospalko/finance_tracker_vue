
import Login from "@/views/UserLogin.vue";
import Register from "@/views/UserRegister.vue";

import { createRouter, createWebHistory } from "vue-router";



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
  
    {
      path: "/login",
      name: "UserLogin",
      component: Login,
    },
    {
      path: "/register",
      name: "UserRegister",
      component: Register,
    },
    // ... define other routes
  ],
});

export default router;
