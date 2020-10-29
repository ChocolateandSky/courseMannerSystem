<template>
  <div v-loading="loading" class="components-container">
    <split-pane split="vertical" @resize="resize">
      <template slot="paneL">
        <div class="left-container">
          <el-card class="box-card-component">
            <div slot="header" class="box-card-header">
              <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
            </div>
            <div>
              <span style="font-size:18px;color:rgb(100,217,214)">项目简单介绍:</span>
              <el-divider />
              <p style="padding:0 10px;  line-height:25px;">
                {{ teamData.introduction }}
              </p>
              <el-divider />
              <span style="font-size:18px;color:rgb(100,217,214)">指导老师：{{ teamData.teacherName }}</span>
              <el-divider style="margin-bootom:30px" />
              <span style="font-size:18px;color:rgb(100,217,214)">目前所处阶段：{{ teamData.phase }}</span>
              <el-divider style="margin-bootom:30px" />
              <div>
                <span style="font-size:18px;color:rgb(100,217,214);">团队成员:</span>
                <el-collapse v-for="(item,index) in member" :key="index" style="margin-top:10px;">
                  <el-collapse-item>
                    <div slot="title">
                      <span v-if="item.leader===1" style="color:rgb(28,120,194)">组长：{{ item.stuName }}</span>
                      <span v-else>组员：{{ item.stuName }}</span>
                    </div>
                    <div>学号：{{ item.stuId }}</div>
                    <div>任务：{{ item.work }}</div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </el-card>
        </div>
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <div class="top-container">
              <el-card class="box-card" style="height:100%">
                <el-tabs v-model="fileActiveName">
                  <el-tab-pane class="file-pane" label="小组所上传文件" name="first">
                    <!-- <el-row v-for="i in 3" :key="i" :gutter="90">
                    <el-col v-for="o in 6" :key="o" :span="5.5" class="file-col">-->
                    <div v-for="o in 44" :key="o" class="file-div">
                      <svg-icon icon-class="file" style="width:50px;height:50px" />
                      <i class="file-name">文件.txt</i>
                    </div>
                    <!-- </el-col>
                    </el-row>-->
                  </el-tab-pane>
                  <el-tab-pane class="file-upload" label="上传文件" name="second">
                    <el-upload
                      drag
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :before-upload="beforeUpload"
                      :on-error="onError"
                      :on-success="onSuccess"
                      :file-list="fileList"
                    >
                      <i class="el-icon-upload" />
                      <div class="el-upload__text">
                        将文件拖到此处，或
                        <em>点击上传</em>
                      </div>
                      <div slot="tip" class="el-upload__tip">可上传.doc .docx .xls .xlsx .txt .pdf</div>
                    </el-upload>
                  </el-tab-pane>
                </el-tabs>
              </el-card>
            </div>
          </template>
          <template slot="paneR">
            <div class="bottom-container">
              <el-card>
                <div slot="header" class="clearfix">
                  <h2 style="text-align: center;margin:0 auto;color:rgb(100,217,214)">邮件通知</h2>
                </div>
                <div class="text item">
                  <el-input
                    v-model="emailContent"
                    type="textarea"
                    :rows="12"
                    :disabled="!roleNum"
                    clearable
                    placeholder="请输入内容"
                    class="emailInput"
                  />
                  <el-button :disabled="!roleNum" class="pan-btn green-btn message-btn" @click="handlePostMessage">发送消息</el-button>
                </div>
              </el-card>
            </div>
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script>
import splitPane from 'vue-splitpane'
import { getGroupDetail, getMemberList } from '@/api/group'
export default {
  name: 'OneGroups',
  components: { splitPane },
  data() {
    return {
      fileActiveName: 'first',
      fileList: [],
      teamData: {},
      teamId: this.$route.query.teamId,
      member: [],
      leaderId: '',
      roleNum: this.$store.getters.roleNum,
      loading: false,
      emailContent: ''
    }
  },
  mounted() {
    this.loading = true
    this.getGroupDetail(this.teamId)
    this.getMemberList(this.teamId)
  },
  methods: {
    resize() {
      console.log('resize')
    },
    beforeUpload(file) {
      console.log(file)
      const AllUpExt = `.doc|.docx|.xls|.xlsx|.txt|.pdf`
      const extName = file.name
        .substring(file.name.lastIndexOf('.'))
        .toLowerCase()
      const fileSize = file.size / 1024 / 1024 < 5
      if (AllUpExt.indexOf(extName + '|') === -1) {
        this.$message.error('文件格式不对')
        return false
      } else if (!fileSize) {
        this.$message.error('文件大小不能超过5M')
        return false
      } else {
        return true
      }
    },
    onError() {
      this.$message.error('图片上传失败')
    },
    onSuccess() {
      this.$message({
        type: 'success',
        message: '图片上传成功'
      })
    },
    handlePostMessage() {
      this.$confirm('确定要发送消息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('发送成功')
      }).catch(() => {
        console.error('catch err')
      })
    },
    getGroupDetail(id) {
      getGroupDetail(id).then(res => {
        this.teamData = res.data
      })
    },
    getMemberList(id) {
      getMemberList(id).then(res => {
        this.member = res.data
        console.log(this.member)
        this.member.forEach(el => {
          if (el.leader === 1) {
            this.leaderId = el.stuId
            console.log(this.leaderId)
            this.loading = false
            return
          }
        })
        this.loading = false
      })
    }
  }
}
</script>

<style  lang="scss">

.emailInput{
  border: solid 1px rgb(255,187,0);
}
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

.components-container {
  position: relative;
  margin: 0 auto;
  .box-card-component {
    height: 100%;
    .box-card-header {
      height: 290px;
      img {
        width: 100%;
        height: 100%;
        transition: all 0.2s linear;
        &:hover {
          transform: scale(1.1, 1.1);
          filter: contrast(130%);
        }
      }
    }
  }
  .el-divider {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .left-container {
    height: 100%;
  }
  .top-container {
    width: 100%;
    height: 100%;
    // .file-col{
    //      margin:10px 0
    // }
    .el-card {
      .el-card__body {
        height: 100%;
        .el-tabs {
          height: 100%;
          .el-tabs__content {
            height: 380px;
            padding-bottom: 20px;
            overflow: scroll;
          }
          .file-pane {
            display: flex;
            flex-wrap: wrap;
          }
          .file-div:hover {
            box-shadow: 0 10px 12px 0 rgba(0, 0, 0, 0.2);
            backface-visibility: hidden;
            transform: translateY(-2px);
            cursor: pointer;
          }
          .file-div {
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            margin: 10px 20px;
          }
          .file-upload {
            .el-upload {
              width: 100%;
              .el-upload-dragger {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }

  .bottom-container {
    width: 100%;
    height: 100%;
    .el-card{
      height: 100%;
      .message-btn{
        position: relative;
        margin-top: 20px;
        left: 80%;
      }
    }
  }
}

// .right-container {
//   background-color: #FCE38A;
//   height: 200px;
// }
</style>
