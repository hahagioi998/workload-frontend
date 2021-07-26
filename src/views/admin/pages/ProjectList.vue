<template>
    <div class="main-container">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 项目管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>项目列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="project-preview">
            <el-card class="box-card">
                <div class="project-preview-body">
                    <el-row type="flex" :gutter="20">
                        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                            <div class="project-dashboard">
                                <span class="project-title">总的任务</span>
                                <span class="project-body">{{totalProject}}个任务</span>
                            </div>
                        </el-col>
                        <el-divider direction="vertical"></el-divider>
                        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                            <div class="project-dashboard">
                                <span class="project-title">进行中的项目</span>
                                <span class="project-body">{{processingProject}}个任务</span>
                            </div>
                        </el-col>
                        <el-divider direction="vertical"></el-divider>
                        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                            <div class="project-dashboard">
                                <span class="project-title">已完成的项目</span>
                                <span class="project-body">{{completedProject}}个任务</span>
                            </div>
                        </el-col>
                        <el-divider direction="vertical"></el-divider>
                        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                            <div class="project-dashboard">
                                <span class="project-title">延期的项目</span>
                                <span class="project-body">{{delayProject}}个任务</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="delAllSelection"
                >批量删除</el-button>
                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <!--                <el-table-column label="头像(查看大图)" align="center">-->
                <!--                    <template #default="scope">-->
                <!--                        <el-image-->
                <!--                                class="table-td-thumb"-->
                <!--                                :src="scope.row.thumb"-->
                <!--                                :preview-src-list="[scope.row.thumb]"-->
                <!--                        ></el-image>-->
                <!--                    </template>-->
                <!--                </el-table-column>-->
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="项目名称"></el-table-column>
                <el-table-column prop="description" label="项目描述">
<!--                    <template #default="scope">￥{{ scope.row.money }}</template>-->
                </el-table-column>
                <el-table-column prop="projectCreator" label="创建者">
                </el-table-column>
                <el-table-column prop="projectManager" label="项目经理"></el-table-column>
                <el-table-column prop="startDatetime" label="开始时间"></el-table-column>
                <el-table-column prop="endDatetime" label="结束时间"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template #default="scope">
                        <el-tag
                                :type="
                                scope.row.projectStatus === 1 ? 'primary' : scope.row.projectStatus === '2' ? 'info':
                                 scope.row.projectStatus === 3 ? 'success': scope.row.projectStatus === 4 ? 'danger': ''"
                        >{{ scope.row.projectStatus === 1 ? "未开始" : scope.row.projectStatus === 2 ? "进行中"
                            : scope.row.projectStatus === 3 ? "已完成" : scope.row.projectStatus === 4 ? "已延期" : ""}}</el-tag>
                    </template>
                </el-table-column>


                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.pageIndex"
                        :page-size="query.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" v-model="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import {getProjects} from "../../../api";
    export default {
        name: "ProjectList",
        data() {
            return {
                totalProject: '',
                processingProject: '',
                completedProject: '',
                delayProject: '',
                query: {
                    pageIndex: 1,
                    pageSize: 10
                },
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                pageTotal: 0,
                form: {},
                idx: -1,
                id: -1
            };
        },
        created() {
            this.getProjects(this.query.pageIndex, this.query.pageSize);
            // this.getData();
            console.log("basetable")
        },
        activated() {
            console.log("basewwwwwwtable")
        },
        methods: {
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, "pageIndex", 1);
                this.getData();
            },
            // 删除操作
            handleDelete(index) {
                // 二次确认删除
                this.$confirm("确定要删除吗？", "提示", {
                    type: "warning"
                })
                    .then(() => {
                        this.$message.success("删除成功");
                        this.tableData.splice(index, 1);
                    })
                    .catch(() => {});
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            delAllSelection() {
                const length = this.multipleSelection.length;
                let str = "";
                this.delList = this.delList.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + " ";
                }
                this.$message.error(`删除了${str}`);
                this.multipleSelection = [];
            },
            // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                this.$set(this.tableData, this.idx, this.form);
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, "pageIndex", val);
                this.getProjects(val, this.query.pageSize)
            },
            getProjects(pageIndex, pageSize) {
                var that = this;
                getProjects(pageIndex, pageSize).then(res => {
                    that.totalProject = res.data.totalProject;
                    that.processingProject = res.data.processingProject;
                    that.completedProject = res.data.completedProject;
                    that.delayProject = res.data.delayProject;
                    that.tableData = res.data.projectPageVOPageInfo.list;
                    that.pageTotal = res.data.totalProject
                })
            }
        }
    };
</script>

<style scoped lang="scss">
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
    .main-container {
        width: 100%;
    }
    .container {

    }

    .project-preview {
        margin-top: 15px;
        margin-bottom: 15px;
       .box-card {
           .el-row {
               .el-divider {
                   height: auto;
               }
               .el-col {
                   .project-dashboard {
                       width: 100%;
                       display: flex;
                       flex-direction: column;
                       align-items: center;
                       align-content: center;
                       justify-self: center;

                       .project-title {
                           font-size: 14px;
                           width: 100%;
                           text-align: center;
                           align-content: center;
                           color: #988e8e;
                           font-weight: 600;
                       }
                       .project-body {
                           margin-top: 15px;
                           width: 100%;
                           font-size: 16px;
                           font-weight: 700;
                           align-content: center;
                           text-align: center;
                       }
                   }
               }
           }
       }
    }

</style>
