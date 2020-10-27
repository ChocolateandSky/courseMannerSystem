<template>
  <div>
    <el-container>
      <el-header>
        <el-input :style="{ 'width': '350px' }" placeholder="请输入内容">
          <el-select slot="prepend" v-model="select" class="input-with-select" style="width: 80px" placeholder="筛选" @change="filterData">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-button slot="append" icon="el-icon-search" />
        </el-input>
      </el-header>
      <el-main>
        <el-table :data="filterTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%">
          <el-table-column type="index" label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="courseName" label="课程名" width="180" align="center" />
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope">
              <el-button v-if="scope.row.buttonVisible" size="medium" type="primary" @click="handleAddCourses(scope.$index, scope.row.buttonVisible)">选课</el-button>
              <el-button v-else size="medium" type="info" icon="el-icon-view" @click="handleReadInfo(scope.$index, scope.row)">查看</el-button>
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
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 6,
      filterTableData: [],
      tableData: [
        { courseName: '课程1', buttonVisible: true },
        { courseName: '课程2', buttonVisible: true },
        { courseName: '课程3', buttonVisible: true },
        { courseName: '课程4', buttonVisible: true },
        { courseName: '课程5', buttonVisible: true },
        { courseName: '课程6', buttonVisible: true },
        { courseName: '课程7', buttonVisible: true }
      ],
      select: '',
      options: [
        { value: 'all', label: '全部' },
        { value: '0', label: '未选' },
        { value: '1', label: '已选' }
      ]
    }
  },
  mounted() {
    this.filterData()
  },
  methods: {
    filterData(value) {
      this.currentPage = 1
      switch (value) {
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
    handleAddCourses(index, buttonVisible) {
      // console.log(index)
      this.tableData[(this.currentPage - 1) * this.pageSize + index].buttonVisible = !buttonVisible
    },
    handleReadInfo(index, row) {
      console.log(index, row)
      this.$router.push({
        name: 'courseDetails'
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