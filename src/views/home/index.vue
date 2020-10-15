<template>
  <div class="app-container">
    <div
      class="filter-container"
    >
      <el-row v-for="(rowNum) in lineNum/2" :key="rowNum">
        <el-col v-for="(item,index) in 4" :key="index" :span="6">
          <el-card v-waves :body-style="{ padding: '0px' }">
            <div slot="header" class="clearfix">
              <span>项目名称：课程管理系统</span>
            </div>
            <div style="padding: 20px;">
              <p>指导老师：王宇英</p>
              <p>小组名称：课程管理系统小队</p>
              <p>组长名字：谭维国</p>
              <p>小组人数：4</p>
            </div>
            <div class="card-foot">
              <el-row>
                <el-col :span="12">
                  <el-link icon="el-icon-edit" type="primary" @click.native="groupDetails">详情编辑</el-link>
                </el-col>
                <el-col :span="12">
                  <el-link icon="el-icon-delete" type="danger" @click.native="DeteleGroup(index)">删除</el-link>
                </el-col>
              </el-row>
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
      autoHeight: '200px',
      lineNum: 4
    }
  },
  mounted() {
    this.judgeFirstLogin()
    this.getAutoHeight()
    window.onresize = () => {
      this.getAutoHeight()
    }
  },
  methods: {
    judgeFirstLogin() {
      console.log(this.$store.getters.loginCount)
      if (this.$store.getters.loginCount !== 1) {
        this.dialogFormVisible = false
      }
    },
    close() {
      this.dialogFormVisible = false
    },
    getAutoHeight() {
      this.$nextTick(() => {
        this.autoHeight = window.innerHeight - (100) + 'px'
      })
    },
    groupDetails() {
      this.$router.push({
        name: 'GroupDetails'
      })
    },
    DeteleGroup($event) {
      console.log($event)
      delete $event.target
      this.$confirm('确定删除该类型吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('删除成功')
      }).catch(() => {
        console.error('catch err')
        this.$message.error('删除失败')
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
      .el-row{
        margin-bottom: 100px;
      .el-col{
        padding: 0 2%;
      }
      }
    .el-card{
   .card-foot{
        padding: 0 20px;
        margin: 0 0 20px 0;
        .el-row{
          margin: 0;
          text-align: center;
          .el-link{
              font-size: 15px;
          }
          .el-link:hover{
            color:rgb(100,217,214)
          }
        }
      }
        &:hover {
        box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.2);
        backface-visibility: hidden;
        transform: translateY(-5px);
        cursor: pointer;
      }
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
