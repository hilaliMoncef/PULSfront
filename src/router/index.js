import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index.js";

import Home from "../views/Admin/Home.vue";
import AllTerminals from "../views/Admin/Terminals/All.vue";
import ShowTerminal from "../views/Admin/Terminals/Show.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requiresAnon: true
    }
  },
  {
    path: "/terminals",
    name: "terminals",
    component: AllTerminals,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/terminals/:id",
    name: "terminal",
    component: ShowTerminal,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.onlyFrom)) {
    if (from.name == to.meta.onlyFrom) {
      next();
      return;
    }
    next("/start");
  } else if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (store.getters.isAdmin) {
      next();
      return;
    }
    next("/");
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else if (to.matched.some(record => record.meta.requiresAnon)) {
    if (!store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/");
  } else {
    next();
  }
});

export default router;
