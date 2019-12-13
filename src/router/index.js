import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store/index.js';

import Home from "../views/Home.vue";
import Users from "../views/Users.vue";
import Campaigns from "../views/Campaigns.vue";
import Campaign from "../views/Campaign.vue";
import EditCampaign from "../views/EditCampaign.vue";
import AddCampaign from "../views/AddCampaign.vue";
import Customers from "../views/Customers.vue";
import Terminals from "../views/Terminals.vue";
import Terminal from "../views/Terminal.vue";
import EditTerminal from "../views/EditTerminal.vue";
import AddTerminal from "../views/AddTerminal.vue";
import Login from "../views/Login.vue";

import StartTerminal from "../views/Game/StartTerminal.vue";
import StopTerminal from "../views/Game/StopTerminal.vue";
import DonatorLogin from "../views/Game/DonatorLogin.vue";
import DonatorRegister from "../views/Game/DonatorRegister.vue";
import Payment from "../views/Game/Payment.vue";
import Play from "../views/Game/Play.vue";
import Endgame from "../views/Game/Endgame.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/users",
    name: "users",
    component: Users,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/campaigns",
    name: "campaings",
    component: Campaigns,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/campaign/add',
    name: 'add-campaign',
    component: AddCampaign,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/campaign/:id',
    name: 'campaign',
    component: Campaign,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/campaign/:id/edit',
    name: 'edit-campaign',
    component: EditCampaign,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/customers",
    name: "customers",
    component: Customers
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
    path: "/start",
    name: "start",
    component: StartTerminal,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/stop",
    name: "stop",
    component: StopTerminal,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/donator/",
    name: "donator",
    component: DonatorLogin,
    meta: {
      requiresAuth: true,
      onlyFrom: 'payment'
    }
  },
  {
    path: "/donator/login",
    name: "donator-login",
    component: DonatorRegister,
    meta: {
      requiresAuth: true,
      onlyFrom: 'donator'
    }
  },
  {
    path: "/payment",
    name: "payment",
    component: Payment,
    meta: {
      requiresAuth: true,
      onlyFrom: 'start'
    }
  },
  {
    path: "/play",
    name: "play",
    component: Play,
    meta: {
      requiresAuth: true,
      onlyFrom: 'donator-login'
    }
  },
  {
    path: "/endgame",
    name: "endgame",
    component: Endgame,
    meta: {
      requiresAuth: true,
      onlyFrom: 'play'
    }
  },
  {
    path: '/terminals',
    name: 'terminals',
    component: Terminals,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/terminal/add',
    name: 'add-terminal',
    component: AddTerminal,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/terminal/:id',
    name: 'terminal',
    component: Terminal,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/terminal/:id/edit',
    name: 'edit-terminal',
    component: EditTerminal,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.onlyFrom)){
    if(from.name == to.meta.onlyFrom) {
      next()
      return
    }
    next('/start')
  }
  else if(to.matched.some(record => record.meta.requiresAdmin)){
    if(store.getters.isAdmin) {
      next()
      return
    }
    next('/')
  }
  else if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } 
  else if(to.matched.some(record => record.meta.requiresAnon)){
    if(!store.getters.isLoggedIn){
      next()
      return
    }
    next('/')
  }
  else {
    next() 
  }
})

export default router;
