<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <div class="block">
                    <el-date-picker
                            v-model="yearValue"
                            type="year"
                            value-format="yyyy"
                            @change="changeYear"
                            placeholder="选择年">
                    </el-date-picker>
                </div>
            </div>
            <div>
                <el-table
                        class="expand-table"
                        :data="tableData"
                        :border="true"
                        style="width: 100%;margin-bottom: 20px;"
                        type="expand">
                    <el-table-column type="expand" class-name="tree-node">
                        <template slot-scope="props" class="tree-node">
                            <el-table :show-header="false"
                                      style="width: 100%; position: inherit"
                                      :border="true"
                                      :data="props.row.projectUser">
                                <el-table-column width="180" prop="realName"></el-table-column>
                                <el-table-column
                                        prop="totalTime"
                                        label="合计"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        v-for="(item, index) in month"
                                        width="90"
                                        :key="index">
                                    <template slot-scope="scope">
                                        <div v-for='(userWork, monthIndex) in scope.row.userWorkload'
                                             :key="monthIndex">
                                            {{userWork.workloadDate.split("-")[1] == item ? userWork.workloadTime : ""}}
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>

                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="projectName"
                            label="项目"
                            sortable
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="projectTotalTime"
                            label="合计"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            width="90"
                            v-for="(item, index) in month"
                            :key="index"
                            :label='item + "月"'>
                        <template slot-scope="scope">
                            <div v-for='(monthData, monthIndex) in scope.row.projectMonth'
                                 :key="monthIndex">
                                <div v-if="item== monthData.month">{{monthData.monthTotalTime}}</div>
                                <div v-else></div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>

</template>

<script>
    import service from "../../../utils/request";
    import * as dayjs from 'dayjs'
    export default {
        name: "ProjectWorkloadList",
        data() {
            return {
                sum: 0,
                tableData: [],
                month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                yearValue: dayjs(new Date()).format("YYYY"),
            };
        },
        created() {
            this.getData();
        },
        activated() {
            this.getData();
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getData() {
                var that = this;
                service.get("http://localhost:8999/api/admin/count/project?year=" + this.yearValue).then(res => {
                    that.tableData = res.data;
                    for(var i = 0; i < res.data.length; i++) {
                        that.tableData[i].projectId = res.data[i].projectId;
                        that.tableData[i].projectName = res.data[i].projectName;
                        that.tableData[i].projectUser = res.data[i].projectUser;
                        that.tableData[i].projectTotalTime = 0;

                        // 对月工作进行初始化
                        that.tableData[i].projectMonth = [];
                        for(var m = 0; m < 12; m++) {
                            that.tableData[i].projectMonth[m] = {
                                month: m + 1,
                                monthTotalTime: 0
                            };
                        }
                        for (var j = 0; j < that.tableData[i].projectUser.length; j++) {
                            that.tableData[i].projectUser[j].totalTime = 0;
                            for (var k = 0; k < that.tableData[i].projectUser[j].userWorkload.length; k++) {
                                that.tableData[i].projectUser[j].totalTime += that.tableData[i].projectUser[j].userWorkload[k].workloadTime;

                                // 获取月工作时间
                                for (var mon = 0; mon < 12; mon++) {
                                    if (that.tableData[i].projectUser[j].userWorkload[k].workloadDate.split("-")[1]
                                        == that.tableData[i].projectMonth[mon].month) {
                                        that.tableData[i].projectMonth[mon].monthTotalTime += that.tableData[i].projectUser[j].userWorkload[k].workloadTime
                                    }
                                }
                            }
                            that.tableData[i].projectTotalTime = that.tableData[i].projectTotalTime + that.tableData[i].projectUser[j].totalTime;
                        }
                    }
                    console.log(that.tableData)
                })
            },
            changeYear() {
                this.getData();
                console.log(this.yearValue)
            }
        }
    };
</script>

<style lang="scss">
    .handle-box {
        margin-bottom: 20px;
    }
    .expand-table {
        .el-table__body-wrapper {
            .el-table__body {
                tbody {
                    tr {
                        .el-table__expanded-cell {
                            padding: 0 0 0 3.16%;
                            .el-table {
                                .el-table__body-wrapper {
                                    overflow-x: inherit;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

</style>
