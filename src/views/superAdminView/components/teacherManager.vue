<template>
  <div id="container">
    <div class="filter-container">
      <div class="header">
        <div class="searchBox">
          <el-input
            v-model="teacherId"
            clearable
            placeholder="输入教师账号"
            prefix-icon="el-icon-search"
            :style="{width: '250px', 'margin': '0px 10px 0px 0px'} "
          />
          <el-button style="margin-right:30px" icon="el-icon-search" circle @click="seacherByid" />
          <el-input
            v-model="teacherName"
            clearable
            placeholder="输入教师姓名"
            prefix-icon="el-icon-search"
            :style="{width: '250px', 'margin': '0px 10px'} "
          />
          <el-button style="margin-right:30px" icon="el-icon-search" circle @click="seacherByName" />
          <el-button type="primary" @click="dialogFormVisible =true">添加教师账号</el-button>
        </div>
      </div>
      <el-table
        v-loading="loading"
        :data="teacherUserList"
        highlight-current-row
        :header-cell-style="{background:'#f0f9eb'}"
        style="width: 100%;"
        row-key="id"
      >
        <el-table-column label="序号" align="center" width="80">
          <template slot-scope="{$index}">
            <span>{{ $index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="账号"
          align="center"
        />
        <el-table-column
          prop="password"
          label="密码"
          align="center"
        />
        <el-table-column
          prop="realName"
          label="姓名"
          align="center"
        />
        <el-table-column
          prop="college"
          label="所属学院"
          align="center"
        />
        <el-table-column
          prop="phone"
          label="联系方式"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="{row}">
            <el-link type="warning" size="mini" @click="resetPassword(row.id)">
              重置密码
            </el-link>
            <el-link style="margin-left:10px" type="danger" size="mini" @click="handleDelete(row)">
              删除
            </el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加教师账号对话框 -->
    <el-dialog class="dialog" title="添加教师账号" :visible.sync="dialogFormVisible" width="30%">
      <el-form ref="ruleForm" status-icon :model="teacherInfo" :rules="rules">
        <el-form-item label="账号:" prop="username" :label-width="formLabelWidth">
          <el-input v-model="teacherInfo.username" autocomplete="off" placeholder="输入账号" />
        </el-form-item>
        <el-form-item label="名字:" prop="name" :label-width="formLabelWidth">
          <el-input v-model="teacherInfo.name" autocomplete="off" placeholder="输入名字" />
        </el-form-item>
        <el-form-item label="性别:" :label-width="formLabelWidth">
          <el-radio v-model="teacherInfo.gender" label="男">男</el-radio>
          <el-radio v-model="teacherInfo.gender" label="女">女</el-radio>
        </el-form-item>

        <!-- <el-form-item label="密码:" :label-width="formLabelWidth">
          <el-input v-model="teacherInfo.password" show-password autocomplete="off" />
        </el-form-item>
        <el-form-item label="再次确认密码:" :label-width="formLabelWidth">
          <el-input v-model="doPassword" show-password autocomplete="off" />
        </el-form-item> -->
        <el-form-item label="学院:" prop="collegeId" :label-width="formLabelWidth">
          <el-select v-model="teacherInfo.collegeId" placeholder="请选择学院" @change="getMajorInfoServlet(teacherInfo.collegeId)">
            <el-option
              v-for="item in collegeList"
              :key="item.index"
              :label="item.college"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="专业:" prop="major" :label-width="formLabelWidth">
          <el-select v-model="teacherInfo.major" placeholder="请选择专业">
            <el-option
              v-for="item in majorList"
              :key="item.index"
              :label="item.major"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTeacherUserServlet">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getTeacherUsers, resetPassword, addTeacherUserServlet, getMajorInfoServlet, getCollegeInfoServlet, deleteUserByIdServlet } from '@/api/superAdmin'

export default {
  components: {

  },
  data() {
    var checkUserName = (rule, value, callback) => {
      const re = /^[0-9a-zA-Z]*$/ // 判断字符串是否为数字和字母组合
      console.log(re.test(value))
      if (!re.test(value)) {
        return callback(new Error('账号只能由数字和字母组成'))
      } else if (value.length < 6) {
        return callback(new Error('账号长度不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      teacherUserList: [],
      tableData: [],
      teacherId: '',
      teacherName: '',
      dialogFormVisible: false,
      teacherInfo: { gender: '男' },
      formLabelWidth: '120px',
      doPassword: '',
      // college: '',
      // major: '',
      collegeList: [],
      majorList: [],
      rules: {
        username: [
          { required: true, validator: checkUserName, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        collegeId: [
          { required: true, message: '请选择学院', trigger: 'blur' }
        ],
        major: [
          { required: true, message: '请选择专业', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getTeacherUsers()
    this.getCollegeInfoServlet()
    this.getMajorInfoServlet()
  },
  methods: {
    handleDelete(row) {
      console.log(row)
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUserByIdServlet({ id: row.id, roles: row.roles })
          .then(res => {
            this.$message({
              message: '删除成功',
              duration: 5000,
              type: 'success'
            })
            this.getTeacherUsers()
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getMajorInfoServlet(id) {
      this.majorList = []
      this.$set(this.teacherInfo, 'major', '')
      // console.log(this.teacherInfo)
      getMajorInfoServlet(id).then(res => {
        this.majorList = res.data
      })
    },
    getCollegeInfoServlet() {
      getCollegeInfoServlet().then(res => {
        this.collegeList = res.data
      })
    },
    getTeacherUsers() {
      this.loading = true
      getTeacherUsers().then(res => {
        this.tableData = res.data
        this.teacherUserList = res.data
        this.loading = false
      })
    },
    resetPassword(id) {
      this.$confirm('此操作将重置该账号密码为123456, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resetPassword(id).then(res => {
          this.$message.success('重置成功，密码为123456')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    seacherByid() {
      this.teacherUserList = []
      if (this.teacherId === '') {
        this.teacherUserList = [...this.tableData]
      } else {
        this.tableData.forEach(el => {
          if (el.id.includes(this.teacherId)) {
            this.teacherUserList.push(el)
            return
          }
        })
      }
    },
    seacherByName() {
      this.teacherUserList = []
      if (this.teacherName === '') {
        this.teacherUserList = [...this.tableData]
      } else {
        this.tableData.forEach(el => {
          if (el.realName.includes(this.teacherName)) {
            this.teacherUserList.push(el)
            return
          }
        })
      }
    },
    addTeacherUserServlet() {
      console.log(this.teacherInfo)
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          addTeacherUserServlet(this.teacherInfo)
            .then(res => {
              console.log(res)
              this.$message({
                message: '添加成功，账号为：' + this.teacherInfo.username + ' , 初始密码为:123456',
                duration: 6000,
                type: 'success'
              })
              this.dialogFormVisible = false
              this.getTeacherUsers()
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
 #container {
    height: 100%;
    width: 100%;
    padding: 12px;
    .filter-container {
      align-items: center;
      background-color: #fff;
      padding: 20px 20px 100px 20px;
      font-size: 14px;
      .header{
        margin-bottom: 1%;
      }
    }
    .dialog{
      .el-input{
        width: 80%;
      }
      .el-select{
        width: 80%;
      }
    }
  }
</style>
