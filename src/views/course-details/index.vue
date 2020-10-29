<template>
  <div class="app">
    <el-row :gutter="15" type="flex" justify="center">
      <el-col :span="10">
        <el-tabs v-model="activeName1" class="left" type="border-card">
          <el-tab-pane label="课程简介" name="first">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, repellat reprehenderit. Labore dicta veniam vel rerum. Assumenda explicabo dolorem tempora quidem aliquam culpa eaque impedit. Quasi quidem qui corrupti corporis.
            Esse porro sequi officiis a fugit ex, repellat illum totam suscipit, magnam mollitia earum, tenetur et hic. Dolore quidem, dolorem debitis blanditiis rerum quia, provident ratione corrupti fugit eligendi inventore?
            Quia dicta distinctio facilis atque accusamus a ipsam quasi illum unde quisquam earum libero quaerat, totam eum aut amet tempore et itaque velit maiores, nihil asperiores exercitationem? Magni, ut laudantium?
            Officia odio dolorum sequi, eum laudantium vitae reprehenderit iste quaerat? Qui velit asperiores tempora! Beatae est facere, reiciendis repudiandae libero labore porro architecto obcaecati, quos explicabo voluptates illum, consequatur velit.
          </el-tab-pane>
          <el-tab-pane label="老师详情" name="second">
            <el-collapse v-model="activeName2" accordion>
              <el-collapse-item title="小明" name="1">
                <div>电话号码：</div>
                <div>邮箱：</div>
              </el-collapse-item>
              <el-collapse-item title="小红" name="2">
                <div>电话号码：</div>
                <div>邮箱：</div>
              </el-collapse-item>
              <el-collapse-item title="小王" name="3">
                <div>电话号码：</div>
                <div>邮箱：</div>
              </el-collapse-item>
              <el-collapse-item title="小黄" name="4">
                <div>电话号码：</div>
                <div>邮箱：</div>
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
        <el-button type="success" icon="el-icon-plus" @click="dialogFormVisible = true">新建小组</el-button>
        <el-dialog title="小组信息" :visible.sync="dialogFormVisible" width="40%" @close="handleDialogClose()">
          <el-form ref="form" :model="form" label-position="right" label-width="80px">
            <el-form-item label="小组名称" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="小组人数" prop="num">
              <el-input-number v-model="form.num" controls-position="right" :min="1" :max="5" />
            </el-form-item>
            <el-form-item label="指导老师" prop="teacher">
              <el-select v-model="form.teacher" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="简介" prop="desc">
              <el-input
                v-model="form.desc"
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                resize="none"
                maxlength="150"
                show-word-limit
              />
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="22">
        <div class="tableBox">
          <el-table :data="tableData" style="width: 100%" max-height="230">
            <el-table-column type="index" width="50" align="center" />
            <el-table-column prop="name" label="小组名称" width="auto" align="center" />
            <el-table-column prop="leader" label="组长" width="180" align="center" />
            <el-table-column prop="teacher" label="指导老师" width="180" align="center" />
            <el-table-column prop="num" label="小组容量" width="180" align="center" />
            <el-table-column prop="num2" label="当前人数" width="180" align="center" />
            <el-table-column label="操作" align="center" width="180" fixed="right">
              <template slot-scope="scope">
                <el-popconfirm
                  v-if="scope.row.buttonVisible"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  title="是否要加入该小组？"
                  @onConfirm="handleEnterTeam(scope.$index, scope.row)"
                  @onCancel="$message({type: 'info', message: '已取消'})"
                >
                  <el-button slot="reference" size="medium" type="primary">加入</el-button>
                </el-popconfirm>
                <el-button v-else size="medium" type="info" icon="el-icon-view">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName1: 'first',
      activeName2: '0',
      tableData: [
        { name: '课程1', buttonVisible: true },
        { name: '课程2', buttonVisible: true },
        { name: '课程3', buttonVisible: true },
        { name: '课程4', buttonVisible: true },
        { name: '课程5', buttonVisible: true },
        { name: '课程6', buttonVisible: true },
        { name: '课程7', buttonVisible: true }
      ],
      dialogFormVisible: false,
      options: [{
        value: '小明',
        label: '小明'
      }, {
        value: '小红',
        label: '小红'
      }],
      form: {
        teamName: '',
        num: 1,
        teacher: '',
        desc: ''
      }
    }
  },
  methods: {
    handleEnterTeam(index, row) {
      console.log(index, row)
      row.buttonVisible = !row.buttonVisible
      this.$message({
        type: 'success',
        message: '加入成功'
      })
    },
    handleDialogClose() {
      this.$nextTick(() => {
        this.$refs['form'].resetFields()
      })
    }
  }
}
</script>

<style scoped>
.tableBox {
  /* width: 100%; */
  height: 300px;
}

.el-row {
  margin-top: 10px;
}

.left, .right {
  height: 100%;
  background-color: #fff;
}

</style>
