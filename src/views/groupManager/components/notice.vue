<template>
  <el-dialog title="发送公告" :visible.sync="visible">
    <el-form ref="dataForm" :model="form">
      <el-form-item label="公告" :label-width="formLabelWidth">
        <el-input
          v-model="form.textarea"
          type="textarea"
          :rows="2"
          placeholder="请输入公告内容"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogTableVisible: {
      required: true,
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      form: {
        textarea: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    visible: {
      get() {
        return this.dialogTableVisible
      },
      set(val) {
        if (!val) {
          this.close()
        }
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
      this.$refs.dataForm.clearValidate()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
