<template>
  <div class="file-list">
    <div
      v-loading="loading"
      class="filter-container"
    >
      <el-divider />
      <div class="searchBox">
        <el-input
          v-model="uploadUser"
          clearable
          placeholder="搜索上传人"
          prefix-icon="el-icon-search"
          :style="{width: '250px', 'margin': '0px 10px 10px 0px'} "
        />
        <el-button style="margin-right:30px" icon="el-icon-search" circle @click="seacherByUploadUser" />
      </div>
    </div>
    <el-table
      :data="groupfileList"
      :header-cell-style="{background:'#f0f9eb'}"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="序号" align="center" width="80">
        <template slot-scope="{$index}">
          <span>{{ $index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="文件名"
        align="center"
      />
      <el-table-column
        prop="userName"
        label="上传人"
        align="center"
      />
      <el-table-column
        prop="date"
        label="上传时间"
        sortable
        align="center"
      />
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="{row}">
          <el-button type="success" size="mini" @click="DownloadFile(row)">下载</el-button>
          <el-button type="warning" size="mini" @click="deleteFile(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { downloadFile, deleteGroupFile } from '@/api/file'
import { getAllGroupFile } from '@/api/superAdmin'
export default {
  components: {
  },
  data() {
    return {
      loading: false,
      groupfileList: [],
      tableData: [],
      // roleNum: this.$store.getters.roleNum
      uploadUser: ''
    }
  },
  mounted() {
    this.getAllGroupFile()
  },
  methods: {
    getAllGroupFile() {
      this.loading = true
      getAllGroupFile().then(res => {
        this.groupfileList = res.data
        this.tableData = res.data
        this.loading = false
      })
    },
    deleteFile(row) {
      this.$confirm('你确定要删除该文件吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = { id: row.id, name: row.name }
        deleteGroupFile(data)
          .then(res => {
            this.$message.success('删除成功')
            this.getAllGroupFile()
          }).catch(err => {
            console.log(err)
          })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消删除操作'
        })
      })
    },
    refresh() {
      this.getAllGroupFile()
    },
    DownloadFile(row) {
      downloadFile(row.id, row.name)
    },
    seacherByUploadUser() {
      this.groupfileList = []
      if (this.uploadUser === '') {
        this.groupfileList = [...this.tableData]
      } else {
        this.tableData.forEach(el => {
          if (el.userName.includes(this.uploadUser)) {
            this.groupfileList.push(el)
            return
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .file-list{
    padding: 12px;
    .filter-container{
      align-items: center;
      background-color: #fff;
      padding: 20px 20px 10px 20px;
      font-size: 14px;
      .form-table{
        margin: 0 auto;
      }
      .el-select{
        width: 65%;
      }
        .el-input {
        width: 65%;
      }
      .workTable{
        margin-bottom: 50px;
      }
    }

    @media only screen and (max-width: 1024px) {
      .el-input >>> .el-input__inner {
        height: 32px;
      }

      .el-select >>> .el-input__inner {
        height: 32px;
      }

      .el-button {
        height: 32px;
      }

      .filter-container {
        font-size: 14px;
      }

      .el-table >>> .cell {
        font-size: 12px;
      }
    }
  }
</style>
