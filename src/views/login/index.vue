<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">桂林电子科技大学课程设计管理系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username(学号)"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
      <el-button type="text" @click="dialogFormVisible = true">注册</el-button>

      <!-- 注册 -->
      <el-dialog
        title="注册"
        :visible.sync="dialogFormVisible"
        width="30%"
        style="position:fixed ;z-index:1"
        @open.once="handleDialogOpen()"
      >
        <Vcode
          :show="showVerificationCode"
          success-text="验证成功"
          fail-text="验证失败，请重试"
          style="position:absolute;z-index:2"
          @success="success"
          @close="close"
        />
        <el-form ref="registerForm" :model="registerForm" :rules="registerRules" label-position="left" label-width="90px">
          <el-form-item class="test" label="姓名:" prop="realName">
            <el-input v-model.trim="registerForm.realName" />
          </el-form-item>
          <el-form-item class="test" label="学号:" prop="userName">
            <el-input v-model.number.trim="registerForm.userName" />
          </el-form-item>
          <el-form-item class="test" label="性别:" prop="gender">
            <el-radio-group v-model="registerForm.gender">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="test" label="密码:" prop="password">
            <el-input v-model.trim="registerForm.password" show-password />
          </el-form-item>
          <el-form-item class="test" label="确认密码:" prop="checkpassword">
            <el-input v-model.trim="registerForm.checkpassword" show-password />
          </el-form-item>
          <el-form-item class="test" label="学院:" prop="college">
            <el-select v-model="registerForm.college" placeholder="请选择学院" style="width: 100%" @change="getCollegeMajor(registerForm.college)">
              <el-option
                v-for="item in collegeOptions"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item class="test" label="专业:" prop="major">
            <el-select v-model="registerForm.major" placeholder="请选择专业" style="width: 100%">
              <el-option
                v-for="item in majorOptions"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item class="test" label="邮箱:" prop="email">
            <el-input v-model.trim="registerForm.email" />
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handlePutRegisterForm()">确 定</el-button>
        </div>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { validUsername } from '@/utils/validate'
import SocialSign from './components/SocialSignin'
import { getColleges, getMajor, putRegisterForm } from '@/api/course'
import Vcode from 'vue-puzzle-vcode'
export default {
  name: 'Login',
  // eslint-disable-next-line vue/no-unused-components
  components: { SocialSign, Vcode },
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error('请输入用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('请输入6位数以上的密码'))
    //   } else {
    //     callback()
    //   }
    // }
    const checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      // if (!value) {
      //   return callback(new Error('邮箱不能为空'))
      // }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    // 校验密码
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致,请重新输入'))
      } else {
        callback()
      }
    }
    return {
      showVerificationCode: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      // 注册表单
      registerForm: {
        userName: '', // 学号
        realName: '', // 姓名
        password: '', // 密码
        checkpassword: '', // 确认密码
        gender: '', // 性别
        college: '', // 学院
        major: '', // 专业
        email: '' // 邮箱
      },
      registerRules: {
        realName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { pattern: /[\u4e00-\u9fa5]/, message: '只能输入中文', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          // { min: 10, message: '请输入10位学号', trigger: 'blur' },
          { type: 'number', message: '学号只能是数字' }
        ],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码不能小于6位', trigger: 'blur' }
        ],
        checkpassword: [{ validator: validatePass, trigger: 'blur' }],
        college: [{ required: true, message: '请选择所属学院', trigger: 'change' }],
        major: [{ required: true, message: '请选择所属专业', trigger: 'change' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ]
      },
      collegeOptions: [],
      majorOptions: [],
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        // username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        // password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          console.log(this.redirect)
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
    getColleges().then(res => {
      for (const i in res.data) {
        this.collegeOptions.push({
          label: res.data[i].college,
          value: res.data[i].college,
          collegeId: res.data[i].id
        })
      }
    })
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    // 打开注册对话框
    handleDialogOpen() {
      // getColleges().then(res => {
      //   for (const i in res.data) {
      //     this.collegeOptions.push({
      //       label: res.data[i].college,
      //       value: res.data[i].college,
      //       collegeId: res.data[i].id
      //     })
      //   }
      // })
    },
    // 联动学院和专业
    getCollegeMajor(college) {
      // getMajor(college).then(res => {
      //   this.majorOptions = []
      //   delete this.registerForm.major
      //   for (const i in res.data) {
      //     this.majorOptions.push({
      //       label: res.data[i].major,
      //       value: res.data[i].major
      //     })
      //   }
      // })
      for (const i in this.collegeOptions) {
        getMajor(this.collegeOptions[i].collegeId).then(res => {
          this.majorOptions = []
          delete this.registerForm.major
          for (const j in res.data) {
            this.majorOptions.push({
              label: res.data[j].major,
              value: res.data[j].major
            })
          }
        })
        // console.log(college === this.collegeOptions[i].value)
        // console.log(this.collegeOptions[i].collegeId)
      }
    },
    // 关闭注册对话框
    // handleDialogClose() {
    //   this.$nextTick(() => {
    //     this.$refs['registerForm'].resetFields()
    //   })
    // },
    handlePutRegisterForm() {
      this.$refs['registerForm'].validate(valid => {
        if (valid) {
          this.showVerificationCode = true
          this.dialogFormVisible = false
        } else { return false }
      })
      // this.dialogFormVisible = false
    },
    success(msg) {
      this.showVerificationCode = false
      putRegisterForm({
        userName: this.registerForm.userName, // 用户名
        realName: this.registerForm.realName, // 学号
        password: this.registerForm.password, // 密码
        gender: this.registerForm.gender, // 性别
        college: this.registerForm.college[0], // 学院
        major: this.registerForm.major, // 专业
        email: this.registerForm.email // 邮箱
      }).then(res => {
        // console.log(this.registerForm)
        this.$message({
          type: 'success',
          message: '注册成功'
        })
        this.handlePutRegisterForm
        this.dialogFormVisible = false
      })
    },
    close() {
      this.showVerificationCode = false
      this.dialogFormVisible = true
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.el-form--label-left .test .el-form-item__label {
    text-align: center;
    letter-spacing: 4px;
}

.test .el-form-item__label {
  // background-color: #fff;
  color: #606266;
  line-height: 50px;
  padding: 0;
}

.test .el-form-item__content .el-input .el-input__inner{
  height: 50px;
  color: #606266;
  caret-color: black;
  font-weight: bold;
  padding: 0;
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  // background-image: url(./img/school.jpg);
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
