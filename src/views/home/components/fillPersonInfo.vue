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
        <!-- <el-form-item label="教师编号:">
          <el-input v-model.trim="user.teacherId" placeholder="请输入教师编号" />
        </el-form-item> -->
        <!-- <el-form-item label="姓名:">
          <el-input v-model.trim="user.name" prop="name" placeholder="请输入您的姓名" />
        </el-form-item>
        <el-form-item label="性别:">
          <el-radio-group v-model="user.gender">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="电话:">
          <el-input v-model.trim="user.phone" placeholder="请输入您的电话号码" />
        </el-form-item>
        <el-form-item label="Email:" prop="email">
          <el-input v-model.trim="user.email" placeholder="请输入您的邮件" />
        </el-form-item>
        <el-form-item label="管理年级:" prop="grade">
          <el-input v-model.trim="user.grade" placeholder="请输入您所管理的年级" />
        </el-form-item>
        <el-form-item label="所属学院专业:" prop="major">
          <el-select v-model.trim="user.major" filterable placeholder="请选择所属专业">
            <el-option
              v-for="item in majorList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="新密码:">
          <el-input v-model="user.password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item label="再次确认密码:">
          <el-input v-model="newPassword" show-password />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
// import { mapGetters } from 'vuex'
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
      user: {
        teacherId: '',
        name: '',
        email: '',
        gender: '',
        phone: '',
        major: '',
        grade: '',
        password: ''
      },
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
      majorList: [{
        value: '软件工程',
        label: '软件工程'
      }, {
        value: '计算机科学与技术',
        label: '计算机科学与技术'
      }, {
        value: '物联网工程',
        label: '物联网工程'
      }, {
        value: '智能科学与技术',
        label: '智能科学与技术'
      }, {
        value: '信息安全',
        label: '信息安全'
      }]
    }
  },
  computed: {
    // ...mapGetters([
    //   'user'
    // ])
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
  methods: {
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.closeDialog()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    closeDialog() {
      this.$emit('close')
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
