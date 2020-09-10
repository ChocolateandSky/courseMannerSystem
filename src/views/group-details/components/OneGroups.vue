<template>
  <div class="components-container">
    <split-pane split="vertical" @resize="resize">
      <template slot="paneL">
        <div class="left-container">
          <el-card class="box-card-component">
            <div slot="header" class="box-card-header">
              <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
            </div>
            <div style="position:relative;">
              <span style="font-size:18px;color:rgb(100,217,214)">项目简单介绍:</span>
              <el-divider />
              <p style="padding:0 10px">啥数据货到付款时候都快粉红色的开发和收快递费hi玩儿会uh风格我还不赶紧和第三个福建省高房价的方便球完全地方和计划为过去五二分管委会visdufhiwhe9qheowh</p>
              <el-divider style="margin-bootom:30px" />
              <span style="font-size:18px;color:rgb(100,217,214)">团队成员:</span>
              <el-divider />
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="一致性 Consistency" name="1">
                  <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                  <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                </el-collapse-item>
                <el-collapse-item title="反馈 Feedback" name="2">
                  <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                  <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                </el-collapse-item>
                <el-collapse-item title="效率 Efficiency" name="3">
                  <div>简化流程：设计简洁直观的操作流程；</div>
                  <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                  <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                </el-collapse-item>
                <el-collapse-item title="可控 Controllability" name="4">
                  <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                  <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-card>
        </div>
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <div class="top-container" />
          </template>
          <template slot="paneR">
            <div class="bottom-container" />
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
  methods: {
    resize() {
      console.log('resize')
    }
  }
}
</script>

<style lang="scss"  scoped>
  .components-container {
    position: relative;
    height: 100%;
    margin: 0;
    .el-divider{
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }

  .left-container {
    height: 100%;
  }

  // .right-container {
  //   background-color: #FCE38A;
  //   height: 200px;
  // }

  .top-container {
    background-color: #FCE38A;
    width: 100%;
    height: 100%;
  }

  .bottom-container {
    width: 100%;
    background-color: #95E1D3;
    height: 100%;
  }
  .box-card-component {
    height: 100%;
  .box-card-header {
    position: relative;
    height: 220px;
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
</style>
