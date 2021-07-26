<template>
    <div class="main-container">
        <div class="project-card">
            <el-card class="box-card"
                     v-for="(item, index) in projectTable"
                     :key="index"
                     @click.native="handlerProjectDetail">
                <div slot="header" class="project-card-header">

                    <span>{{item.name}}</span>
                </div>
                <div class="project-card-body">

                    <div class="project-intro">
                        <div class="project-desc">
                            <span>项目描述:</span>
                            {{item.description}}
                        </div>
                        <div class="project-info">
                            <span class="projectCreator">{{item.projectCreator}}</span>发布于<span>{{formatterDate(item.createTime)}}</span>
                        </div>
                        <div class="project-datetime">
                            <span>开始时间: {{formatterDate(item.startDatetime)}}</span>
<!--                            <span>开始时间: {{item.startDatetime}}</span>-->
                            <span>结束时间: {{formatterDate(item.endDatetime)}}</span>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
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
</template>

<script>
import {getAllProject} from "../../../api/workload";

export default {
    name: "AllProjects",
    data() {
        return {
            query: {
                pageIndex: 1,
                pageSize: 10
            },
            pageTotal: 0,
            projectTable: [],
        }
    },
    activated() {
        this.getAllProjectByPage(this.query.pageIndex, this.query.pageSize);
    },
    created() {
        this.getAllProjectByPage(this.query.pageIndex, this.query.pageSize);
    },
    methods: {
        handlerProjectDetail() {
            console.log("sss")
        },

        getAllProjectByPage(pageIndex, pageSize) {
            var that = this;
            getAllProject(pageIndex, pageSize).then(res => {
                console.log(res)
                that.pageTotal = res.data.total;
                that.projectTable = res.data.list;
            })
        },
        handlePageChange(val) {
            this.$set(this.query, "pageIndex", val);
            this.getAllProjectByPage(val, this.query.pageSize)
        },
        formatterDate(DateString) {
            let dateTime = new Date(DateString);
            // 注意js里面的getMonth是从0开始的
            return dateTime.getFullYear() + '-' +
            (dateTime.getMonth() + 1) + '-' +
                dateTime.getDate() + ' ' +
                dateTime.getHours() + ':' +
                dateTime.getMinutes() + ':' +
                dateTime.getSeconds();
        }

    }
}

</script>
<style lang="scss">
.main-container {
    width: 100%;
    height: 100%;
    margin-bottom: 40px;
    position: absolute;

    .project-card {
        .box-card {
            margin: 40px auto;
            width: 60%;
            .project-card-header {
                span {
                    font-size: 18px;
                    font-weight: 700;
                }
            }
            .project-card-body {
                word-wrap: break-word;
                word-break: break-all;
                .project-intro {
                    .project-desc {
                        padding: 5px 5px;
                        color: #988e8e;
                    }
                    .project-info {
                        padding: 5px 5px;
                        .projectCreator {
                            color: #20a0ff;

                        }
                    }
                    .project-datetime {
                        padding: 5px 5px;
                        color: #464545;
                        span {
                            padding: 10px;
                        }
                    }
                }
            }
        }
    }
    .pagination {
        padding-bottom: 50px;
        float: left;
        margin-left: 20%;
        margin-bottom: 200px;
        .el-pagination {
            button {
                background-color: #ffffff;
            }
        }
    }

}
</style>