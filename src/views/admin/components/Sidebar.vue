<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">

                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem, i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "vSidebar",
    data() {
        return {
            items: [
                {
                    icon: "el-icon-guide",
                    index: "dashboard",
                    title: "系统首页",
                },
                {
                    icon: "el-icon-guide",
                    index: "project",
                    title: "项目管理",
                    subs: [
                        {
                            // index 是 route 的 path
                            index: "project-list",
                            title: "项目列表"
                        },
                        {
                            index: "new-project",
                            title: "新增项目"
                        },
                    ]
                },
                {
                    icon: "el-icon-guide",
                    index: "workload",
                    title: "工时统计",
                    subs: [
                        {
                            index: "record-workload",
                            title: '工作记录',
                        },
                        {
                            // index 是 route 的 path
                            index: "project-workload-list",
                            title: "项目工时统计"
                        },
                        {
                            index: "personal-workload-list",
                            title: "个人工时统计"
                        },
                    ]
                },
                {
                    icon: "el-icon-guide",
                    index: "employee",
                    title: "员工管理",
                    subs: [
                        {
                            // index 是 route 的 path
                            index: "employee-list",
                            title: "员工列表"
                        },
                        {
                            index: "new-employee",
                            title: "新增员工"
                        },
                        {
                            index: "new-work-role",
                            title: "新增工作角色"
                        },
                    ]
                },
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace("/", "");
        },
        collapse(){
            return this.$store.state.collapse
        }
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
