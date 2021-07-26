<template>
    <div class="main-page">
        <Navigate></Navigate>
        <div class="home-content-box">
            <div class="home-content">
                <router-view v-slot="{ Component }">
                    <transition name="move" mode="out-in">
                        <keep-alive :include="tagsList">
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
                <!-- <el-backtop target=".content"></el-backtop> -->
            </div>
        </div>
    </div>
</template>

<script>
    import Navigate from "../components/Navigate";
    export default {
        components: {Navigate},
    }
</script>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
    }

    html,
    body,
    #app,
    .wrapper {
        width: 100%;
        height: 100%;
        zoom:100%;
    }
    .main-page {
        position: relative;
        width: 100%;
        height: 100%;
        background: #f0f0f0;
        overflow-y:auto; // 关键
        overflow-x: hidden;
        zoom:100%;
    }
    .home-content-box {
        width: 100%;
        height: 100%;
        transition: left .3s;
        background: #f0f0f0;
    }
</style>