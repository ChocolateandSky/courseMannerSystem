<template>
  <div class="app-container">
    <div
      v-loading="loading"
      class="filter-container"
    >
      <div class="searchBox">
        <el-select v-model="practicum" style="margin-right:15px" clearable placeholder="可筛选课程设计">
          <el-option
            v-for="item in practicumList"
            :key="item.id"
            :label="item.practName"
            :value="item.practName"
          />
        </el-select>
        <el-select v-if="role===2" v-model="teacherName" clearable placeholder="可筛选指导老师">
          <el-option
            v-for="item in teacherList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
        <!-- <el-button style="margin-left:10px;margin-right:10px" icon="el-icon-search" circle /> -->
      </div>
      <el-divider />
      <div class="main-content">
        <div v-if="empty">
          <el-divider />
          <h2 style="margin-left:40%">抱歉，暂时没有数据</h2>
        </div>
        <el-row>
          <el-col v-for="(item,index) in fromData" :key="index" :span="6">
            <el-card v-waves style="margin-bottom:20px" :body-style="{ padding: '0px'}">
              <div slot="header" style="height:25px" class="clearfix">
                <span style="margin-right:5px">{{ item.subName }}</span>
                <span style="color:rgb(66,185,131)">({{ item.practName }})</span>
              </div>
              <div style="padding: 20px;">
                <p style="color:rgb(66,185,131)">指导老师：{{ item.teacherName }}</p>
                <p>小组名称：{{ item.name }}</p>
                <p>组长名字：{{ item.leaderName }}</p>
                <p>小组人数：{{ item.stuNumber }}</p>
              </div>
              <div class="card-foot">
                <el-row>
                  <el-col :span="12">
                    <el-link icon="el-icon-edit" type="primary" @click.native="groupDetails(item.id)">详情编辑</el-link>
                  </el-col>
                  <el-col :span="12">
                    <el-link v-if="role!==0" icon="el-icon-delete" type="danger" @click.native="DeteleGroup(index)">删除</el-link>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <fill-person-info
      :dialog-form-visible="dialogFormVisible"
      @close="close"
    />
  </div>
</template>

<script>
import fillPersonInfo from './components/fillPersonInfo'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { getGroupList, getHomeListInStudent } from '@/api/group'
import { getTeacherList, getAllPracticum } from '@/api/user'
export default {
  components: {
    fillPersonInfo
  },
  directives: {
    waves
  },
  data() {
    return {
      dialogFormVisible: false,
      autoHeight: '200px',
      // lineNum: 0,
      practicum: '',
      teacherName: '',
      practicumList: [],
      teacherList: [],
      fromData: [],
      empty: [],
      tempFromData: [],
      role: 0,
      loading: false
    }
  },
  watch: {
    teacherName(newValue, oldValue) {
      this.loading = true
      this.practName = ''
      if (newValue === '') {
        this.fromData = [...this.tempFromData]
      } else {
        this.fromData = []
        this.tempFromData.forEach(el => {
          if (el.teacherName === newValue) {
            this.fromData.push(el)
          }
        })
      }
      if (this.fromData.length === 0) {
        this.empty = true
      } else {
        this.empty = false
      }
      this.loading = false
    },
    practicum(newValue, oldValue) {
      this.loading = true
      this.teacherName = ''
      if (newValue === '') {
        this.fromData = [...this.tempFromData]
      } else {
        this.fromData = []
        this.tempFromData.forEach(el => {
          if (el.practName === newValue) {
            this.fromData.push(el)
          }
        })
      }
      if (this.fromData.length === 0) {
        this.empty = true
      } else {
        this.empty = false
      }
      this.loading = false
    }
  },
  mounted() {
    this.loading = true
    this.judgeFirstLogin()
    this.judgeRole()
    if (this.$store.getters.roleNum === 0) {
      this.getHomeListInStudent(this.$store.getters.user.id)
    } else {
      this.getGroupList(this.$store.getters.user.id)
    }
    this.getBaseIfo()
    this.getAutoHeight()
    window.onresize = () => {
      this.getAutoHeight()
    }
  },
  methods: {
    judgeRole() {
      if (this.$store.getters.roles.includes('admin')) {
        this.role = 2
      } else if (this.$store.getters.roles.includes('teacher')) {
        this.role = 1
      } else {
        this.role = 0
      }
    },
    getHomeListInStudent(id) {
      getHomeListInStudent(id).then(res => {
        this.fromData = res.data
        this.tempFromData = res.data
        if (this.tempFromData.length === 0) {
          this.empty = true
        } else {
          this.empty = false
        }
      })
    },
    judgeFirstLogin() {
      if (this.$store.getters.user.email === 'null') {
        this.dialogFormVisible = true
      }
    },
    close() {
      this.dialogFormVisible = false
    },
    getAutoHeight() {
      this.$nextTick(() => {
        this.autoHeight = window.innerHeight - (100) + 'px'
      })
    },
    groupDetails(id) {
      this.$router.push({
        name: 'GroupDetails',
        query: {
          teamId: id
        }
      })
    },
    DeteleGroup($event) {
      console.log($event)
      delete $event.target
      this.$confirm('确定删除该类型吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('删除成功')
      }).catch(() => {
        console.error('catch err')
        this.$message.error('删除失败')
      })
    },
    getGroupList(id) {
      getGroupList(id)
        .then(res => {
          this.fromData = res.data
          this.tempFromData = res.data
          if (this.tempFromData.length === 0) {
            this.empty = true
          } else {
            this.empty = false
          }
        })
    },
    async getBaseIfo() {
      await getTeacherList().then(res => {
        this.teacherList = res.data
      })
      await getAllPracticum().then(res => {
        this.practicumList = res.data
      })
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.component-item{
  min-height: 100px;
}
  .app-container{
    height: 100%;
    width: 100%;
    padding: 12px;
    .filter-container{
      align-items: center;
      background-color: #fff ;
      padding: 20px 20px 10px 20px;
      font-size: 14px;
      .el-row{
        margin-bottom: 100px;
      .el-col{
        padding: 0 2%;
      }
      }
    .el-card{
   .card-foot{
        padding: 0 20px;
        margin: 0 0 20px 0;
        .el-row{
          margin: 0;
          text-align: center;
          .el-link{
              font-size: 15px;
          }
          .el-link:hover{
            color:rgb(100,217,214)
          }
        }
      }
        &:hover {
        box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.2);
        backface-visibility: hidden;
        transform: translateY(-5px);
        cursor: pointer;
      }
    }
    }
 }
 .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
