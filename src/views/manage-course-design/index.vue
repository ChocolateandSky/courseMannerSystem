<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <el-button type="success" icon="el-icon-plus" @click="dialogFormVisible=true">新增</el-button>
        <el-dialog title="新建课程设计" :visible.sync="dialogFormVisible">
          <el-form :model="formData" label-width="80px">
            <el-form-item label="课程名称">
              <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item label="指导老师">
              <el-cascader :style="{width:'50%'}" :options="options" :props="{multiple:true }" />
            </el-form-item>
            <el-form-item label="简介">
              <el-input v-model="formData.desc" type="textarea" rows="5" />
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </el-header>
      <el-main>
        <el-table
          ref="multipleTable"
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          style="width: 100%"
          :header-cell-style="{background:'#DCDFE6',color:'#303133'}"
          height="auto"
        >
          <el-table-column type="index" :index="indexMethod" width="50" align="center" />
          <el-table-column label="日期" width="180" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="课程设计名称" width="200" prop="className" align="center" />
          <el-table-column label="课程设计编号" width="250" prop="classNumber" align="center" />
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
export default {
  data() {
    return {
      dialogFormVisible: false,
      options: [{
        value: 1,
        label: '计算机与信息安全学院',
        children: [
          {
            value: 2,
            label: '软件工程专业',
            children: [{ value: 3, label: '小明' }, { value: 4, label: '小红' }]
          },
          { value: 5, label: '计算机科学专业' }
        ]
      }],
      tableData: [
        { date: '2016-05-01', name: '小明', desc: '' },
        { date: '2016-05-02', name: '小明', desc: '' },
        { date: '2016-05-03', name: '小明', desc: '' },
        { date: '2016-05-04', name: '小明', desc: '' },
        { date: '2016-05-02', name: '小明', desc: '' },
        { date: '2016-05-02', name: '小明', desc: '' },
        { date: '2016-05-02', name: '小明', desc: '' }
      ],
      formData: {
        name: '',
        desc: ''
      },
      currentPage: 1,
      pageSize: 6
    }
  },
  methods: {
    // 获取当前列的序号
    indexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1
    },
    // 删除当前列的内容
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
.app-container {
  padding: 12px;
}

.app-container .el-container {
  background-color: #FFFFFF;
  padding: 20px 20px 10px 20px;
}

.app-container .el-container .el-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.app-container .el-container .el-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
