import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/admin/page/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'Home',
    component: Home,
    children: [
      {
        path: "/tabs",
        name: "tabs",
        meta: {
          title: 'tab标签'
        },
        component: () => import (
            /* webpackChunkName: "tabs" */
            "../views/admin/page/Tabs.vue")
      }
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
]

const router = new VueRouter({
  routes
})

export default router
