import client from "@/pocketbase";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import FeedView from "../views/FeedView.vue";
import RedirectView from "../views/RedirectView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      meta: { requiresAuth: true },
      component: DashboardView,
    },
    {
      path: "/feed",
      name: "feed",
      meta: { requiresAuth: true },
      component: FeedView,
    },
    {
      path: "/redirect",
      name: "redirect",
      component: RedirectView,
    },
  ],
});

router.beforeEach((to, from) => {
  // Init the store within the beforeEach function as per the documentation:
  // https://pinia.vuejs.org/core-concepts/outside-component-usage.html#single-page-applications
  if (to.meta.requiresAuth && !client?.authStore.token) {
    return {
      path: "/",
    };
  }
});

export default router;
