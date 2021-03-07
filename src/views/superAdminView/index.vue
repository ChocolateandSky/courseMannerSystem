<template>
  <div id="container">
    <div class="filter-container">
      <div class="header">
        <div class="searchBox">
          <el-input
            v-model="studentId"
            clearable
            placeholder="输入学生账号"
            prefix-icon="el-icon-search"
            :style="{width: '250px', 'margin': '0px 10px 0px 0px'} "
          />
          <el-button style="margin-right:30px" icon="el-icon-search" circle @click="seacherByid" />
          <el-input
            v-model="studentName"
            clearable
            placeholder="输入学生姓名"
            prefix-icon="el-icon-search"
            :style="{width: '250px', 'margin': '0px 10px'} "
          />
          <el-button style="margin-right:30px" icon="el-icon-search" circle @click="seacherByName" />
        </div>
      </div>
      <el-table
        v-loading="loading"
        :data="studentUserList"
        highlight-current-row
        :header-cell-style="{background:'#f0f9eb'}"
        style="width: 100%"
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
  </div>
</template>

<script>
import { getStudentsUsers, resetPassword, deleteUserByIdServlet } from '@/api/superAdmin'

export default {
  components: {

  },
  data() {
    return {
      loading: false,
      studentUserList: [],
      tableData: [],
      studentId: '',
      studentName: ''
    }
  },
  created() {
    this.getStudentUsers()
  },
  methods: {
    getStudentUsers() {
      this.loading = true
      getStudentsUsers().then((res) => {
        this.tableData = res.data
        this.studentUserList = res.data
        this.loading = false
      }).catch(err => {
        console.log(err)
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
      this.studentUserList = []
      if (this.studentId === '') {
        this.studentUserList = [...this.tableData]
      } else {
        this.tableData.forEach(el => {
          if (el.id.includes(this.studentId)) {
            this.studentUserList.push(el)
            return
          }
        })
      }
    },
    seacherByName() {
      this.studentUserList = []
      if (this.studentName === '') {
        this.studentUserList = [...this.tableData]
      } else {
        this.tableData.forEach(el => {
          if (el.realName.includes(this.studentName)) {
            this.studentUserList.push(el)
            return
          }
        })
      }
    },
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
            this.getStudentUsers()
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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
  }
</style>
