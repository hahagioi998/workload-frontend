import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: "/record-workload/",
        name: "RecordWorkload",
        meta: {
            title: '项目工时列表'
        },
        query: {userid: ''},
        component: () => import ("../views/pages/RecordWorkload")
    },
    {
        path: "/project-workload-list",
        name: "ProjectWorkloadList",
        meta: {
            title: '项目工时列表'
        },
        component: () => import ("../views/pages/ProjectWorkloadList")
    }, {
        path: "/personal-workload-list",
        name: "PersonalWorkloadList",
        meta: {
            title: '个人工时统计'
        },
        component: () => import ("../views/pages/PersonalWorkloadList")
    }
]

const router = new VueRouter({
    routes
})

export default router
