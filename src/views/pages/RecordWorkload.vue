<template>
    <div>
        <div class="container">
            <div class="date-box">
                <div class="block">
                    <el-date-picker
                            v-model="weekValue"
                            :format='this.startDate + "至" + endDate + " 第WW周"'
                            type="week"
                            @change="changeDate"
                            :picker-options="{'firstDayOfWeek': 1}"
                            placeholder="选择周"
                            style="width: 300px; margin: 0 0 20px 0"
                    >
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
                        show-summary
                        sum-text="合计(时)">
                    <el-table-column
                            prop="id"
                            label="序号"
                            sortable
                            width="180">
                    </el-table-column>
                    <el-table-column
                            label="项目"
                            width="180">
                        <template slot-scope="scope" >
                            <el-select v-model="scope.row.projectId"
                                       :disabled="scope.row.projectName === '无项目'"
                                       placeholder="请选择">
                                <el-option
                                        v-for="item in projects"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </template>

                    </el-table-column>
                    <el-table-column
                            label="投入工作量汇总"
                            width="180">
                        <el-table-column
                                label="(天)"
                                width="180">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.days"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="(小时)"
                                width="180">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.hours"></el-input>
                            </template>
                        </el-table-column>
                    </el-table-column>

                    <el-table-column
                            v-for="(item, index) in dayOfWeek"
                            :key="index"
                            :label="item.day">
                        <el-table-column :label="item.date">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.week[index].workTime"
                                          @change="onWorkTimeInput(scope.$index, scope.row)"></el-input>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template #default="scope">
                            <el-button
                                    type="text"
                                    icon="el-icon-circle-plus-outline"
                                    @click="handlerAddEmptyRecord(scope.$index, scope.row)"
                            >添加项目</el-button>
                            <el-button
                                    type="text"
                                    icon="el-icon-delete"
                                    class="primary"
                                    @click="handlerSave(scope.$index, scope.row)"
                            >保存</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

    </div>
</template>

<script>
    import * as dayjs from 'dayjs'
    import service from "../../utils/request";
    import {BASE_URL, getEarlyData, getProjects} from "../../api";

    export default {
        name: "RecordWorkload",
        data() {
            return {
                weekValue: '',
                startDate: '',
                endDate: '',
                dayOfWeek: [
                {
                    day: '一',
                    date: '',
                }, {
                    day: '二',
                    date: '',
                }, {
                    day: '三',
                    date: '',
                }, {
                    day: '四',
                    date: '',
                }, {
                    day: '五',
                    date: '',
                }, {
                    day: '六',
                    date: '',
                }, {
                    day: '日',
                    date: '',
                }],
                tableData: [{
                    id: 1,
                    projectId: '',
                    projectName: '无项目',
                    days: '',
                    hours: '',
                    week: [
                        {
                            day: '一',
                            date: '',
                            workTime: '',
                        }, {
                            day: '二',
                            date: '',
                            workTime: '',
                        }, {
                            day: '三',
                            date: '',
                            workTime: '',
                        }, {
                            day: '四',
                            date: '',
                            workTime: '',
                        }, {
                            day: '五',
                            date: '',
                            workTime: '',
                        }, {
                            day: '六',
                            date: '',
                            workTime: '',
                        }, {
                            day: '日',
                            date: '',
                            workTime: '',
                        }]
                }],
                projects: [],
            };
        },
        created() {
            this.weekValue = new Date();
            this.changeDate();
            this.getAllProject();
        },
        activated() {
            this.weekValue = new Date();
            this.changeDate();
            this.getAllProject();
        },
        methods: {
            // 编辑操作
            handlerAddEmptyRecord(projectId, projectName) {
                var newTableData =  {
                    id: '',
                    projectId: projectId || '',
                    projectName: projectName || '',
                    days: '',
                    hours: '',
                    week: [
                        {
                            day: '一',
                            date: '',
                            workTime: '',
                        }, {
                            day: '二',
                            date: '',
                            workTime: '',
                        }, {
                            day: '三',
                            date: '',
                            workTime: '',
                        }, {
                            day: '四',
                            date: '',
                            workTime: '',
                        }, {
                            day: '五',
                            date: '',
                            workTime: '',
                        }, {
                            day: '六',
                            date: '',
                            workTime: '',
                        }, {
                            day: '日',
                            date: '',
                            workTime: '',
                        }]
                };
                newTableData.id = this.tableData[this.tableData.length-1].id + 1;
                this.startDate = dayjs(this.weekValue).startOf('week').add(1, 'day').format('YYYY-MM-DD');
                for (var i = 0; i < 7; i++) {
                    newTableData.week[i].date = dayjs(this.startDate).add(i, 'day').format('YYYY-MM-DD');
                }
                this.tableData.push(newTableData);
            },
            // 保存编辑
            handlerSave(index, row) {
                var that = this;
                var requestData = [];
                // 从tableData中筛选该天的数据，提交至数据库
                for (var i = 0; i < row.week.length; i++) {
                    if (this.getNowFormatDate() === row.week[i].date) {
                        var data = {
                            // 从路由获取用户id
                            userid: that.$route.query.userid,
                            projectId: row.projectId,
                            date: row.week[i].date,
                            workTime: row.week[i].workTime
                        }
                        requestData.push(data)
                    }
                }
                service.post(BASE_URL + '/record', requestData).then(res => {
                    this.$message.success('提交成功', res.code);
                })
            },
            changeDate(){
                this.startDate = dayjs(this.weekValue).startOf('week').add(1, 'day').format('YYYY-MM-DD');
                this.endDate = dayjs(this.weekValue).endOf('week').add(1, 'day').format('YYYY-MM-DD');

                for (var i = 0; i < 7; i++) {
                    this.dayOfWeek[i].date = dayjs(this.startDate).add(i, 'day').format('YYYY-MM-DD');
                    this.tableData[0].week[i].date = dayjs(this.startDate).add(i, 'day').format('YYYY-MM-DD');
                }
                this.getOriginData();
            },
            // 计算工作时间
            onWorkTimeInput(index, row) {
                var sumHours = 0;
                var sumDays = 0;
                for (var i = 0; i < row.week.length; i++) {
                    sumHours = sumHours + Number(row.week[i].workTime);
                }
                row.hours = sumHours;
                sumDays = sumHours/7.5;
                row.days = sumDays;
            },
            getAllProject() {
                var that = this;
                getProjects().then(res => {
                    that.projects = res.data;
                    if (that.projects != null) {
                        var project = that.projects.find(item => {
                            return item.name === '无项目'
                        });
                        that.tableData[0].projectId = project.id;
                    }
                })
            },
            getOriginData() {
                var that = this;
                // this.changeDate();
                var userid = this.$route.query.userid;
                this.$nextTick(function () {
                    getEarlyData(this.startDate, this.endDate, userid).then(res => {
                        if (res.data.length !== 0) {
                            var projectList = res.data;
                            var diffData = that.getDiffData(that.tableData, projectList);
                            var diffProject = projectList.filter((item) => {
                                return that.isInArray(diffData, item.projectId)
                            })
                            var needAddProject = [];
                            diffProject.forEach((item) => {
                                var project = {
                                    projectId: item.projectId,
                                    projectName: item.projectName
                                }
                                needAddProject.push(project)
                            })
                            var resultProject = that.uniqueProjectArrays(needAddProject);
                            for (var t = 0; t < resultProject.length; t++) {
                                that.handlerAddEmptyRecord(resultProject[t].projectId, resultProject[t].projectName);
                            }
                            for (var i = 0; i < projectList.length; i++) {
                                // 为每行元素赋值
                                for (var j = 0; j < that.tableData.length; j++) {
                                    if (projectList[i].projectId == that.tableData[j].projectId) {
                                        for (var w = 0; w < that.tableData[j].week.length; w++) {
                                            if (that.tableData[j].week[w].date == projectList[i].workloadDate) {
                                                that.tableData[j].week[w].workTime = projectList[i].workloadTime;
                                            }
                                        }
                                    }
                                    that.onWorkTimeInput('',that.tableData[j])
                                }
                            }
                        } else {
                            that.tableData = [{
                                id: 1,
                                projectId: '',
                                projectName: '无项目',
                                days: '',
                                hours: '',
                                week: [
                                    {
                                        day: '一',
                                        date: '',
                                        workTime: '',
                                    }, {
                                        day: '二',
                                        date: '',
                                        workTime: '',
                                    }, {
                                        day: '三',
                                        date: '',
                                        workTime: '',
                                    }, {
                                        day: '四',
                                        date: '',
                                        workTime: '',
                                    }, {
                                        day: '五',
                                        date: '',
                                        workTime: '',
                                    }, {
                                        day: '六',
                                        date: '',
                                        workTime: '',
                                    }, {
                                        day: '日',
                                        date: '',
                                        workTime: '',
                                    }]
                            }];
                            that.getAllProject();
                        }
                        console.log(that.tableData)
                    })
                })

            },
            isInArray(arr,value) {
                for (var i = 0; i < arr.length; i++) {
                    if (value === arr[i]) {
                        return true;
                    }
                }
                return false;
            },
            getDiffData(tableData, projectList) {
                var originTableData = [];
                var originProjectList = [];
                console.log(tableData)
                tableData.forEach((item, index) => {
                    originTableData[index] = item.projectId
                });

                projectList.forEach((item, index) => {
                    originProjectList[index] = item.projectId
                })
                return this.getDiffElement(originTableData, this.uniqueArrays(originProjectList));
            },
            uniqueArrays( arr ){
                var result = [];
                for(var i=0,len=arr.length;i<len;i++){
                    if( !result.includes( arr[i] ) ){      // 检索arr1中是否含有arr中的值
                        result.push(arr[i]);
                    }
                }
                return result;
            },
            uniqueProjectArrays(arr) {
                var result = [];
                var obj = {};
                for(var i =0; i<arr.length; i++){
                    if(!obj[arr[i].projectId]){
                        result.push(arr[i]);
                        obj[arr[i].projectId] = true;
                    }
                }
                return  result;
            },
            getDiffElement(arr1, arr2) {
                return arr1.concat(arr2).filter((value,index,arr)=>{
                    return arr.indexOf(value) == arr.lastIndexOf(value);
                })
            },
            getNowFormatDate() {
                var date = new Date();
                var seperator1 = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                return year + seperator1 + month + seperator1 + strDate;
            }
        }
    };
</script>

<style scoped lang="scss">
    .tb-edit .el-input {
        display: none
    }
    .tb-edit .current-row .el-input {
        display: block
    }
    .tb-edit .current-row .el-input+span {
        display: none
    }
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
</style>
