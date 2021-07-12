import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../views/admin/pages/Admin.vue'
import Home from '../views/workload/pages/Home'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/admin/',
        name: 'Admin',
        component: Admin,
        children: [
            // 标签页
            {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签'
                },
                component: () => import (
                    /* webpackChunkName: "tabs" */
                    "../views/admin/pages/Tabs.vue")
            }, {
                path: "/project-list",
                name: "ProjectList",
                meta: {
                    title: '项目管理'
                },
                component: () => import ("../views/admin/pages/ProjectList")
            }, {
                path: "/new-project",
                name: "NewProject",
                meta: {
                    title: '新建项目'
                },
                component: () => import ("../views/admin/pages/NewProject")
            }, {
                path: "/project-workload-list",
                name: "ProjectWorkloadList",
                meta: {
                    title: '项目工时列表'
                },
                component: () => import ("../views/admin/pages/ProjectWorkloadList")
            }, {
                path: "/personal-workload-list",
                name: "PersonalWorkloadList",
                meta: {
                    title: '个人工时统计'
                },
                component: () => import ("../views/admin/pages/PersonalWorkloadList")
            }, {
                path: "/employee-list",
                name: "EmployeeList",
                meta: {
                    title: '员工管理'
                },
                component: () => import ("../views/admin/pages/EmployeeList")
            }, {
                path: "/new-employee",
                name: "NewEmployee",
                meta: {
                    title: '新建项目'
                },
                component: () => import ("../views/admin/pages/NewEmployee")
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
