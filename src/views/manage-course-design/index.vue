<template>
  <div class="app-container">
    <el-container>
      <!-- 头部内容 -->
      <el-header>
        <HeaderContainer />
      </el-header>
      <!-- 主要内容 -->
      <el-main>
        <el-table
          ref="multipleTable"
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          style="width: 100%"
          :header-cell-style="{background:'#DCDFE6',color:'#303133'}"
          height="371.2"
        >
          <el-table-column label="序号" type="index" :index="indexMethod" width="50" align="center" />
          <el-table-column label="课程名称" width="120" prop="courseName" align="center" />
          <el-table-column label="课程编号" width="120" prop="courseNumber" align="center" />
          <el-table-column label="课程容量" width="120" prop="" align="center" />
          <el-table-column label="开始日期" width="170" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span style="margin-left: 10px">{{ scope.row.beginDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="结束日期" width="170" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span style="margin-left: 10px">{{ scope.row.endDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="管理员" width="150" prop="adminName" align="center" />
          <el-table-column label="操作" width="auto" align="center">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="$">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" @click.native.prevent="deleteRow(scope.$index,tableData)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <!-- 底部内容 -->
      <el-footer>
        <el-pagination
          layout="prev, pager, next"
          :total="tableData.length"
          :current-page="currentPage"
          :page-size="pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import HeaderContainer from './components/HeaderContainer'
export default {
  components: {
    HeaderContainer
  },
  data() {
    return {
      currentPage: 1, // 当前页数
      pageSize: 5, // 页面大小
      tableData: [
        { beginDate: '2016-05-01', endDate: '2016-05-01', adminName: '小明', desc: '' },
        { beginDate: '2016-05-02', endDate: '2016-05-01', adminName: '小明', desc: '' },
        { beginDate: '2016-05-01', endDate: '2016-05-01', adminName: '小明', desc: '' },
        { beginDate: '2016-05-02', endDate: '2016-05-01', adminName: '小明', desc: '' },
        { beginDate: '2016-05-01', endDate: '2016-05-01', adminName: '小明', desc: '' },
        { beginDate: '2016-05-02', endDate: '2016-05-01', adminName: '小明', desc: '' },
        { beginDate: '2016-05-03', endDate: '2016-05-01', adminName: '小明', desc: '' }
      ]
    }
  },
  methods: {
    // 获取当前列的序号
    indexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1
    },
    // 删除选中的列
    deleteRow(index, rows) {
      // this.$message({
      //   message: '删除成功',
      //   type: 'success'
      // })
      this.$confirm('此操作将永久删除该课程设计, 是否继续?', '提示', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'warning'
      }).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.tableData.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSizeChange(size) {
      this.pageSize = size
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>

<style scoped>
.app-container .el-container {
  background-color: #FFFFFF;
  padding: 20px 20px 10px 20px;
}

.app-container .el-container .el-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
