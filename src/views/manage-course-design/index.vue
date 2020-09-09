<template>
  <el-container>
    <el-header>
      <el-button type="success" icon="el-icon-plus" @click="$">新增</el-button>
    </el-header>
    <el-main>
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{background:'#DCDFE6',color:'#303133'}"
        border
      >
        <el-table-column type="index" width="50" align="center" />
        <el-table-column label="日期" width="180" prop="date" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" width="180" prop="name" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-delete" @click="$">编辑</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { date: '2016-05-01', name: '小明' },
        { date: '2016-05-02', name: '小明' },
        { date: '2016-05-02', name: '小明' },
        { date: '2016-05-02', name: '小明' },
        { date: '2016-05-02', name: '小明' },
        { date: '2016-05-02', name: '小明' },
        { date: '2016-05-02', name: '小明' },
        { date: '2016-05-02', name: '小明' },
        { date: '2016-05-02', name: '小明' },
        { date: '2016-05-02', name: '小明' },
        { date: '2016-05-02', name: '小明' },
        { date: '2016-05-02', name: '小明' },
        { date: '2016-05-02', name: '小明' },
        { date: '2016-05-02', name: '小明' },
        { date: '2016-05-02', name: '小明' },
        { date: '2016-06-02', name: '小明' },
        { date: '2016-05-02', name: '小明' },
        { date: '2016-05-02', name: '小明' }
      ]
    }
  }
}
</script>

<style scoped>
.el-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
