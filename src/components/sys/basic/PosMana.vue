<template>
    <div>
        <div>
            <el-input class="addPosInput" placeholder="添加职位..." prefix-icon="el-icon-plus" size="small"
                      v-model="pos.name"></el-input>
            <el-button @click="addPosition" icon="el-icon-plus" size="small" style="" type="primary">添加</el-button>
        </div>
        <div>
            <el-table :data="positions" @selection-change="handleSelectionChange" border class="posTable" size="small"
                      stripe>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="编号" prop="id" width="55"></el-table-column>
                <el-table-column label="职位名称" prop="name"></el-table-column>
                <el-table-column label="创建时间" prop="createDate" width="180"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button
                                @click="showEditView(scope.$index, scope.row)"
                                size="mini">编辑
                        </el-button>
                        <el-button
                                @click="deletePosition(scope.$index, scope.row)"
                                size="mini"
                                type="danger">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button :disabled="!multipleSelection.length" @click="multiDelete" class="multiDelete" size="small"
                       type="danger">批量删除
            </el-button>
        </div>
        <el-dialog :visible.sync="dialogVisible" title="修改职位" width="20%">
            <div>
                <el-tag>职位名称</el-tag>
                <el-input class="editPosInput" size="small" v-model="editPos.name"></el-input>
            </div>
            <span class="dialog-footer" slot="footer">
                <el-button @click="hideEditView" size="small">取 消</el-button>
                <el-button @click="editPosition" size="small" type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'PosMana',
        data() {
            return {
                pos: {
                    name: ''
                },
                positions: [],
                dialogVisible: false,
                editPos: {
                    name: ''
                },
                multipleSelection: []
            }
        },
        mounted() {
            this.initPositions();
        },
        methods: {
            initPositions() {
                this.getRequest('/system/basic/pos/').then(resp => {
                    if (resp) {
                        this.positions = resp;
                        this.pos.name = '';
                    }
                })
            },
            addPosition() {
                if (this.pos.name) {
                    this.postRequest('/system/basic/pos/', this.pos).then(resp => {
                        if (resp) {
                            this.initPositions();
                        }
                    });
                } else {
                    this.$message.error('职位名称不能为空！');
                }
            },
            showEditView(index, data) {
                Object.assign(this.editPos, data);
                this.dialogVisible = true;
            },
            hideEditView() {
                this.dialogVisible = false;
            },
            editPosition() {
                if (this.editPos.name) {
                    this.putRequest('/system/basic/pos/', this.editPos).then(resp => {
                        if (resp) {
                            this.initPositions();
                            this.editPos.name = '';
                            this.dialogVisible = false;
                        }
                    });
                } else {
                    this.$message.error('修改的职位名称不能为空！');
                }
            },
            deletePosition(index, data) {
                this.$confirm('此操作将永久删除【' + data.name + '】职位, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/system/basic/pos/' + data.id).then(resp => {
                        if (resp) {
                            this.initPositions();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            multiDelete() {
                this.$confirm('此操作将永久删除【' + this.multipleSelection.length + '】条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach((value, index) => {
                        ids += 'ids=' + value.id + '&';
                    });
                    this.deleteRequest('/system/basic/pos/' + ids).then(resp=> {
                        if (resp) {
                            this.initPositions();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style>
    .addPosInput {
        width: 300px;
        margin-right: 10px;
    }

    .posTable {
        width: 610px;
        margin-top: 10px;
    }

    .editPosInput {
        width: 200px;
        margin-left: 8px;
    }

    .multiDelete {
        margin-top: 8px;
    }
</style>