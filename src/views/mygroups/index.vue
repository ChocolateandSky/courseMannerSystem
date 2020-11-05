<template>
  <div class="mygroups">
    <div
      v-loading="loading"
      class="filter-container"
    >
      <el-table
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
          </template>
          <template slot-scope="{row}">
            <el-button type="danger" size="mini" @click="checkDetail(row)">退出</el-button>
          </template>
        </el-table-column>
        <div v-if="empty" style="margin:0 auto;margin-left:40%"> <el-link type="primary" style="font-size:20px">主要链接</el-link></div>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {
      loading: false,
      empty: true,
      tableData: []
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
