<template>
  <div>
    <el-row :gutter="15" type="flex" justify="center">
      <el-col :span="10">
        <el-tabs v-model="activeName1" class="left" type="border-card">
          <el-tab-pane label="课程简介" name="first">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates tenetur officiis praesentium. Itaque sit culpa similique saepe vel consectetur doloribus ratione provident quis voluptatem. Corrupti necessitatibus harum cumque expedita maxime?
            Molestias tenetur sed dignissimos facere ullam, earum cupiditate recusandae quia dicta molestiae quis iure minus officiis quibusdam, soluta beatae reprehenderit nisi aperiam optio odio nihil, qui libero ducimus modi. Saepe.
            Exercitationem temporibus molestiae deleniti veritatis voluptatibus! Repellendus veritatis aspernatur, odio, odit adipisci nesciunt porro officia ducimus quo eveniet ut dolor molestiae nisi modi. Perspiciatis vitae placeat perferendis id, voluptatibus incidunt!
            A ducimus quibusdam fugiat aspernatur voluptates necessitatibus labore minus commodi alias quos reiciendis similique explicabo praesentium nobis neque officia, cumque perferendis rerum eaque et ex velit optio consequuntur saepe. Minus.
            Rem quam voluptate eaque optio est. Neque, dolor fugit. Nesciunt debitis veniam repellendus laboriosam voluptate at fuga voluptatum assumenda doloribus, tempora provident officiis, aliquam rerum ipsum ipsam tenetur vero commodi.
          </el-tab-pane>
          <el-tab-pane label="老师详情" name="second">
            <el-collapse v-model="activeName2" accordion>
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
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="12">
        <div class="right" />
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="22">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column type="index" align="center" label="序号" width="50" />
          <el-table-column prop="teamNumber" align="center" label="小组编号" width="180" />
          <el-table-column prop="teamName" align="center" label="小组名称" width="180" />
          <el-table-column prop="leader" align="center" label="组长" width="180" />
          <el-table-column prop="teacher" align="center" label="指导老师" width="180" />
          <el-table-column prop="max" align="center" label="小组容量" width="180" />
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName1: 'first',
      activeName2: '1',
      tableData: [
        { teamName: '第1小组' },
        { teamName: '第2小组' },
        { teamName: '第3小组' },
        { teamName: '第4小组' },
        { teamName: '第1小组' },
        { teamName: '第2小组' },
        { teamName: '第3小组' },
        { teamName: '第4小组' },
        { teamName: '第4小组' }
      ]
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-top: 10px;
}

.left, .right {
  height: 100%;
  background-color: #fff;
}
</style>
