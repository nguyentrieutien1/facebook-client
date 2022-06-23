import { createRouter, createWebHistory } from "vue-router";
import Home from "./../components/Home.vue";
import Login from "./../components/Login.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/account/:id",
      name: "account",
      component: () => import("./../components/FriendDetail.vue"),
    },
    {
      path: "/friend",
      name: "friend",
      component: () => import("./../components/FriendRequest.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./../components/Profile.vue"),
    },
  ],
});

export default router;
