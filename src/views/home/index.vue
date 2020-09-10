<template>
  <div class="app-container">
    <div
      class="filter-container"
      :style="{height:autoHeight}"
    >
      <el-row>
        <el-col v-for="(item,index) in 4" :key="index" :span="6">
          <el-card v-waves :body-style="{ padding: '0px' }">
            <div slot="header" class="clearfix">
              <span>项目名称:</span>
            </div>
            <div style="padding: 14px;">
              <span>队长名称:</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <fill-person-info
      :dialog-form-visible="dialogFormVisible"
      @close="close"
    />
  </div>
</template>

<script>
import fillPersonInfo from './components/fillPersonInfo'
import waves from '@/directive/waves/index.js' // 水波纹指令
export default {
  components: {
    fillPersonInfo
  },
  directives: {
    waves
  },
  data() {
    return {
      dialogFormVisible: false,
      autoHeight: '200px'
    }
  },
  mounted() {
    this.getAutoHeight()
    window.onresize = () => {
      this.getAutoHeight()
    }
    this.dialogFormVisible = true
  },
  methods: {
    close() {
      this.dialogFormVisible = false
    },
    getAutoHeight() {
      this.$nextTick(() => {
        this.autoHeight = window.innerHeight - (100) + 'px'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.component-item{
  min-height: 100px;
}
  .app-container{
    height: 100%;
    width: 100%;
    padding: 12px;
    .filter-container{
      align-items: center;
      background-color: #fff ;
      padding: 20px 20px 10px 20px;
      font-size: 14px;
      .el-col{
        padding: 0 2%;
      }
    }
 }
 .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
