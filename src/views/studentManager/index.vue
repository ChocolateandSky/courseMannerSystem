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
        </div>
        <el-button class="pan-btn green-btn message-btn" style="margin-left:20px" @click="handlePostMessage">发布公告</el-button>
      </div>
      <div>
        <el-collapse accordion class="groupCollapse">
          <el-collapse-item v-for="(item,index) in dataList" :key="index">
            <template slot="title">
              <div style="font-size: 15px;"> {{ item.stuId }}{{ item.stuName }}</div>
              <div style="font-size: 15px;">——{{ item.practName }}</div>
              <el-button type="text" size="mini" class="groupDetail" style="font-size: 15px;" @click.native="checkGroup(item)">查看所属小组详情</el-button>
            </template>
            <div style="font-size: 13px;margin-left:18px">专业：软件工程</div>
            <div style="font-size: 13px;margin-left:18px">指导老师：{{ item.teacherName }}</div>
            <div style="font-size: 13px;margin-left:18px">小组题目：{{ item.practName }}</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <notice
      :dialog-table-visible="dialogShow"
      @close="close"
    />
  </div>
</template>

<script>
import notice from './components/notice'
import { getAllStudentList, getTeacherList, getAllPracticum } from '@/api/user'

export default {
  components: {
    notice
  },
  data() {
    return {
      dialogShow: false,
      uploadDialogShow: false,
      studentName: '',
      teacherName: '',
      teacherList: [],
      dataList: [],
      tempDataList: [],
      teacherId: this.$store.getters.user.id,
      roles: this.$store.getters.roles,
      loading: false,
      practName: '',
      practList: []
    }
  },
  watch: {
    teacherName(newValue, oldValue) {
      this.loading = true
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
      this.loading = false
    },
    practName(newValue, oldValue) {
      this.loading = true
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
      this.loading = false
    }
  },
  mounted() {
    this.loading = true
    this.getAllStudentList()
    this.getBaseInfo()
  },
  methods: {
    handlePostMessage() {
      console.log('adwqq')
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
    getAllStudentList() {
      this.roles = this.roles.toString()
      getAllStudentList(this.teacherId, this.roles)
        .then(res => {
          this.dataList = res.data
          this.tempDataList = res.data
          console.log(this.dataList)
        })
    },
    async  getBaseInfo() {
      await getTeacherList().then(res => {
        this.teacherList = res.data
      })
      await getAllPracticum().then(res => {
        this.practList = res.data
      })
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
      margin-left:50px;
      color:rgb(242,107,58)
    }
    .groupDetail:hover{
      font-size: 14px;
    }
    .filter-container {
      align-items: center;
      background-color: #fff;
      padding: 20px 20px 10px 20px;
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
