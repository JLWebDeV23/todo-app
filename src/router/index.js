import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue"; // Example view

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // Add other routes here
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
