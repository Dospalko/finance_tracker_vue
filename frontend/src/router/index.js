
import Login from "@/views/UserLogin.vue";
import Register from "@/views/UserRegister.vue";
import HomeDashboard from "@/views/HomeDashboard.vue";
import { createRouter, createWebHistory } from "vue-router";



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
  
    {
      path: '/login',
      name: 'login',
      component: Login,
    },   
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: HomeDashboard
    },
    // ... define other routes
  ],
});

export default router;
