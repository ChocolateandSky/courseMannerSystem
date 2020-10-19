<template>
  <div class="UpdatePassword">
    <el-dialog
      title="更改密码"
      :visible="dialogVisible"
      width="25%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-form ref="form" :model="form" label-width="112px" :rules="rules">
        <el-form-item label="旧密码:" prop="password">
          <el-input v-model="form.password" placeholder="请输入旧密码" />
        </el-form-item>
        <el-form-item label="新密码:" prop="newPassword">
          <el-input v-model="form.newPassword" placeholder="请输入新密码" show-password />
        </el-form-item>
        <el-form-item label="再次确认密码:" prop="dopsw">
          <el-input v-model="dopsw" placeholder="请再次确认密码" show-password />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { updatePassword } from '@/api/user'

export default {
  props: {
    userid: {
      require: true,
      type: String,
      default: () => {
        return ''
      }
    },
    dialogVisible: {
      type: Boolean,
      require: true,
      default: () => {
        return false
      }
    }
  },
  data() {
    var validatedopsw = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('不能为空'))
      } else {
        callback()
      }
    }
    return {
      form: {
        newPassword: '',
        password: '',
        id: this.userid
      },
      dopsw: '',
      rules: {
        dopsw: [{ required: true, validator: validatedopsw, trigger: 'blur' }],
        password: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    close() {
      this.$emit('dialogVisible', false)
      this.$nextTick(() => {
        this.clear()
        this.$refs.form.clearValidate()
      })
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.newPassword !== this.dopsw) {
            this.$message.error('两次确认密码不一致')
            return false
          }
          console.log(this.form)
          updatePassword(this.form)
            .then(res => {
              this.$message.success('更改成功')
            })
        } else {
          this.$message.error('更改失败')
          return false
        }
      })
    },
    clear() {
      this.form = {
        newpsw: '',
        id: this.userid
      }
      this.oldpsw = ''
      this.dopsw = ''
    }
  }
}
</script>

<style scoped lang="scss">

</style>
