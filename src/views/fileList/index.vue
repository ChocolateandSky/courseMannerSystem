<template>
  <div class="file-list">
    <div
      v-loading="loading"
      class="filter-container"
    >
      <el-button v-if="roleNum!==0" class="pan-btn green-btn message-btn" @click="uploadFile">上传文件</el-button>
      <el-divider />
      <el-table
        :data="fileList"
        :header-cell-style="{background:'#f0f9eb'}"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="文件名"
          align="center"
        />
        <el-table-column
          prop="teacherName"
          label="上传人"
          align="center"
        />
        <el-table-column
          prop="date"
          label="上传时间"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="{row}">
            <el-button type="success" size="mini" @click="DownloadFile(row)">下载</el-button>
            <el-button v-if="roleNum!==0" type="warning" size="mini" @click="deleteFile(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <upload-file
      :dialog-table-visible="uploadDialogShow"
      @close="close"
      @refresh="refresh"
    />
  </div>
</template>

<script>
import uploadFile from './components/uploadFile'
// eslint-disable-next-line no-unused-vars
import { getNoticeFileList, downloadFile, deleteFile } from '@/api/file'
export default {
  components: {
    uploadFile
  },
  data() {
    return {
      loading: false,
      fileList: [],
      dialogShow: false,
      uploadDialogShow: false,
      roleNum: this.$store.getters.roleNum
    }
  },
  mounted() {
    this.getNoticeFileList()
  },
  methods: {
    deleteFile(row) {
      this.$confirm('你确定要删除该文件吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = { id: row.id, name: row.name }
        console.log(data)
        deleteFile(data)
          .then(res => {
            this.$message.success('删除成功')
            this.getNoticeFileList()
          }).catch(err => {
            console.log(err)
            this.$message.error('删除失败')
          })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消删除操作'
        })
      })
    },
    getNoticeFileList() {
      this.loading = true
      getNoticeFileList().then(res => {
        this.fileList = res.data
        this.loading = false
      })
    },
    close() {
      this.dialogShow = false
      this.uploadDialogShow = false
    },
    uploadFile() {
      this.uploadDialogShow = true
    },
    refresh() {
      this.getNoticeFileList()
    },
    DownloadFile(row) {
      downloadFile(row.id, row.name)
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
