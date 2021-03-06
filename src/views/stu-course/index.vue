<template>
  <div>
    <el-container v-loading="loading">
      <el-header>
        <el-select v-model="select" class="input-with-select" style="width: 80px" placeholder="筛选" @change="filterData">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-header>
      <el-main>
        <el-table :data="filterTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%">
          <el-table-column type="index" width="50" align="center">
            <template slot-scope="scope">
              <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="courseName" label="课程设计名称" width="auto" align="center" />
          <el-table-column prop="courseNumber" label="课程设计编号" width="auto" align="center" />
          <el-table-column prop="num1" label="学生容量" width="150" align="center" />
          <el-table-column prop="num2" label="当前人数" width="150" align="center" />
          <el-table-column label="开始日期" width="200" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span style="margin-left: 10px">{{ scope.row.beginDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="结束日期" width="200" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span style="margin-left: 10px">{{ scope.row.endDate }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="admin" label="管理员" width="120" align="center" />
          <el-table-column label="操作" align="center" width="230" fixed="right">
            <template slot-scope="scope">
              <el-popconfirm
                v-if="scope.row.buttonVisible"
                confirm-button-text="确认"
                cancel-button-text="取消"
                title="是否要加入该课程设计？"
                @onConfirm="handleAddCourses(scope.$index, scope.row)"
                @onCancel="$message({type: 'info', message: '已取消'})"
              >
                <el-button slot="reference" size="medium" type="primary">选课</el-button>
              </el-popconfirm>
              <div v-else>
                <el-button size="medium" type="success" icon="el-icon-view" @click="handleReadInfo(scope.$index, scope.row)">查看</el-button>
                <el-button size="medium" type="danger" @click="handleExitCourse(scope.$index, scope.row)">退出<i class="el-icon-close el-icon--right" /></el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="filterTableData.length"
          :hide-on-single-page="filterTableData.length <= pageSize ? true : false"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getStuChosenCourseInfo, getStuNotChosenCourseInfo, studentAddCourse, studentExitCourse, checkIsClassLeader, removeLeaderTeam } from '@/api/course'
import { getStuChosenGroupInfo } from '@/api/stu-group'
export default {
  data() {
    return {
      loading: true,
      currentPage: 1,
      pageSize: 5,
      filterTableData: [],
      tableData: [],
      select: '',
      options: [
        { value: 'all', label: '全部' },
        { value: '0', label: '未选' },
        { value: '1', label: '已选' }
      ],
      userId: '',
      userName: '',
      major: ''
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.getUser()
  },
  mounted() {
    this.getTableDate(this.userId)
    this.filterData()
  },
  methods: {
    getUser() {
      this.userId = this.user.id
      this.userName = this.user.name
      this.major = this.user.major
    },
    getTableDate(id) {
      getStuChosenCourseInfo(id).then(res => {
        for (const i in res.data) {
          this.tableData.push({
            courseName: res.data[i].practName,
            courseNumber: res.data[i].id,
            num1: res.data[i].stuAmountMax,
            num2: res.data[i].stuNum,
            beginDate: res.data[i].beginTime,
            endDate: res.data[i].endTime,
            admin: res.data[i].managerName,
            teacherId: res.data[i].managerId,
            buttonVisible: false
          })
        }
        getStuNotChosenCourseInfo(id).then(res => {
          for (const i in res.data) {
            this.tableData.push({
              courseName: res.data[i].practName,
              courseNumber: res.data[i].id,
              num1: res.data[i].stuAmountMax,
              num2: res.data[i].stuNum,
              beginDate: res.data[i].beginTime,
              endDate: res.data[i].endTime,
              admin: res.data[i].managerName,
              teacherId: res.data[i].managerId,
              buttonVisible: true
            })
          }
          this.loading = false
        })
      })
    },
    filterData(val) {
      this.currentPage = 1
      switch (val) {
        case '0': this.filterTableData = this.tableData.filter(item => item.buttonVisible === true); break
        case '1': this.filterTableData = this.tableData.filter(item => item.buttonVisible === false); break
        default: this.filterTableData = this.tableData; break
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleAddCourses(index, row) {
      // console.log(index)
      // this.tableData[(this.currentPage - 1) * this.pageSize + index].buttonVisible = !buttonVisible
      if (row.num1 === row.num2) {
        this.$message({
          type: 'error',
          message: '加入失败，该课程设计已满'
        })
        return
      }
      studentAddCourse({
        'major': this.major,
        'practId': row.courseNumber,
        'practName': row.courseName,
        'stuId': this.userId,
        'stuName': this.userName,
        'managerId': row.teacherId,
        'managerName': row.admin
      }).then(res => {
        row.buttonVisible = !row.buttonVisible
        row.num2++
        this.filterData(this.select)
        this.$message({
          type: 'success',
          message: '加入成功'
        })
      }).catch(res => {
        this.$message({
          type: 'error',
          message: '加入失败'
        })
      })
    },
    handleReadInfo(index, row) {
      // console.log(index, row)
      this.$router.push({
        name: 'courseDetails',
        query: {
          courseId: row.courseNumber,
          courseName: row.courseName,
          teacherName: row.admin,
          teacherId: row.teacherId
        }
      })
    },
    handleExitCourse(index, row) {
      // console.log(index, row)
      // row.buttonVisible = !row.buttonVisible
      getStuChosenGroupInfo({
        stuId: this.userId,
        practId: row.courseNumber
      }).then(res => {
        if (res.data.length === 0) {
          this.$confirm('此操作将退出该课程设计, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            studentExitCourse({
              stuId: this.userId,
              practId: row.courseNumber
            }).then(res => {
              row.buttonVisible = !row.buttonVisible
              row.num2--
              // this.filterData(this.select)
              if (this.select === '0' || this.select === '1') {
                this.filterTableData.splice(index, 1)
              }
              this.$message({
                type: 'success',
                message: '退出成功'
              })
            }).catch(res => {
              this.$message({
                type: 'error',
                message: '退出失败'
              })
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消退出'
            })
          })
        } else {
          checkIsClassLeader(this.userId, row.courseNumber).then(res => {
            if (res.data.leader) {
              this.$confirm('退出该课程设计将解散你创建的小组, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                // 代码写这
                removeLeaderTeam(this.userId, row.courseNumber).then(res => {
                  row.buttonVisible = !row.buttonVisible
                  row.num2--
                  // this.filterData(this.select)
                  if (this.select === '0' || this.select === '1') {
                    this.filterTableData.splice(index, 1)
                  }
                  this.$message({
                    type: 'success',
                    message: '退出成功'
                  })
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消退出'
                })
              })
            } else {
              this.$confirm('此操作将退出该课程设计, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                studentExitCourse({
                  stuId: this.userId,
                  practId: row.courseNumber
                }).then(res => {
                  row.buttonVisible = !row.buttonVisible
                  row.num2--
                  // this.filterData(this.select)
                  if (this.select === '0' || this.select === '1') {
                    this.filterTableData.splice(index, 1)
                  }
                  this.$message({
                    type: 'success',
                    message: '退出成功'
                  })
                }).catch(res => {
                  this.$message({
                    type: 'error',
                    message: '退出失败'
                  })
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消退出'
                })
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
 .el-header {
    /* background-color: #B3C0D1; */
    color: #333;
    height: 20vh;
    line-height: 80px;
  }

  .el-main {
    /* background-color: #E9EEF3; */
    color: #333;
    height: 63vh;
  }

  .el-footer {
    color: #333;
    height: 17vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
