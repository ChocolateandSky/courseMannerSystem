<template>
  <div class="app-container">
    <el-dialog
      title="填写个人信息"
      :visible.sync="visible"
      width="600px"
      :close-on-press-escape="false"
      :show-close="true"
      :close-on-click-modal="false"
    >
      <el-form ref="ruleForm" label-width="120px" :model="user" :rules="rules" class="demo-ruleForm">
        <el-form-item label="电话:" prop="phone">
          <el-input v-model.number="user.phone" />
        </el-form-item>
        <el-form-item label="Email:" prop="email">
          <el-input v-model.trim="user.email" />
        </el-form-item>
        <el-form-item v-if="roleNum!==0" label="管理年级:" prop="grade">
          <el-input v-model.number="user.grade" />
        </el-form-item>
        <el-form-item v-else label="所属年级:" prop="grade">
          <el-input v-model.number="user.grade" />
        </el-form-item>
        <el-form-item label="所属专业:" prop="major">
          <el-select v-model.trim="user.major" filterable placeholder="请选择">
            <el-option
              v-for="item in majorList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="logout">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapGetters } from 'vuex'
import { updateTeacherIfo, updateStudentIfo } from '@/api/user'
import { getMajorInfoServlet } from '@/api/superAdmin'
export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    var checkPsw = (rule, value, callback) => {
      if (value.length < 6) {
        return callback(new Error('新密码位数不能小于6位'))
      } else if (value !== this.newPassword) {
        this.newPassword = ''
        return callback(new Error('两次密码不一样'))
      } else {
        callback()
      }
    }
    return {
      newPassword: '',
      roleNum: this.$store.getters.roleNum,
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请填入邮箱', trigger: 'blur' }
        ],
        major: [
          { required: true, message: '请选择所属专业', trigger: 'blur' }
        ],
        password: [
          { validator: checkPsw, trigger: 'blur' }
        ],
        grade: [
          { required: true, message: '请填写所管理年级', trigger: 'blur' }
        ]
      },
      majorList: []
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'loginCount'
    ]),
    visible: {
      get() {
        return this.dialogFormVisible
      },
      set(val) {
        if (!val) {
          this.closeDialog()
        }
      }
    }
  },
  mounted() {
    this.getMajorInfoServlet(this.user.collegeId)
  },
  methods: {
    getMajorInfoServlet(id) {
      this.majorList = []
      this.$set(this.teacherInfo, 'major', '')
      // console.log(this.teacherInfo)
      getMajorInfoServlet(id).then(res => {
        this.majorList = res.data
      })
    },
    updateStudentIfo() {
      updateStudentIfo(this.user)
        .then(res => {
          console.log(res)
          this.$message.success('修改成功')
        })
        .catch(err => {
          console.log(err)
          this.$message.error('修改失败')
        })
    },
    updateTeacherIfo() {
      updateTeacherIfo(this.user)
        .then(res => {
          console.log(res)
          this.$message.success('修改成功')
        })
        .catch(err => {
          console.log(err)
          this.$message.error('修改失败')
        })
    },
    async updateInfo() {
      if (this.roleNum !== 0) {
        await this.updateTeacherIfo()
      } else {
        await this.updateStudentIfo()
      }
    },
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.updateInfo()
          this.closeDialog()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    closeDialog() {
      this.$emit('close')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push(`/`)
    }
  }
}
</script>

<style lang="scss" scoped>
 .app-container{
   .el-input{
     width: 400px;
   }
   .el-select{
     width: 400px;
   }
 }
</style>
