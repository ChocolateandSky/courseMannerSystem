<template>
  <div id="container">
    <div class="filter-container">
      <div class="header">
        <el-button class="pan-btn green-btn message-btn" @click="handlePostMessage">发布公告</el-button>
        <el-button class="pan-btn green-btn message-btn" @click="uploadFile">上传文件</el-button>
      </div>
      <el-collapse accordion class="groupCollapse">
        <el-collapse-item v-for="o in 10" :key="o">
          <template slot="title">
            课程设计管理系统--谭维国
            <el-button type="text" size="mini" class="groupDetail" @click="checkGroup">查看小组详情</el-button>
          </template>
          <el-collapse accordion style="margin-left:50px">
            <el-collapse-item>
              <template slot="title">
                组长：谭维国
              </template>
              <div>学号：1800301333</div>
              <div>任务：后端架构搭建，接口设计</div>
            </el-collapse-item>
            <el-collapse-item title="刘镇猛">
              <div>学号：1800301322</div>
              <div>任务：前端设计</div>
            </el-collapse-item>
            <el-collapse-item title="聂城星">
              <div>1800301331</div>
              <div>任务：后端设计</div>
            </el-collapse-item>
            <el-collapse-item title="邓天生">
              <div>1800301316</div>
              <div>任务：前端设计</div>
            </el-collapse-item>
          </el-collapse>
        </el-collapse-item>
      </el-collapse>
    </div>
    <notice
      :dialog-table-visible="dialogShow"
      @close="close"
    />
    <upload-file
      :dialog-table-visible="uploadDialogShow"
      @close="close"
    />
  </div>
</template>

<script>
import notice from './components/notice'
import uploadFile from './components/uploadFile'
export default {
  components: {
    notice,
    uploadFile
  },
  data() {
    return {
      dialogShow: false,
      uploadDialogShow: false
    }
  },
  methods: {
    handlePostMessage() {
      console.log('adwqq')
      this.dialogShow = true
    },
    uploadFile() {
      this.uploadDialogShow = true
    },
    close() {
      this.dialogShow = false
      this.uploadDialogShow = false
    },
    checkGroup() {
      console.log('wwww')
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
