<template>
    <div class="navigate">
        <el-row type="flex" :gutter="20">
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <div class="logo grid-content bg-purple"><span>Workload Account System</span></div>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <div class="navigate-center grid-content bg-purple">
                    <span><router-link to="/all-projects">全部项目</router-link></span>
                    <span><router-link to="/my-projects">我的项目</router-link></span>
                </div>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <div class="user-operate grid-content bg-purple">
                    <span>登陆</span>
                    <span>|</span>
                    <span>注册</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1'
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style lang="scss">
    .navigate {
        top: 10%;
        left: 10%;
        right: 10%;
        margin: 0 auto;
        width: 100%;
        background: #001529;
        .logo {
            text-align: center;
            padding: 30px;
            color: #ffffff;
            font-size: 18px;
            font-weight: 500;
            /*margin-top: 20px;*/
        }
    }
    .navigate-center {
        padding: 30px;
        margin-left: 10%;
        span a{
            color: #ffffff;
            font-size: 18px;
            font-weight: 500;
            margin-left: 60px;
            text-align: center;
        }
    }

    .user-operate {
        padding: 30px;
        font-size: 18px;
        font-weight: 500;
        text-align: center;
        color: #ffffff;
        span {
            padding: 10px;
        }
    }
</style>