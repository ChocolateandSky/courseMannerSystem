<template>
  <div id="container">
    <div v-loading="loading" class="filter-container">
      <div class="header">
        <div class="searchBox">
          <el-input
            v-model="studentName"
            clearable
            placeholder="请输入学生姓名"
            prefix-icon="el-icon-search"
            :style="{width: '250px', 'margin': '0px 10px'} "
          />
          <el-button style="margin-right:30px" icon="el-icon-search" circle @click="seacherName" />
          <el-select v-model="teacherName" clearable placeholder="可筛选指导老师">
            <el-option
              v-for="item in teacherList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
          <el-select v-model="practName" style="margin-left:15px" clearable placeholder="可筛选课设">
            <el-option
              v-for="item in practList"
              :key="item.id"
              :label="item.practName"
              :value="item.practName"
            />
          </el-select>
          <el-select v-model="groupStudent" style="margin-left:15px" clearable placeholder="学生筛选">
            <el-option
              v-for="(item,index) in isAddGroup"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <el-button class="pan-btn green-btn message-btn" style="margin-left:20px" @click="handlePostMessage">发布公告</el-button>
        <el-button class="pan-btn green-btn message-btn" style="margin-left:20px" @click="exportingStudentListDialog=true">导出学生名单</el-button>
      </div>
      <div>
        <div v-if="empty">
          <el-divider />
          <h2 style="margin-left:40%">抱歉，暂时没有数据</h2>
        </div>
        <el-collapse v-else accordion class="groupCollapse">
          <el-collapse-item v-for="(item,index) in dataList" :key="index">
            <template slot="title" style="postion:relative">
              <div style="font-size: 15px;"> {{ item.stuId }}{{ item.stuName }}</div>
              <div style="font-size: 15px;">——{{ item.practName }}</div>
              <el-button v-if="'groupId' in item" type="text" size="mini" class="groupDetail groupDetailHover" @click.native="checkGroup(item)">查看所属小组详情</el-button>
              <div v-else class="groupDetail " style="color:rgb(122,39,251)">该同学未加入小组</div>
            </template>
            <div style="font-size: 13px;margin-left:18px">专业：软件工程</div>
            <div style="font-size: 13px;margin-left:18px">指导老师：{{ item.teacherName }}</div>
            <div style="font-size: 13px;margin-left:18px">小组题目：{{ item.subName }}</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <notice
      :dialog-table-visible="dialogShow"
      :practicum-list="practicumList"
      @close="close"
    />

    <!-- 导出课设 -->
    <el-dialog title="" :visible.sync="exportingStudentListDialog" width="20%">
      <el-form>
        <el-form-item label="您所指导的课设：" :label-width="formLabelWidth">
          <el-select v-model="expostStudentInfo.practId" clearable style="width:100%" placeholder="请选择课设">
            <el-option
              v-for="item in practicumList"
              :key="item.value"
              :label="item.practName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exportingStudentListDialog = false">取 消</el-button>
        <el-button type="primary" @click="exportingStudentList">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import notice from './components/notice'
import { getAllStudentList, getTeacherList, getAllPracticum } from '@/api/user'
import { exportingStudentList } from '@/api/file'
import { getCoursesInfo } from '@/api/course'
export default {
  components: {
    notice
  },
  data() {
    return {
      dialogShow: false,
      exportingStudentListDialog: false,
      uploadDialogShow: false,
      studentName: '',
      teacherName: '',
      teacherList: [],
      dataList: [],
      empty: true,
      tempDataList: [],
      teacherId: this.$store.getters.user.id,
      roles: this.$store.getters.roles,
      loading: false,
      practName: '',
      practList: [],
      groupStudent: '',
      isAddGroup: ['未加入小组学生', '已加入小组学生'],
      expostStudentInfo: {
        teacherId: '',
        practId: ''
      },
      practicumList: []
    }
  },
  watch: {
    teacherName(newValue, oldValue) {
      this.loading = true
      this.practName = ''
      this.groupStudent = ''
      if (newValue === '') {
        this.dataList = [...this.tempDataList]
      } else {
        this.dataList = []
        this.tempDataList.forEach(el => {
          if (el.teacherName === newValue) {
            this.dataList.push(el)
          }
        })
      }
      if (this.dataList.length === 0) {
        this.empty = true
      } else {
        this.empty = false
      }
      this.loading = false
    },
    practName(newValue, oldValue) {
      this.loading = true
      this.teacherName = ''
      this.groupStudent = ''
      if (newValue === '') {
        this.dataList = [...this.tempDataList]
      } else {
        this.dataList = []
        this.tempDataList.forEach(el => {
          if (el.practName === newValue) {
            this.dataList.push(el)
          }
        })
      }
      if (this.dataList.length === 0) {
        this.empty = true
      } else {
        this.empty = false
      }
      this.loading = false
    },
    groupStudent(newValue) {
      this.loading = true
      this.teacherName = ''
      this.practName = ''
      if (newValue === '') {
        this.dataList = [...this.tempDataList]
      } else if (newValue === '已加入小组学生') {
        this.dataList = []
        this.tempDataList.forEach(el => {
          if ('groupId' in el) {
            this.dataList.push(el)
          }
        })
      } else {
        this.dataList = []
        this.tempDataList.forEach(el => {
          if (!('groupId' in el)) {
            this.dataList.push(el)
          }
        })
      }
      if (this.dataList.length === 0) {
        this.empty = true
      } else {
        this.empty = false
      }
      this.loading = false
    }
  },
  mounted() {
    this.loading = true
    this.getAllStudentList()
    this.getBaseInfo()
    this.getCoursesInfo()
  },
  methods: {
    getCoursesInfo() { // 获取某个老师下的课设
      getCoursesInfo(this.$store.getters.user.id).then(res => {
        this.practicumList = res.data
      })
    },
    exportingStudentList() {
      this.expostStudentInfo.teacherId = this.$store.getters.user.id
      console.log(this.expostStudentInfo)
      exportingStudentList(this.expostStudentInfo)
    },
    handlePostMessage() {
      this.dialogShow = true
    },
    close() {
      this.dialogShow = false
      this.uploadDialogShow = false
    },
    checkGroup(item) {
      this.$router.push({
        name: 'GroupDetails',
        query: {
          teamId: item.groupId
        }
      })
    },
    getAllStudentList() { // 获取所有课设
      this.roles = this.roles.toString()
      getAllStudentList(this.teacherId, this.roles)
        .then(res => {
          this.dataList = res.data
          this.tempDataList = res.data
          if (this.tempDataList.length === 0) {
            this.empty = true
          } else {
            this.empty = false
          }
          // console.log(this.dataList)
        })
    },
    async  getBaseInfo() {
      await getTeacherList().then(res => {
        this.teacherList = res.data
      })
      await getAllPracticum().then(res => {
        this.practList = res.data
      })
      console.log(this.dataList)
      this.loading = false
    },
    seacherName() {
      this.loading = true
      if (this.studentName === '') {
        this.dataList = [...this.tempDataList]
      } else {
        this.dataList = []
        this.tempDataList.forEach(el => {
          if (el.stuName.includes(this.studentName)) {
            this.dataList.push(el)
          }
        })
      }
      if (this.dataList.length === 0) {
        this.empty = true
      } else {
        this.empty = false
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
  #container {
    height: 100%;
    width: 100%;
    padding: 12px;
    .groupDetail{
      position: absolute;
      font-size: 15px;
      right: 100px;
      color:rgb(242,107,58)
    }
    .groupDetailHover:hover{
      color:rgb(48,176,143);
      font-size: 18px;
    }
    .filter-container {
      align-items: center;
      background-color: #fff;
      padding: 20px 20px 100px 20px;
      font-size: 14px;

      .header {
        margin-bottom: 20px;
        display: flex;
      }

      .groupCollapse {
        .el-collapse-item {
          .el-collapse-item__header {
            color: rgb(64, 158, 225);
          }
        }
      }
    }
  }
</style>
