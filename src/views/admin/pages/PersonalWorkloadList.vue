<template>
    <div>
<!--        <div class="crumbs">-->
<!--            <el-breadcrumb separator="/">-->
<!--                <el-breadcrumb-item>-->
<!--                    <i class="el-icon-lx-cascades"></i> 基础表格-->
<!--                </el-breadcrumb-item>-->
<!--            </el-breadcrumb>-->
<!--        </div>-->
        <div class="container">
            <div class="handle-box">
                <div class="block">
                    <el-date-picker
                            v-model="monthValue"
                            type="month"
                            value-format="yyyy-MM"
                            @change="days"
                            placeholder="选择月">
                    </el-date-picker>
                </div>
            </div>
            <div>
                <el-table
                        :data="tableData"
                        style="width: 100%;margin-bottom: 20px;"
                        row-key="id"
                        border
                        default-expand-all
                        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                    <el-table-column
                            prop="realName"
                            label="姓名"
                            sortable
                            width="180">
                    </el-table-column>
                    <el-table-column
                            v-for='(item, index) in monthDays'
                            :key="index"
                            prop="id"
                            :label='item + "日"'>
                        <template slot-scope="scope">
                            <div v-for='(userWork, monthIndex) in scope.row.userMonthWorkload'
                                 :class="userWork.workTime >= 7.5 ? 'completed' : 'uncompleted'"
                                 :key="monthIndex">
                                {{userWork.workloadDate.split("-")[2] == item ? userWork.workloadTime : ""}}
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import * as dayjs from 'dayjs'
    import service from "../../../utils/request";
    export default {
        name: "ProjectWorkloadList",
        data() {
            return {
                monthValue: dayjs(new Date()).format("YYYY-MM"),
                monthDays: dayjs(new Date().getMonth()).daysInMonth(),
                tableData: [],
                month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            };
        },
        created() {
            this.getData();
        },
        activated() {
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getData() {
                var that = this;
                service.get("http://localhost:8999/api/admin/count/user?date=" + this.monthValue).then(res => {
                    that.tableData = res.data;
                })
            },
            days() {
                this.monthDays = dayjs(this.monthValue).daysInMonth();
                this.getData();
            }
        }
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }
    .completed {
        background-color: rgb(146, 208, 80);
    }
    .uncompleted {
        background-color: rgb(255, 255, 0);
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
</style>
