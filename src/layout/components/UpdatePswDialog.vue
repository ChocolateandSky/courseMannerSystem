<template>
  <el-dialog title="修改密码" :visible.sync="visible" width="40%">
    <el-form ref="dataForm" :model="temp" :rules="rules" label-position="left" label-width="80px">
      <div class="form-container">
        <el-form-item label="用户名" prop="name">
          <span>{{ name }}</span>
        </el-form-item>
        <el-form-item label="旧密码" prop="oldPsw">
          <el-input v-model="temp.oldPsw" :type="pwdVisible.oldVisible ? 'text' : 'password'" placeholder="请输入旧密码">
            <svg-icon
              slot="suffix"
              :icon-class="pwdVisible.oldVisible ? 'eye-open' : 'eye'"
              @click="pwdVisible.oldVisible = !pwdVisible.oldVisible"
            />
          </el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPsw">
          <el-input v-model="temp.newPsw" :type="pwdVisible.newVisible ? 'text' : 'password'" placeholder="请输入新密码">
            <svg-icon
              slot="suffix"
              :icon-class="pwdVisible.newVisible ? 'eye-open' : 'eye'"
              @click="pwdVisible.newVisible = !pwdVisible.newVisible"
            />
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPsw">
          <el-input v-model="temp.confirmPsw" :type="pwdVisible.confrimVisible ? 'text' : 'password'" placeholder="请确认新密码">
            <svg-icon
              slot="suffix"
              :icon-class="pwdVisible.confrimVisible ? 'eye-open' : 'eye'"
              @click="pwdVisible.confrimVisible = !pwdVisible.confrimVisible"
            />
          </el-input>
        </el-form-item>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="updatePwd">完成</el-button>
    </div>
  </el-dialog>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { updatePassword } from '@/api/user'

export default {
  name: 'UpdatePswDialog',
  props: {
    name: {
      required: true,
      type: undefined
    },
    dialogVisible: {
      required: true,
      type: Boolean
    }
  },
  data() {
    const confirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.temp.newPsw) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }

    return {
      pwdVisible: {
        oldVisible: false,
        newVisible: false,
        confrimVisible: false
      },
      temp: {
        oldPsw: '',
        newPsw: '',
        confirmPsw: ''
      },
      rules: {
        oldPsw: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newPsw: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        confirmPsw: [{ required: true, validator: confirmPassword, trigger: 'blur' }]
      }
    }
  },
  computed: {
    visible: {
      get() {
        return this.dialogVisible
      },
      set(val) {
        if (!val) {
          this.close()
        }
      }
    }
  },
  watch: {
    dialogVisible() {
      this.resetTemp()
      this.resetPswVisible()
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      })
    }
  },
  methods: {
    resetTemp() {
      this.temp = {
        oldPsw: '',
        newPsw: '',
        confirmPsw: ''
      }
    },
    resetPswVisible() {
      this.pwdVisible = {
        oldVisible: false,
        newVisible: false,
        confrimVisible: false
      }
    },
    updatePwd() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          // updatePassword(this.temp.oldPsw, this.temp.newPsw).then(res => {
          //   if (res.code === 0) {
          //     this.$message({
          //       type: 'success',
          //       message: res.msg
          //     })
          //   } else {
          //     this.$message.error({
          //       message: res.msg
          //     })
          //   }

          //   this.visible = false
          // })
        }
      })
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
  .svg-icon {
    margin-right: 30px;
    font-size: 16px;
    vertical-align: -0.3em;
  }
</style>
