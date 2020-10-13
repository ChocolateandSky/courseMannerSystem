<template>
  <div>
    <el-dialog title="新建课程设计" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="课程名称:">
          <el-input v-model="formData.name" :style="{width: '80%'}" />
        </el-form-item>
        <el-form-item label="课程容量">
          <el-input-number v-model="formData.stuTotal" controls-position="right" :min="1" :max="10" @change="$" />
        </el-form-item>
        <el-form-item label="指导老师:">
          <el-cascader :style="{width:'80%'}" :options="options" :props="{multiple:true }" collapse-tags />
        </el-form-item>
        <el-form-item label="简介:">
          <el-input v-model="formData.desc" type="textarea" resize="none" :style="{width: '80%'}" rows="7" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: [{
        value: 1,
        label: '计算机与信息安全学院',
        children: [
          {
            value: 2,
            label: '软件工程专业',
            children: [{ value: 3, label: '小明' }, { value: 4, label: '小红' }]
          },
          {
            value: 5,
            label: '计算机科学专业',
            children: [{ value: 6, label: '小明' }, { value: 7, label: '小红' }]
          }
        ]
      }],
      formData: {
        name: '',
        desc: '',
        stuTotal: 0
      }
    }
  },
  destroyed: {
    function() {
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>

</style>
