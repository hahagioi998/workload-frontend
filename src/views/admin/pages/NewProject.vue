<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 项目管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>添加项目</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="项目名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="项目描述">
                        <el-input v-model="form.description"></el-input>
                    </el-form-item>
                    <el-form-item label="项目主持人">
                        <el-input v-model="form.projectMajor"></el-input>
                    </el-form-item>
                    <el-form-item label="项目经理">
                        <el-input v-model="form.projectManager"></el-input>
                    </el-form-item>
                    <el-form-item label="项目创建者">
                        <el-input v-model="form.projectCreator"></el-input>
                    </el-form-item>
                    <el-form-item label="项目开始时间">
                        <el-date-picker
                                v-model="form.startDateTime"
                                type="datetime"
                                format="yyyy-MM-dd HH:mm:ss"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="项目结束时间">
                        <el-date-picker
                                v-model="form.endDateTime"
                                type="datetime"
                                format="yyyy-MM-dd HH:mm:ss"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="项目阶段">
                        <el-radio-group v-model="form.projectStatus">
                            <el-radio label="1">未开始</el-radio>
                            <el-radio label="2">进行中</el-radio>
                            <el-radio label="3">已完成</el-radio>
                            <el-radio label="4">已延期</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="项目成员">
                        <template>
                            <el-transfer
                                    filterable
                                    :titles=titles
                                    :filter-method="filterMethod"
                                    filter-placeholder="请输入城市拼音"
                                    v-model="form.group"
                                    :data="userData">
                            </el-transfer>
                        </template>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {getAllUser} from "../../../api";
    import {pinyin} from 'pinyin-pro';
    import service from "../../../utils/request";

    export default {
    name: 'NewProject',
    data() {
        return {
            titles: ['全部成员', '项目组成员'],
            form: {
                name: '',
                description: '',
                projectMajor: '',
                projectManager: '',
                projectCreator: '',
                startDateTime: '',
                endDateTime: '',
                projectStatus: '',
                group: []
            },
            userData: [],
            filterMethod(query, item) {
                return item.pinyin.indexOf(query) > -1;
            }
        };
    },
    created() {
        this.userData = this.generateData();
    },
    mounted() {

    },
    methods: {
        onSubmit() {
            console.log(this.form)
            service.post("http://localhost:8999/api/admin/project/add", {
                name: this.form.name,
                description: this.form.description,
                group: this.form.group.join(","),
                projectMajor: this.form.projectMajor,
                projectCreator: this.form.projectCreator,
                projectManager: this.form.projectManager,
                projectStatus: this.form.projectStatus,
                startDatetime: this.form.startDateTime,
                endDatetime: this.form.endDateTime
            })
            this.$message.success('提交成功！');
        },
        generateData() {
            var that = this;
            const data = [];
            let users = [];
            getAllUser().then(res => {
                users = res.data;
                // const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
                users.forEach((user) => {
                    data.push({
                        label: user.name,
                        key: user.id,
                        pinyin: that.usernameToPinyin(user.name)
                    });
                });
                console.log(data)
            })

            return data;
        },
        usernameToPinyin(username) {
            return pinyin(username, {toneType: "none"}).replace(/\s*/g,"");
        },
        /**
         * @return {string}
         */
        GMTToStr(time){
            let date = new Date(time)
            return date.getFullYear() + '-' +
                (date.getMonth() + 1) + '-' +
                date.getDate() + ' ' +
                date.getHours() + ':' +
                date.getMinutes() + ':' +
                date.getSeconds()
        }
    }
};
</script>