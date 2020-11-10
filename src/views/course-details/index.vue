<template>
  <div class="app">
    <el-row :gutter="15" type="flex" justify="center">
      <el-col :span="10">
        <el-tabs v-model="activeName1" class="left" type="border-card">
          <el-tab-pane label="课程简介" name="first">
            <p>{{ courseDesc }}</p>
          </el-tab-pane>
          <el-tab-pane label="老师详情" name="second">
            <el-collapse v-model="activeName2" accordion>
              <el-collapse-item v-for="(item, index) in teachersInfo" :key="item.id" :title="item.name" :name="index">
                <div>电话号码：{{ item.phone }}</div>
                <div>邮箱：{{ item.email }}</div>
                <div>个人简介：{{ item.introduction }}</div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="12">
        <div class="right" />
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="22">
        <el-button type="success" icon="el-icon-plus" @click="dialogFormVisible = true">新建小组</el-button>
        <el-dialog title="小组信息" :visible.sync="dialogFormVisible" width="40%" @open.once="handleDialogOpen()" @close="handleDialogClose()">
          <el-form ref="form" :model="form" :rules="rules" label-position="right" label-width="80px">
            <el-form-item label="小组名称" prop="teamName">
              <el-input v-model="form.teamName" />
            </el-form-item>
            <el-form-item label="课题" prop="subject">
              <el-input v-model="form.subject" />
            </el-form-item>
            <el-form-item label="小组人数" prop="num">
              <el-input-number v-model="form.num" controls-position="right" :min="1" :max="5" />
            </el-form-item>
            <el-form-item label="指导老师" prop="teacher">
              <el-select v-model="form.teacher" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="简介" prop="desc">
              <el-input
                v-model="form.desc"
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                resize="none"
                maxlength="150"
                show-word-limit
              />
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleCreateNewGroup()">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="22">
        <div class="tableBox">
          <el-table :data="tableData" style="width: 100%" max-height="230">
            <el-table-column type="index" width="50" align="center" />
            <el-table-column prop="name" label="小组名称" width="auto" align="center" />
            <el-table-column prop="subject" label="课题" width="auto" align="center" />
            <el-table-column prop="leader" label="组长" width="180" align="center" />
            <el-table-column prop="teacher" label="指导老师" width="180" align="center" />
            <el-table-column prop="num" label="小组容量" width="180" align="center" />
            <el-table-column prop="num2" label="当前人数" width="180" align="center" />
            <el-table-column label="操作" align="center" width="230" fixed="right">
              <template slot-scope="scope">
                <el-popconfirm
                  v-if="scope.row.buttonVisible"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  title="是否要加入该小组？"
                  @onConfirm="handleEnterTeam(scope.$index, scope.row)"
                  @onCancel="$message({type: 'info', message: '已取消'})"
                >
                  <el-button slot="reference" size="medium" type="primary" :disabled="disable">加入</el-button>
                </el-popconfirm>
                <div v-else>
                  <el-button size="medium" type="info" icon="el-icon-view" @click="checkGroup(scope.row)">查看</el-button>
                  <el-button size="medium" type="danger" @click="handleExitGroup(scope.$index, scope.row)">退出<i class="el-icon-close el-icon--right" /></el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getStuChosenGroupInfo, getStuNotChosenGroupInfo, getTeachersInfo, createNewStuGroup, stuEnterGroup, stuExitGroup } from '@/api/stu-group'
import { getStuChosenCourseInfo } from '@/api/course'
export default {
  data() {
    return {
      disable: false,
      activeName1: 'first',
      activeName2: '0',
      tableData: [],
      dialogFormVisible: false,
      options: [],
      form: {
        teamName: '',
        subject: '',
        num: 1,
        teacher: '',
        desc: ''
      },
      rules: {
        teamName: [{ required: true, message: '请输入小组名称', trigger: 'blur' }],
        subject: [{ required: true, message: '请输入课题', trigger: 'blur' }],
        teacher: [{ required: true, message: '请选择指导老师', trigger: 'change' }]
      },
      teachersInfo: [],
      courseId: '',
      stuId: '',
      stuName: '',
      courseDesc: ''
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.getUser()
  },
  mounted() {
    this.getTableData(this.stuId, this.courseId)
    this.handleGetTeachersInfo()
    this.getCourseInfo()
  },
  methods: {
    getUser() {
      this.stuId = this.user.id
      this.stuName = this.user.name
      this.courseId = this.$route.query.courseId
    },
    getCourseInfo() {
      getStuChosenCourseInfo(this.user.id).then(res => {
        for (const i in res.data) {
          if (res.data[i].id === this.courseId) {
            this.courseDesc = res.data[i].introduction
          }
        }
      })
    },
    getTableData(stuId, practId) {
      // console.log(stuId, practId)
      const data = { stuId, practId }
      getStuChosenGroupInfo(data).then(res => {
        if (res.data.length === 1) {
          this.disable = true
        }
        // console.log(res.data)
        for (const i in res.data) {
          this.tableData.push({
            id: res.data[i].id,
            name: res.data[i].name,
            subject: res.data[i].subName,
            leader: res.data[i].leaderName,
            teacher: res.data[i].teacherName,
            num: res.data[i].stuAmountMax,
            num2: res.data[i].stuNumber,
            buttonVisible: false
          })
        }
      })
      getStuNotChosenGroupInfo(data).then(res => {
        for (const i in res.data) {
          this.tableData.push({
            id: res.data[i].id,
            name: res.data[i].name,
            subject: res.data[i].subName,
            leader: res.data[i].leaderName,
            teacher: res.data[i].teacherName,
            num: res.data[i].stuAmountMax,
            num2: res.data[i].stuNumber,
            buttonVisible: true
          })
        }
      })
    },
    handleGetTeachersInfo() {
      getTeachersInfo(this.courseId).then(res => {
        this.teachersInfo = res.data
        // console.log(this.teachersInfo)
      })
    },
    handleEnterTeam(index, row) {
      if (row.num === row.num2) {
        this.$message({
          type: 'error',
          message: '加入失败，该小组已满'
        })
        return
      }
      stuEnterGroup({
        groupId: row.id,
        stuId: this.stuId,
        stuName: this.stuName
      }).then(res => {
        this.$message({
          type: 'success',
          message: '加入成功'
        })
        row.num2++
        this.disable = true
        row.buttonVisible = !row.buttonVisible
      }).catch(res => {
        this.$message({
          type: 'error',
          message: '加入失败'
        })
      })
    },
    handleCreateNewGroup() {
      // console.log(this.options[this.form.teacher])
      this.$refs.form.validate(valid => {
        if (valid) {
          createNewStuGroup({
            introduction: this.form.desc,
            leaderId: this.stuId,
            leaderName: this.stuName,
            managerId: this.$route.query.teacherId,
            managerName: this.$route.query.teacherName,
            name: this.form.teamName,
            practId: this.courseId,
            practName: this.$route.query.courseName,
            stuAmountMax: this.form.num,
            subName: this.form.subject,
            teacherId: this.options[this.form.teacher].teacherId,
            teacherName: this.options[this.form.teacher].label
          }).then(res => {
            this.$message({
              type: 'success',
              message: '创建成功'
            })
            this.dialogFormVisible = false
            this.tableData = []
            this.getTableData(this.stuId, this.courseId)
          }).catch(res => {
            this.$message({
              type: 'error',
              message: '创建失败'
            })
            this.dialogFormVisible = false
          })
        } else {
          return
        }
      })
    },
    handleExitGroup(index, row) {
      this.$confirm('此操作将退出该小组, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        stuExitGroup({
          stuId: this.stuId,
          groupId: row.id
        }).then(res => {
          row.buttonVisible = !row.buttonVisible
          row.num2--
          this.disable = false
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
    },
    handleDialogOpen() {
      getTeachersInfo(this.courseId).then(res => {
        for (const i in res.data) {
          this.options.push({
            label: res.data[i].name,
            value: i,
            teacherId: res.data[i].id
          })
        }
      })
    },
    handleDialogClose() {
      this.$nextTick(() => {
        this.$refs['form'].resetFields()
      })
    },
    checkGroup(row) {
      this.$router.push({
        name: 'GroupDetails',
        query: {
          teamId: row.id
        }
      })
    }
  }
}
</script>

<style scoped>
.tableBox {
  /* width: 100%; */
  height: 300px;
}

.el-row {
  margin-top: 10px;
}

.left, .right {
  height: 100%;
  background-color: #fff;
}

</style>
