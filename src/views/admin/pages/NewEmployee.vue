<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 员工管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>新增员工</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="用户姓名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="用户登录名">
                        <el-input v-model="form.loginName"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码">
                        <el-input v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="用户角色">
                        <el-select v-model="form.userRole" placeholder="请选择">
                            <el-option  v-for="item in this.userRoleOption"
                                        :key="item.id"
                                        :label="item.userRoleName"
                                        :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="用户工作角色">
                        <el-select v-model="form.userWorkRole" placeholder="请选择">
                            <el-option  v-for="item in this.userWorkRoleOption"
                                        :key="item.id"
                                        :label="item.roleName"
                                        :value="item.id"></el-option>
                        </el-select>
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
import {getRoles} from "../../../api";
import service from "../../../utils/request";

export default {
    name: 'NewEmployee',
    data() {
        return {
            form: {
                name: '',
                loginName: '',
                password: '',
                userRole: '',
                userWorkRole: '',
            },
            userRoleOption: [],
            userWorkRoleOption: [],
        };
    },
    created() {
        this.getUserRoles();

    },
    activated() {
        this.getUserRoles();
    },
    methods: {
        onSubmit() {
            var that = this;
            service.post("http://localhost:8999/api/admin/user/insert", this.form).then(res => {
                if (res.code === 20000) {
                    that.$message.success('提交成功！');
                } else {
                    that.$message.warning('提交失败！');
                }
            })
        },
        getUserRoles() {
            var that = this;
            this.$nextTick(() => {
                getRoles().then(res => {
                    that.userRoleOption = res.data.userRole;
                    that.userWorkRoleOption = res.data.userWorkRole
                })
            })
        }
    }
};
</script>