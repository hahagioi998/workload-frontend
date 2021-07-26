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
                    <el-form-item label="用户工作角色名">
                        <el-input v-model="form.name"></el-input>
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
    import {getRoles, insertWorkRole} from "../../../api";

    export default {
        name: 'NewWorkRole',
        data() {
            return {
                form: {
                    name: '',
                },
                userRoleOption: [],
                userWorkRoleOption: [],
            };
        },
        methods: {
            onSubmit() {
                var that = this;
                insertWorkRole(this.form.name).then(res => {
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