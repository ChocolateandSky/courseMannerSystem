<template>
  <div class="app-container">
    <el-container>
      <!-- 头部内容 -->
      <el-header>
        <el-button type="success" icon="el-icon-plus" style="float: left" @click="showAddDialog">新增</el-button>
        <div class="searchBox">
          <el-input
            v-model="searchInfo"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            :style="{width: '250px', 'margin': '0px 10px'} "
          />
          <el-button icon="el-icon-search" circle />
        </div>
      </el-header>
      <!-- 主要内容 -->
      <el-main>
        <el-table
          ref="multipleTable"
          :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)"
          style="width: 100%"
          :header-cell-style="{background:'#DCDFE6',color:'#303133'}"
          height="371.2"
        >
          <el-table-column label="序号" type="index" :index="indexMethod" width="50" align="center" />
          <el-table-column label="课程名称" width="120" prop="courseName" align="center" />
          <el-table-column label="课程编号" width="120" prop="courseNumber" align="center" />
          <el-table-column label="课程容量" width="120" prop="sum" align="center" />
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
          <el-table-column label="管理员" width="150" prop="admin" align="center" />
          <el-table-column label="操作" width="auto" align="center">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.$index)">编辑</el-button>
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
    <!-- 添加课程设计的对话框内容 -->
    <el-dialog
      title="新建课程设计"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form ref="addFormRef" :model="addForm" label-width="80px">
        <el-form-item label="课程名称:" prop="courseName">
          <el-input v-model="addForm.courseName" :style="{width: '80%'}" />
        </el-form-item>
        <el-form-item label="课程容量" prop="sum">
          <el-input-number v-model="addForm.sum" controls-position="right" :min="1" />
        </el-form-item>
        <el-form-item label="时间" prop="date">
          <el-date-picker
            v-model="addForm.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="指导老师:" prop="value">
          <el-cascader v-model="addForm.value" :style="{width:'80%'}" :options="options" :props="defaultDate" collapse-tags />
        </el-form-item>
        <el-form-item label="简介:" prop="desc">
          <el-input v-model="addForm.desc" type="textarea" resize="none" :style="{width: '80%'}" rows="7" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addDialogClosed">取 消</el-button>
        <el-button type="primary" @click="addCourse">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改课程设计的对话框内容 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form ref="editFormRef" :model="editForm" label-width="80px">
        <el-form-item label="课程名称:" prop="courseName">
          <el-input v-model="editForm.className" :style="{width: '80%'}" />
        </el-form-item>
        <el-form-item label="管理员:" prop="admin">
          <el-input v-model="editForm.admin" :style="{width: '80%'}" />
        </el-form-item>
        <el-form-item label="课程容量" prop="sum">
          <el-input-number v-model="editForm.sum" controls-position="right" :min="1" />
        </el-form-item>
        <el-form-item label="时间" prop="date">
          <el-date-picker
            v-model="editForm.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="指导老师:" prop="tearchers">
          <el-cascader :style="{width:'80%'}" :options="options" :props="{multiple:true }" collapse-tags />
        </el-form-item>
        <el-form-item label="简介:" prop="desc">
          <el-input v-model="editForm.desc" type="textarea" resize="none" :style="{width: '80%'}" rows="7" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import HeaderContainer from './components/HeaderContainer'
import { getTeacherInfo } from '@/api/course'
export default {
  components: {
    // HeaderContainer
  },
  data() {
    return {
      currentPage: 1, // 当前页码，默认为第 1 页
      pageSize: 5, // 每页的大小
      searchInfo: '', // 搜索关键字
      tableData: [
        { courseName: '软件工程', sum: 100, beginDate: '2016-05-01', endDate: '2016-05-01', admin: '小明', desc: '' },
        { courseName: '软件工程', sum: 100, beginDate: '2016-05-02', endDate: '2016-05-01', admin: '小红', desc: '' },
        { courseName: '软件工程', sum: 100, beginDate: '2016-05-01', endDate: '2016-05-01', admin: '小王', desc: '' },
        { courseName: '软件工程', sum: 100, beginDate: '2016-05-02', endDate: '2016-05-01', admin: '小明', desc: '' },
        { courseName: '软件工程', sum: 100, beginDate: '2016-05-01', endDate: '2016-05-01', admin: '小明', desc: '' },
        { courseName: '软件工程', sum: 100, beginDate: '2016-05-02', endDate: '2016-05-01', admin: '小明', desc: '' },
        { courseName: '软件工程', sum: 100, beginDate: '2016-05-03', endDate: '2016-05-01', admin: '小明', desc: '' }
      ],
      defaultDate: {
        multiple: true,
        value: 'id',
        label: 'name'
      },
      // 添加课程设计对话框内容
      options: [{
        value: '计算机与信息安全学院',
        name: '计算机与信息安全学院',
        children: [{
          value: '软件工程',
          name: '软件工程',
          children: []
        }]
      }],
      // 添加课程设计对话框内容
      // 控制添加课程设计对话框的显示与隐藏，默认为隐藏
      addDialogVisible: false,
      addForm: {
        courseName: '',
        sum: '',
        date: '',
        value: [],
        desc: ''
      },
      // 修改课程设计对话框内容
      // 控制修改课程设计对话框的显示与隐藏，默认为隐藏
      editDialogVisible: false,
      // 查询到的修改课程设计对象
      editForm: {}
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
    },
    // 展示编辑用户的对话框
    async showEditDialog(index) {
      // console.log(id)
      // const { data: res } = await this.$http.get('users/' + id)
      // if (res.meta.status !== 200) {
      //   return this.$message.error('查询用户信息失败！')
      // }
      // this.editForm = res.data
      this.editForm.courseName = this.tableData[index].courseName
      this.editForm.admin = this.tableData[index].admin
      this.editForm.sum = this.tableData[index].sum
      this.editDialogVisible = true
    },
    // 监听对话框的关闭
    editDialogClosed() {
      this.editDialogVisible = false
      this.$refs.editFormRef.resetFields()
    },
    async showAddDialog() {
      this.$data.addDialogVisible = true
      getTeacherInfo('软件工程').then(res => {
        this.options[0].children[0].children = res.data
      })
    },
    addDialogClosed() {
      this.addDialogVisible = false
      this.$refs.addFormRef.resetFields()
    },
    addCourse() {
      // const course = {
      //   'pracName': '软件工程课程设计',
      //   'stuAmountMax': 50,
      //   'beginTime': '2020-6-27',
      //   'endTime': '2020-10-31',
      //   'managerId': '3001',
      //   'teacherId': ['1800301330', '1800301311']
      // }
      // createCourse(course).then(res => {
      //   console.log('success')
      // }).catch(res => {
      //   console.log('error')
      // })
      for (let i = 0; i < this.addForm.value.length; i++) {
        console.log(this.addForm.value[i][2])
      }
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
