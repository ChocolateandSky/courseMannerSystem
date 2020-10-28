<template>
  <el-dialog title="上传附件" :visible.sync="visible" width="560px">
    <el-form ref="dataForm" :model="form">
      <el-form-item v-if="roleNum !==0" label="公告：" :label-width="formLabelWidth">
        <el-input
          v-model="form.textarea"
          type="textarea"
          :rows="3"
          placeholder="请输入公告内容"
        />
      </el-form-item>
      <el-form-item style="margin-left:120px">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          style="width:100%;"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip" style="margin-top:0">只能上传jpg/png文件，且不超过500kb(按ctrl+鼠标点击可多选文件)</div>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="roleNum !==0">
        <el-switch
          v-model="endTimeSwitch"
          active-color="#13ce66"
          inactive-color="#ff4949"
          inactive-text="是否设置截止时间："
          style="margin-left:13%"
        />
      </el-form-item>
      <el-form-item v-show="endTimeSwitch" ref="endTimeItem" label="截止时间：" :label-width="formLabelWidth">
        <div class="block">
          <el-date-picker
            v-model="endTime"
            type="datetime"
            placeholder="选择日期时间"
            style="width:100%"
          />
        </div>
      </el-form-item>
      <el-form-item>
        <el-switch
          v-if="roleNum !==0"
          v-model="noticeStudent"
          active-color="#13ce66"
          inactive-color="#ff4949"
          inactive-text="是否同时通知学生："
          style="margin-left:13%"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
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
      formLabelWidth: '120px',
      endTimeSwitch: false,
      endTime: '',
      noticeStudent: false,
      roleNum: this.$store.getters.roleNum
    }
  },
  computed: {
    visible: {
      get() {
        return this.dialogTableVisible
      },
      set(val) {
        if (!val) {
          this.closeDialog()
        }
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
      this.$refs.dataForm.clearValidate()
    }
  }
}
</script>

<style scoped lang="scss">
.el-form{
  width: 500px;
}

</style>
