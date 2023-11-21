import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/UserLogin.vue";
import Register from "@/views/UserRegister.vue";
import HomeDashboard from "@/views/HomeDashboard.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { guestOnly: true }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: { guestOnly: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: HomeDashboard,
      meta: { requiresAuth: true }
    },
    // ... other routes
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else if (to.meta.guestOnly && isAuthenticated) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router;
