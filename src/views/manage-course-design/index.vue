<template>
  <div class="app-container">
    <el-container>
      <!-- 头部内容 -->
      <el-header>
        <el-button type="success" icon="el-icon-plus" style="float: left" @click="showAddDialog">新增</el-button>
        <!-- <div class="searchBox">
          <el-input
            v-model="searchInfo"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            :style="{width: '250px', 'margin': '0px 10px'} "
          />
          <el-button icon="el-icon-search" circle />
        </div> -->
      </el-header>
      <!-- 主要内容 -->
      <el-main>
        <el-table
          ref="multipleTable"
          :data="tableData.slice((currentPage-1) * pageSize, currentPage * pageSize)"
          style="width: 100%"
        >
          <el-table-column type="index" :index="indexMethod" width="50" align="center" />
          <el-table-column label="课程设计名称" width="auto" prop="practName" align="center" />
          <el-table-column label="课程设计编号" width="auto" prop="id" align="center" />
          <el-table-column label="学生容量" width="120" prop="stuAmountMax" align="center" />
          <el-table-column label="开始日期" width="170" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span style="margin-left: 10px">{{ scope.row.beginTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="结束日期" width="170" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span style="margin-left: 10px">{{ scope.row.endTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="管理员" width="150" prop="managerName" align="center" />
          <el-table-column label="操作" width="250" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button size="medium" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.$index, scope.row)">编辑</el-button>
              <el-button size="medium" type="danger" icon="el-icon-delete" @click.native.prevent="deleteRow(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <!-- 底部内容 -->
      <el-footer>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="tableData.length"
          :current-page="currentPage"
          :page-size="pageSize"
          :hide-on-single-page="tableData.length <= pageSize ? true : false"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-footer>
    </el-container>
    <!-- 添加课程设计的对话框内容 -->
    <el-dialog
      title="新建课程设计"
      :visible.sync="addDialogVisible"
      width="40%"
      @close="addDialogClosed"
    >
      <el-form ref="addFormRef" :model="addForm" :rules="rules" label-position="right" label-width="80px">
        <el-form-item label="课设名称" prop="courseName">
          <el-input v-model="addForm.courseName" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="学生容量" prop="sum">
          <el-input-number v-model="addForm.sum" controls-position="right" :min="1" />
        </el-form-item>
        <el-form-item label="时间" prop="date">
          <el-date-picker
            v-model="addForm.date"
            format="yyyy-MM-dd"
            value-format="yyyy-M-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item v-if="addDialogVisible" label="指导老师" prop="optionValue">
          <el-cascader v-model="addForm.optionValue" :style="{width:'100%'}" :options="options" :props="defaultDate" collapse-tags />
        </el-form-item>
        <el-form-item label="简介" prop="desc">
          <el-input v-model="addForm.desc" placeholder="请输入内容" type="textarea" maxlength="150" show-word-limit resize="none" rows="6" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCourse">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改课程设计的对话框内容 -->
    <el-dialog
      title="修改课程设计"
      :visible.sync="editDialogVisible"
      width="40%"
      @close="editDialogClosed"
    >
      <el-form ref="editFormRef" :model="editForm" :rules="rules" label-position="right" label-width="80px">
        <el-form-item label="课设名称" prop="courseName">
          <el-input v-model="editForm.courseName" />
        </el-form-item>
        <el-form-item label="学生容量" prop="sum">
          <el-input-number v-model="editForm.sum" controls-position="right" :min="1" />
        </el-form-item>
        <el-form-item label="时间" prop="date">
          <el-date-picker
            v-model="editForm.date"
            format="yyyy-MM-dd"
            value-format="yyyy-M-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="简介" prop="desc">
          <el-input v-model="editForm.desc" type="textarea" maxlength="150" show-word-limit resize="none" rows="6" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCourseInfoChange()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import HeaderContainer from './components/HeaderContainer'
import { mapGetters } from 'vuex'
import { getTeacherInfo, createCourse, getCoursesInfo, changeCourseInfo, deleteCourse, getMajor, getColleges } from '@/api/course'
export default {
  name: 'ManageCourseDesign',
  data() {
    return {
      rules: {
        courseName: [{ required: true, message: '请输入课程设计名称', trigger: 'blur' }],
        date: [{ required: true, message: '请选择日期', trigger: 'blur' }],
        optionValue: [{ required: true, message: '请选择指导老师', trigger: 'change' }]
      },
      userId: '', // 用户id
      userName: '', // 用户名
      userMajor: '', // 用户专业
      currentPage: 1, // 当前页码，默认为第 1 页
      pageSize: 5, // 每页的大小
      searchInfo: '', // 搜索关键字
      tableData: [],
      defaultDate: {
        multiple: true,
        value: 'id',
        label: 'name'
      },
      // options: [{
      //   value: '计算机与信息安全学院',
      //   name: '计算机与信息安全学院',
      //   children: [{
      //     value: '软件工程',
      //     name: '软件工程',
      //     children: []
      //   }, {
      //     value: '计算机科学与技术',
      //     name: '计算机科学与技术',
      //     children: []
      //   }]
      // }],
      options: [],
      // 添加课程设计对话框内容
      // 控制添加课程设计对话框的显示与隐藏，默认为隐藏
      addDialogVisible: false,
      // 查询到的添加课程设计对象
      addForm: {
        courseName: '',
        sum: 0,
        date: [],
        optionValue: [],
        value: [],
        desc: ''
      },
      // 修改课程设计对话框内容
      // 控制修改课程设计对话框的显示与隐藏，默认为隐藏
      editDialogVisible: false,
      // 查询到的修改课程设计对象
      editForm: {
        courseName: '',
        practId: '',
        sum: 0,
        date: [],
        desc: ''
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.getUser()
    this.getMajorInfo()
  },
  mounted() {
    this.getTableData(this.userId)
  },
  methods: {
    // 获取专业
    getMajorInfo() {
      getColleges().then(res => {
        for (const i in res.data) {
          if (res.data[i].college === this.user.college) {
            getMajor(res.data[i].id).then(res => {
              for (const i in res.data) {
                this.options.push({
                  name: res.data[i].major,
                  value: res.data[i].major,
                  children: []
                })
              }
            })
          }
        }
      })
    },
    // 获取用户信息
    getUser() {
      this.userId = this.user.id
      this.userName = this.user.name
      this.userMajor = this.user.major
    },
    // 获取表格内容
    getTableData(id) {
      getCoursesInfo(id).then(res => {
        this.tableData = res.data
      }).catch(res => {
        console.log('error')
      })
    },
    // 获取当前列的序号
    indexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1
    },
    // 删除选中的列
    deleteRow(index, row) {
      // this.$message({
      //   message: '删除成功',
      //   type: 'success'
      // })
      // console.log(this.tableData[index].id)
      this.$confirm('此操作将永久删除该课程设计, 是否继续?', '提示', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'warning'
      }).then(() => {
        deleteCourse(row.id).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.tableData.splice(index, 1)
        })
      }).catch(() => {
        this.$message({
          message: '已取消删除',
          type: 'warning'
        })
      })
    },
    handleSizeChange(size) {
      this.pageSize = size
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
    },
    // 编辑课程设计
    // 展示编辑用户的对话框
    async showEditDialog(index, row) {
      this.editForm.courseName = row.practName
      this.editForm.practId = row.id
      this.editForm.sum = row.stuAmountMax
      this.editForm.date = [row.beginTime, row.endTime]
      this.editForm.desc = row.introduction
      this.editDialogVisible = true
    },
    handleCourseInfoChange() {
      this.$refs.editFormRef.validate(valid => {
        if (valid) {
          changeCourseInfo({
            practName: this.editForm.courseName,
            practId: this.editForm.practId,
            stuAmountMax: this.editForm.sum,
            beginTime: this.editForm.date[0],
            endTime: this.editForm.date[1],
            introduction: this.editForm.desc
          }).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.editDialogVisible = false
            this.getTableData(this.userId)
          })
        } else {
          return false
        }
      })
    },
    // 监听编辑对话框的关闭
    editDialogClosed() {
      this.editDialogVisible = false
      this.$refs.editFormRef.resetFields()
    },
    // 新建课程设计
    // 展示新建课程设计的对话框
    async showAddDialog() {
      this.$data.addDialogVisible = true
      for (const i in this.options) {
        getTeacherInfo(this.options[i].name).then(res => {
          this.options[i].children = res.data
        }).catch()
      }
      // getTeacherInfo('计算机科学与技术').then(res => {
      //   this.options[0].children[1].children = res.data
      // })
    },
    // 监听新建课程设计对话框的关闭
    addDialogClosed() {
      // this.addDialogVisible = false
      this.$nextTick(() => {
        this.$refs.addFormRef.resetFields()
      })
    },
    // 添加课程设计
    addCourse() {
      // console.log(this.addForm.optionValue)
      // this.addForm.value = []
      // for (const i in this.addForm.optionValue) {
      //   this.addForm.value.push(this.addForm.optionValue[i][1])
      // }
      // console.log(this.addForm.value)
      this.$refs.addFormRef.validate(valid => {
        if (valid) {
          this.addForm.value = []
          for (const i in this.addForm.optionValue) {
            this.addForm.value.push(this.addForm.optionValue[i][1])
          }
          const temp = {
            'practName': this.addForm.courseName,
            'stuAmountMax': this.addForm.sum,
            'beginTime': this.addForm.date[0],
            'endTime': this.addForm.date[1],
            'managerId': this.userId,
            'managerName': this.userName,
            'teacherId': this.addForm.value,
            'introduction': this.addForm.desc
          }
          createCourse(temp).then(res => {
            // this.tableData.push(temp)
            this.getTableData(this.userId)
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          }).catch(res => {
            this.$message({
              message: '添加失败',
              type: 'warning'
            })
          })
          this.addDialogClosed()
          this.addDialogVisible = false
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  /* .el-header {
    height: 15vh;
  } */

  .el-main {
    height: 63vh;
  }

  .el-footer {
    height: 17vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
