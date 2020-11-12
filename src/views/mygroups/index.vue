<template>
  <div class="mygroups">
    <div
      v-loading="loading"
      class="filter-container"
    >
      <div v-if="empty" style="padding-left:30%;padding-right:30%">
        <h2>抱歉，你没有加入任何小组（<el-link type="primary" @click="goToAddGroup">点击前往加入小组</el-link>）</h2>
      </div>
      <el-table
        v-else
        highlight-current-row
        stripe
        :data="tableData"
        :header-cell-style="{background:'#f0f9eb'}"
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          type="index"
          width="50px"
        />
        <el-table-column
          prop="name"
          label="小组名称"
          align="center"
        />
        <el-table-column
          prop="practName"
          label="所属课程设计"
          align="center"
        />
        <el-table-column
          prop="stuNumber"
          label="小组人数"
          align="center"
        />
        <el-table-column
          prop="managerName"
          label="指导老师"
          align="center"
        />
        <el-table-column
          prop="managerName"
          label="操作"
          align="center"
        >
          <template slot-scope="{row}">
            <el-button type="success" size="mini" @click="checkDetail(row)">查看</el-button>
            <el-button type="danger" size="mini" @click="quitGroup(row)">退出</el-button>
          </template>
        </el-table-column>
        <div v-if="empty" style="margin:0 auto;margin-left:40%"> <el-link type="primary" style="font-size:20px">主要链接</el-link></div>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getGroupBystudentId } from '@/api/group'
import { removeTeam } from '@/api/course'
import { stuExitGroup } from '@/api/stu-group'

export default {
  components: {

  },
  data() {
    return {
      loading: false,
      empty: false,
      tableData: [],
      id: this.$store.getters.user.id
    }
  },
  mounted() {
    this.getGroupBystudentId()
  },
  methods: {
    getGroupBystudentId() {
      this.loading = true
      getGroupBystudentId(this.id)
        .then(res => {
          this.tableData = res.data
          if (this.tableData === 0) {
            this.empty = true
          } else {
            this.empty = false
          }
          this.loading = false
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    },
    quitGroup(row) {
      if (row.leaderId === this.id) {
        // 组长退出解散小组
        this.$confirm('你是该小组组长，退出将解散该小组，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeTeam(row.id).then(res => {
            this.getGroupBystudentId()
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
        // 常规退出
        this.$confirm('此操作将退出该小组, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          stuExitGroup({
            stuId: this.id,
            groupId: row.id
          }).then(res => {
            this.getGroupBystudentId()
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
      }
    },
    checkDetail(row) {
      this.$router.push({
        name: 'GroupDetails',
        query: {
          teamId: row.id
        }
      })
    },
    goToAddGroup() {
      this.$router.push({
        name: 'StuCourse'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.mygroups{
    height: 100%;
    width: 100%;
    padding: 12px;
    .filter-container{
      align-items: center;
      background-color: #fff ;
      padding: 10px 20px 10px 20px;
      font-size: 14px;
      .el-row{
        margin-bottom: 100px;
      .el-col{
        padding: 0 2%;
      }
      }
    }
 }
</style>
