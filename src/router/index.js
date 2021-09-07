import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/addnetwork',
    name: 'AddNetwork',
    component: () => import('../views/AddNetwork.vue')
  },
  {
    path: '/adddivision',
    name: 'AddDivision',
    component: () => import('../views/AddDivision.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/adduser',
    name: 'AddUser',
    component: () => import('../views/AddUser.vue')
  },
  {
    path: '/viewnetworks',
    name: 'ViewNetworks',
    component: () => import('../views/ViewNetworks.vue')
  },
  {
    path: '/viewnetworks/:id',
    name: 'ViewNetworkDetail',
    component: () => import('../views/ViewNetworkDetail.vue')
  },
  {
    path: '/viewnetworks/:id/port/:portId',
    name: 'ViewIpDetail',
    component: () => import('../views/ViewIpDetails.vue')
  },
  {
    path: '/viewdivisions',
    name: 'ViewDivisions',
    component: () => import('../views/ViewDivisions.vue')
  },
  {
    path: '/viewusers',
    name: 'ViewUsers',
    component: () => import('../views/ViewUsers.vue')
  },
  {
    path: '/viewips',
    name: 'ViewIps',
    component: () => import('../views/ViewIps.vue')
  },
  { path: '*', redirect: '/' },
]

const router = new VueRouter({
  routes
})
/*
router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next({ 
      path: '/login', 
      query: { returnUrl: to.path } 
    });
  }

  next();
})
*/

export default router
