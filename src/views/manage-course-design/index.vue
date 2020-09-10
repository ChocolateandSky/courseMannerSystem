<template>
  <el-container>
    <el-header>
      <el-button type="success" icon="el-icon-plus" @click="dialogFormVisible=true">新增</el-button>
      <el-dialog title="新建课程设计" :visible.sync="dialogFormVisible">
        <el-form :model="tableData" />
      </el-dialog>
    </el-header>
    <el-main>
      <el-table ref="multipleTable" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" :header-cell-style="{background:'#DCDFE6',color:'#303133'}" border>
        <el-table-column type="index" :index="indexMethod" width="50" align="center" />
        <el-table-column label="日期" width="180" prop="date" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" width="180" prop="name" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="$">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" @click.native.prevent="deleteRow(scope.$index,tableData)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination background layout="prev, pager, next" :total="tableData.length" :current-page="currentPage" :page-size="pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      tableData: [{ date: '2016-05-01', name: '小明' }, { date: '2016-05-02', name: '小明' }, { date: '2016-05-03', name: '小明' }, { date: '2016-05-04', name: '小明' }, { date: '2016-05-05', name: '小明' }, { date: '2016-05-07', name: '小明' }, { date: '2016-05-08', name: '小明' }, { date: '2016-05-09', name: '小明' }, { date: '2016-05-10', name: '小明' }, { date: '2016-05-11', name: '小明' }, { date: '2016-05-12', name: '小明' }, { date: '2016-05-13', name: '小明' }, { date: '2016-05-14', name: '小明' }, { date: '2016-05-15', name: '小明' }, { date: '2016-05-16', name: '小明' }, { date: '2016-06-01', name: '小明' }, { date: '2016-7-02', name: '小明' }, { date: '2016-08-01', name: '小明' }],
      currentPage: 1,
      pageSize: 6
    }
  },
  methods: {
    indexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1
    },
    deleteRow(index, rows) {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      rows.splice(index, 1)
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>

<style scoped>
.el-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.el-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
