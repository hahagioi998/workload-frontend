<template>
    <div class="main-container">
        <div class="project-workload-card">
            <div class="project-detail-information">
                <el-card class="box-card">
                    <div slot="header" class="project-card-header">
                        <span>项目信息</span>
                    </div>
                    <div class="project-card-body">
                        {{'列表dsafdsafdsafsafdsafdsafdsafsdafsafsafdsfdasfdasfdasfdsafdasfdsafdsaffddADASfdsaFdsafdsaSAFDASFDSAfafdasfdsafddsafsafsafdsafdsafdsafdsafdafdfdsafdsafsafsdafds内容 ' }}
                    </div>
                </el-card>

            </div>
            <div class="project-enter-workload">
                <el-card class="box-card">
                    <div slot="header" class="project-card-header">
                        <span>任务管理</span>
                    </div>
                    <div class="project-workload-body">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="工作概述">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="目标描述">
                                <el-input type="textarea" v-model="form.desc"></el-input>
                            </el-form-item>
                            <el-col :span="11">
                                <el-form-item prop="date1" label="开始时间">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-form-item prop="date2">
                                    <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item prop="date1" label="结束时间">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-form-item prop="date2">
                                    <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                                </el-form-item>
                            </el-col>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                                <el-button>取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {}
        }
    },
    methods: {
        onSubmit() {
            console.log("submit")
        }
    }
}
</script>


<style lang="scss">
    .main-container {
        width: 100%;
        height: 100%;
        .project-workload-card {
            margin-top: 8vh;
            margin-left: 20vh;
            margin-right: 20vh;
            .project-detail-information {
                .box-card {
                    margin: 40px auto;
                    width: 80%;
                }
            }
            .project-enter-workload {
                margin-top: 8vh;
                .box-card {
                    margin: 40px auto;
                    width: 80%;
                }
            }
        }
    }
    .project-card-header {
        span {
            font-size: 18px;
            font-weight: 700;
        }
    }
</style>