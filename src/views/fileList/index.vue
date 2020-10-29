<template>
  <div class="file-list">
    <div class="filter-container">
      <el-button v-if="roleNum!==0" class="pan-btn green-btn message-btn" @click="uploadFile">上传文件</el-button>
      <el-divider />
      <el-table
        :data="fileList"
        :header-cell-style="{background:'#f0f9eb'}"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          prop="fileName"
          label="文件名"
          align="center"
        />
        <el-table-column
          prop="uploadName"
          label="上传人"
          align="center"
        />
        <el-table-column
          prop="time"
          label="上传时间"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
        >
          <el-button type="success" size="mini">下载</el-button>
          <el-button v-if="roleNum!==0" type="warning" size="mini">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <upload-file
      :dialog-table-visible="uploadDialogShow"
      @close="close"
    />
  </div>
</template>

<script>
import uploadFile from './components/uploadFile'
export default {
  components: {
    uploadFile
  },
  data() {
    return {
      fileList: [],
      dialogShow: false,
      uploadDialogShow: false,
      roleNum: this.$store.getters.roleNum
    }
  },
  methods: {
    close() {
      this.dialogShow = false
      this.uploadDialogShow = false
    },
    uploadFile() {
      this.uploadDialogShow = true
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
