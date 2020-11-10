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
              <div class="phase" style="font-size:18px;color:rgb(100,217,214)">
                <span>目前所处阶段:</span>
                <el-input
                  v-model="teamData.phase"
                  :class="{active:!readonly}"
                  :readonly="readonly"
                  style="width:300px;"
                />
                <el-link v-if="readonly&&roleNum===0" type="primary" style="margin-left:15%" @click="changeReadonly">设置目前阶段</el-link>
                <div v-if="!readonly&&roleNum===0" style="display: inline;margin-left:29%">
                  <el-link type="primary" style="margin-right:2%" @click="chancelPhase">取消</el-link>
                  <el-link type="primary" @click="setPhase">确定</el-link>
                </div>
              </div>
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
                  <!-- 小组所上传文件 -->
                  <el-tab-pane class="file-pane" label="小组所上传文件" name="first">
                    <div v-if="fileNum!==0">
                      <div v-for="(item, index) in groupFileList" :key="index" class="file-div" @click="DownloadFile(item)">
                        <div><svg-icon :icon-class="item.icon" style="width:70px;height:65px;margin: 5px 0" /></div>
                        <div class="file-name">
                          <span style="margin: 20px auto 5px auto">{{ item.name }}</span>
                          <span style="margin:0 auto">{{ item.date }}</span>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <h2 style="margin:50px auto auto 29%">抱歉，目前小组没有上传文件</h2>
                    </div>
                  </el-tab-pane>
                  <!-- 文件上传 -->
                  <el-tab-pane class="file-upload" label="上传文件" name="second">
                    <el-upload
                      drag
                      :action="postAction"
                      :headers="myHeaders"
                      multiple
                      :data="uploadParams"
                      :before-upload="beforeUpload"
                      :on-success="successResources"
                      :file-list="fileList"
                      :on-error="OnError"
                    >
                      <i class="el-icon-upload" />
                      <div class="el-upload__text">
                        将文件拖到此处，或
                        <em>点击上传</em>
                      </div>
                      <div slot="tip" class="el-upload__tip">不超过5Mb(按ctrl+鼠标点击可多选文件)</div>
                    </el-upload>
                  </el-tab-pane>
                  <!-- 任务分配 -->
                  <el-tab-pane v-if="isLeader" label="成员任务分配" name="third">
                    <el-form label-position="right" label-width="120px" :model="memberWork">
                      <el-form-item v-for="(item,index) in memberWork.stuIdAndWork" :key="index" :label="item.stuName">
                        <el-input v-model="item.work" style="width:95%" />
                      </el-form-item>
                    </el-form>
                    <el-button style="margin-left:80%;width:120px" type="primary" @click="setStudentWork">设置</el-button>
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
                    v-model="emailContent.body"
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
import { getGroupDetail, getMemberList, setStudentWork, setPhase } from '@/api/group'
import { getGroupFileList, downloadFile } from '@/api/file'
import { sendMailToGroup } from '@/api/user'
export default {
  name: 'OneGroups',
  components: { splitPane },
  data() {
    return {
      fileActiveName: 'first',
      fileList: [],
      groupFileList: [],
      fileNum: 0,
      teamData: {},
      teamId: this.$route.query.teamId,
      member: [],
      readonly: true,
      memberWork: {
        groupId: this.$route.query.teamId,
        stuIdAndWork: []
      },
      leaderId: '',
      isLeader: false,
      tempPhase: '',
      roleNum: this.$store.getters.roleNum,
      loading: false,
      emailContent: {
        stuId: [],
        teacherId: this.$store.getters.user.id,
        body: ''
      },
      postAction: process.env.VUE_APP_BASE_API + `/test/uploadGroupFileServlet`,
      uploadParams: {
        groupId: this.teamId,
        userId: this.$store.getters.user.id,
        userName: this.$store.getters.user.name,
        roles: this.role
      }
    }
  },
  computed: {
    myHeaders() {
      return {
        'ContentType': 'multipart/form-data'
      }
    },
    role() {
      return this.$store.getters.roles.toString()
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    DownloadFile(item) {
      this.$confirm('是否要下载该文件', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        downloadFile(item.id, item.name)
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消下载'
        })
      })
    },
    successResources(response) {
      console.log(response)
      this.$message({
        type: 'success',
        message: '上传成功！'
      })
    },
    OnError() {
      this.$message.error('上传失败')
    },
    getInfo() {
      this.loading = true
      this.getGroupDetail(this.teamId)
      this.getMemberList(this.teamId)
      this.getGroupFileList()
      this.loading = false
    },
    resize() {
      console.log('resize')
    },
    beforeUpload(file) {
      const fileSize = file.size / 1024 / 1024 < 5
      if (!fileSize) {
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
        this.sendMailToGroup()
      }).catch(() => {
        console.error('catch err')
      })
    },
    getGroupDetail(id) {
      // console.log(id)
      getGroupDetail(id).then(res => {
        this.teamData = res.data
      })
    },
    getMemberList(id) {
      getMemberList(id).then(res => {
        this.member = res.data
        this.member.forEach(el => {
          const temp = {}
          temp.stuId = el.stuId
          temp.stuName = el.stuName
          this.memberWork.stuIdAndWork.push(temp)
          this.emailContent.stuId.push(el.stuId)
          if (el.leader === 1) {
            this.leaderId = el.stuId
            // console.log(this.leaderId)
          }
        })
        if (this.leaderId === this.$store.getters.user.id) {
          this.isLeader = true
        } else {
          this.isLeader = false
        }
        // console.log(this.emailContent.stuId)
      })
    },
    sendMailToGroup() {
      sendMailToGroup(this.emailContent)
        .then(res => {
          this.$message.success('成功发送')
        })
        .catch(err => {
          console.log(err)
          this.$message.error('发送失败')
        })
    },
    setStudentWork() {
      console.log(this.memberWork)
      setStudentWork(this.memberWork)
        .then(res => {
          this.$message.success('设置成功')
          this.getMemberList(this.teamId)
        })
        .catch(err => {
          console.log(err)
          this.$message.error('设置失败')
        })
    },
    setPhase() {
      setPhase({
        groupId: this.teamId,
        phase: this.teamData.phase
      }).then(res => {
        this.$message.success('更改成功')
        this.readonly = true
      })
        .catch(err => {
          this.$message.error('更改失败')
          console.log(err)
        })
    },
    changeReadonly() {
      this.tempPhase = this.teamData.phase
      this.readonly = false
    },
    chancelPhase() {
      this.teamData.phase = this.tempPhase
      this.readonly = true
    },
    getGroupFileList() {
      console.log(this.teamId)
      getGroupFileList(this.teamId)
        .then(res => {
          this.groupFileList = res.data
          if (this.groupFileList.length === 0) {
            this.fileNum = 0
          } else {
            this.fileNum = this.groupFileList.length
            this.matchFileType()
          }
          console.log(this.groupFileList)
        })
    },
    matchFileType() {
      this.groupFileList.forEach(item => {
        if (item.type === 'doc' || item.type === 'docx') {
          item.icon = 'word'
        } else if (item.type === 'xlsx') {
          item.icon = 'excel'
        } else if (item.type === 'pdf') {
          item.icon = 'pdf'
        } else if (item.type === 'zip') {
          item.icon = 'zip'
        } else {
          item.icon = 'txt'
        }
      })
    }
  }
}
</script>

<style  lang="scss">

.phase{
  .active{
  border: solid 0.5px;
  // border: none;
}
  .el-input__inner{
    border: none;
  }
}

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
          // .file-pane {
          //   // display: flex;
          //   // flex-wrap: wrap;
          // }
          .file-div:hover {
            box-shadow: 0 10px 12px 0 rgba(0, 0, 0, 0.2);
            backface-visibility: hidden;
            transform: translateY(-2px);
            cursor: pointer;
          }
          .file-div {
            border-radius: 4px;
            display: flex;
            // flex-direction: column;
            margin: 10px 20px;
            background-color: rgb(236,236,236);
            .file-name{
              font-size: 15px;
              display: flex;
              flex-direction: column;
               margin: 0 auto;
            }
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
