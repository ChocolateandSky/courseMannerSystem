<template>
  <div class="components-container">
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
                啥数据货到付款时候都快粉红色的开发和收快递费hi玩儿会uh风格我
                还不赶紧和第三个福建省高房价的方便球完全地方和计划为过去五二分管委会visdufhiwhe9qheowh
                加快速度不分开吧缉毒风暴武二哥氨基酸不放假韩阿世界杯的骄傲和备份时间按时发把交话费报价函
                案件是否能卡比我快减法安会计师的板卡积分比去网吧卡视角的把控减肥把控技术部分卡视角发布按时
                阿萨德你去安慰计划表求的供求外国一覆盖发神经开始登记卡汇顶科技啊阿斯加德哈开奖号打卡机卡时间和
              </p>
              <el-divider style="margin-bootom:30px" />
              <span style="font-size:18px;color:rgb(100,217,214)">团队成员:</span>
              <el-divider />
              <el-collapse>
                <el-collapse-item title="组长：谭维国" name="1">
                  <div>学号：1800301322</div>
                  <div>任务：负责整个队伍走向，把握项目进度，同时负责后端设计</div>
                </el-collapse-item>
                <el-collapse-item title="组员：刘镇猛" name="2">
                  <div>学号：1800301322</div>
                  <div>任务：主要负责前端设计</div>
                </el-collapse-item>
                <el-collapse-item title="组员：邓天生" name="3">
                  <div>学号：1800301322</div>
                  <div>任务：主要负责前端设计</div>
                </el-collapse-item>
                <el-collapse-item title="组员：聂城星" name="4">
                  <div>学号：1800301322</div>
                  <div>任务：负责后端设计</div>
                </el-collapse-item>
              </el-collapse>
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
            <div class="bottom-container">消息发送</div>
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script>
import splitPane from 'vue-splitpane'

export default {
  name: 'OneGroups',
  components: { splitPane },
  data() {
    return {
      fileActiveName: 'first',
      fileList: []
    }
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
    }
  }
}
</script>

<style lang="scss">
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
    background-color: #95e1d3;
    height: 100%;
  }
}

// .right-container {
//   background-color: #FCE38A;
//   height: 200px;
// }
</style>
