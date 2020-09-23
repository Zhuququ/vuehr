<template>
    <div>
        <div>
            <el-input class="addJobLevelInput" placeholder="添加职称..." prefix-icon="el-icon-plus" size="small"
                      v-model="jobLevel.name"></el-input>
            <el-select class="addJobLevelSelect ml-10" placeholder="职称级别" size="small" v-model="jobLevel.titleLevel">
                <el-option :key="titleLevel.value" :label="titleLevel.label"
                           :value="titleLevel.value" size="small" v-for="titleLevel in titleLevels"></el-option>
            </el-select>
            <el-button @click="addJobLevel" class="addJobLevelBtn ml-10" icon="el-icon-plus" size="small"
                       type="primary">添加
            </el-button>
        </div>
        <div>
            <el-table :data="jobLevels" @selection-change="handleSelectionChange" border class="jobLevelTable mt-10"
                      size="small" stripe>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="编号" prop="id" width="55"></el-table-column>
                <el-table-column label="职称名称" prop="name"></el-table-column>
                <el-table-column label="职称级别" prop="titleLevel" width="120"></el-table-column>
                <el-table-column label="创建时间" prop="createDate" width="180"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button @click="showEditView(scope.row)" size="mini">编辑</el-button>
                        <el-button @click="deleteJobLevel(scope.row)" size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button :disabled="!this.multipleSelection.length" @click="multiDelete" class="multiDelete mt-10"
                       size="small"
                       type="danger">
                批量删除
            </el-button>
        </div>
        <el-dialog :visible.sync="dialogVisible" title="修改职称" width="25%">
            <div class="editJobLevelDiv1">
                <el-tag>职称名称</el-tag>
                <el-input class="editJobLevelInput ml-10" size="small" v-model="editJobLevel.name"></el-input>
            </div>
            <div class="editJobLevelDiv2 mt-10">
                <el-tag>职称等级</el-tag>
                <el-select class="addJobLevelSelect ml-10" placeholder="职称级别" size="small"
                           v-model="editJobLevel    .titleLevel">
                    <el-option :key="titleLevel.value" :label="titleLevel.label"
                               :value="titleLevel.value" size="small" v-for="titleLevel in titleLevels"></el-option>
                </el-select>
            </div>
            <span class="dialog-footer" slot="footer">
                <el-button @click="hideEditView">取 消</el-button>
                <el-button @click="updateJobLevel" type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "JobLevelMana",
        data() {
            return {
                titleLevels: [
                    {
                        value: '正高级',
                        label: '正高级'
                    },
                    {
                        value: '副高级',
                        label: '副高级'
                    },
                    {
                        value: '中级',
                        label: '中级'
                    },
                    {
                        value: '低级',
                        label: '低级'
                    },
                    {
                        value: '员级',
                        label: '员级'
                    }
                ],
                jobLevel: {
                    name: '',
                    titleLevel: ''
                },
                editJobLevel: {
                    name: '',
                    titleLevel: ''
                },
                jobLevels: [],
                multipleSelection: [],
                dialogVisible: false
            }
        },
        mounted() {
            this.initJobLevel();
        },
        methods: {
            initJobLevel() {
                this.getRequest('/system/basic/jobLevel/').then(resp => {
                    if (resp) {
                        this.jobLevels = resp;
                        this.jobLevel.name = '';
                        this.jobLevel.titleLevel = '';
                    }
                });
            },
            addJobLevel() {
                if (!this.jobLevel.name) {
                    this.$message.error('职称名称不能为空！');
                    return;
                }
                if (!this.jobLevel.titleLevel) {
                    this.$message.error('职称级别不能为空！');
                    return;
                }
                this.postRequest('/system/basic/jobLevel/', this.jobLevel).then(resp => {
                    if (resp) {
                        this.initJobLevel();
                    }
                });
            },
            showEditView(data) {
                Object.assign(this.editJobLevel, data);
                this.dialogVisible = true;
            },
            hideEditView() {
                this.dialogVisible = false;
            },
            updateJobLevel() {
                if (!this.editJobLevel.name) {
                    this.$message.error('修改的职称名称不能为空！');
                    return;
                }
                if (!this.editJobLevel.titleLevel) {
                    this.$message.error('修改的职称级别不能为空！');
                    return;
                }
                this.putRequest('/system/basic/jobLevel/', this.editJobLevel).then(resp => {
                    if (resp) {
                        this.initJobLevel();
                        this.editJobLevel.name = '';
                        this.editJobLevel.titleLevel = '';
                        this.dialogVisible = false;
                    }
                });
            },
            deleteJobLevel(data) {
                this.$confirm('此操作将永久删除【' + data.name + '】, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/system/basic/jobLevel/' + data.id).then(resp => {
                        if (resp) {
                            this.initJobLevel();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            multiDelete() {
                this.$confirm('此操作将永久删除【' + this.multipleSelection.length + '】条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach(value => {
                        ids += 'ids=' + value.id + '&';
                    });
                    this.deleteRequest('/system/basic/jobLevel/' + ids).then(resp => {
                        if (resp) {
                            this.initJobLevel();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style>
    .mt-10 {
        margin-top: 10px;
    }

    .ml-10 {
        margin-left: 10px;
    }

    .addJobLevelInput, .editJobLevelInput {
        width: 300px;
    }

    .addJobLevelBtn {

    }

    .jobLevelTable {
        width: 780px;

    }
</style>