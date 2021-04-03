<template>
  <el-dialog title="发送公告" :visible.sync="visible" width="30%">
    <el-form ref="dataForm" :model="form">
      <el-form-item label="课设：" :label-width="formLabelWidth">
        <el-select v-model="practicumId" clearable style="width:100%" placeholder="请选择你要发送消息的课设">
          <el-option
            v-for="item in practicumList"
            :key="item.value"
            :label="item.practName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="公告：" :label-width="formLabelWidth">
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
      <el-button type="primary" @click="sendNoticeForOnePracticum">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// eslint-disable-next-line no-unused-vars
// import { sendMail } from '@/api/user'
import { sendNoticeForOnePracticum } from '@/api/course'
export default {
  props: {
    dialogTableVisible: {
      required: true,
      type: Boolean,
      default() {
        return false
      }
    },
    practicumList: {
      required: true,
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      form: {
        textarea: ''
      },
      formLabelWidth: '90px',
      practicumId: ''
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
    },
    role() {
      return this.$store.getters.roles.toString()
    }
  },
  // mounted() {
  //   this.getCoursesInfo()
  // },
  methods: {
    // getCoursesInfo() {
    //   getCoursesInfo(this.$store.getters.user.id).then(res => {
    //     this.practicumList = res.data
    //   })
    // },
    async sendNoticeForOnePracticum() {
      const data = {
        body: this.form.textarea,
        userId: this.$store.getters.user.id,
        userName: this.$store.getters.user.name,
        roles: this.role,
        practicumId: this.practicumId
      }
      await sendNoticeForOnePracticum(data).then(res => {
        this.$message.success('发送成功')
      })
      this.close()
    },
    close() {
      this.$emit('close')
      this.$refs.dataForm.clearValidate()
    }
    // async sendMail() {
    //   const data = {
    //     id: this.$store.getters.user.id,
    //     notice: this.form.textarea
    //   }
    //   await sendMail(data)
    //     .then(res => {
    //       this.$message.success('发送成功')
    //     })
    //   this.close()
    // }
  }
}
</script>

<style scoped lang="scss">

</style>
