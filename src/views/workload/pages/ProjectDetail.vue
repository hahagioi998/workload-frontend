<template>
    <div class="main-container">
        <div class="project-detail-card">
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
            <div class="project-detail-group">
                <el-card class="box-card">
                    <div slot="header" class="project-card-header">
                        <span>项目组成员</span>
                    </div>
                    <div class="project-card-body">
                        {{'列表dsafdsafdsafsafdsafdsafdsafsdafsafsafdsfdasfdasfdasfdsafdasfdsafdsaffddADASfdsaFdsafdsaSAFDASFDSAfafdasfdsafddsafsafsafdsafdsafdsafdsafdafdfdsafdsafsafsdafds内容 ' }}
                    </div>
                </el-card>
            </div>
            <div class="project-workload">
                <el-card class="box-card">
                    <div slot="header" class="project-card-header">
                        <span>项目工作预览</span>
                    </div>
                    <div class="project-card-body">
                        {{'列表dsafdsafdsafsafdsafdsafdsafsdafsafsafdsfdasfdasfdasfdsafdasfdsafdsaffddADASfdsaFdsafdsaSAFDASFDSAfafdasfdsafddsafsafsafdsafdsafdsafdsafdafdfdsafdsafsafsdafds内容 ' }}
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.main-container {
    width: 100%;
    height: 100%;
    .project-detail-card {
        margin-top: 8vh;
        margin-left: 20vh;
        margin-right: 20vh;
        .project-detail-information {
            .box-card {
                margin: 40px auto;
                width: 80%;
            }
        }
        .project-detail-group {
            margin-top: 8vh;
            .box-card {
                margin: 40px auto;
                width: 80%;
            }
        }
        .project-workload {
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