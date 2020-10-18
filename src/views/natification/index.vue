<template>
  <div class="natification">
    <div class="block">
      <el-timeline>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <h4>一份文件</h4>
            <el-button type="text">王小虎 提交于 2018/4/8 20:46</el-button>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <h4>详情设计</h4>
            <el-button type="text">王小虎 提交于 2018/4/3 20:46</el-button>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <h4>阶段文件</h4>
            <el-button type="text">王小虎 提交于 2018/4/1 20:46</el-button>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
 .natification{
   margin-top: 10px;
 }
</style>
