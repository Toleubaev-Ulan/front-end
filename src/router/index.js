import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: () => import("../views/DashboardView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
