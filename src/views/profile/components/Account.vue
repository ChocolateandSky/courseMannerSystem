<template>
  <div class="acount">
    <el-row>
      <el-col :span="11" style="margin-right: 40px">
        <el-form label-width="100px" style="flex:1" :model="user">
          <el-form-item label="教师编号:" prop="id">
            <el-input v-model.trim="user.id" :disabled="true" />
          </el-form-item>
          <el-form-item label="姓名:" prop="name">
            <el-input v-model.trim="user.name" :disabled="true" />
          </el-form-item>
          <el-form-item label="性别:" prop="gender">
            <el-radio-group v-model="user.gender" :disabled="true">
              <el-radio label="男" />
              <el-radio label="女" />
            </el-radio-group>
          </el-form-item>
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
          <el-form-item>
            <el-button type="primary" @click="updateInfo">更改基本信息</el-button>
            <el-button type="primary" @click="submitPsw">更改密码</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="11">
        <el-card :body-style="{ padding: '0px' }">
          <el-image
            :src="require('@/assets/profile.png')"
            fit="fill"
          />
        </el-card>
      </el-col>
    </el-row>
    <update-password :dialog-visible="showDialog" :userid="id" @dialogVisible="showDialog = $event" />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { updateTeacherIfo, updateStudentIfo } from '@/api/user'
import UpdatePassword from '@/components/UpdatePassword/index'
export default {
  components: {
    UpdatePassword
  },
  props: {
    user: {
      require: true,
      type: Object,
      default: () => {
        return {
          id: '',
          name: '',
          email: '',
          gender: '男',
          phone: '',
          major: '',
          grade: '',
          introduction: ''
        }
      }
    },
    isTeacher: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    isStudent: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
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
      }],
      showDialog: false,
      id: '',
      roleNum: this.$store.getters.roleNum
    }
  },
  computed: {
    imgUrl() {
      return '@/assets/profile.png'
    }
  },
  created() {
    this.id = this.user.id
  },
  methods: {
    submitPsw() {
      this.showDialog = true
    },
    updateInfo() {
      this.$confirm('是否确认修改基本信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.$store.getters.roleNum !== 0) {
          updateTeacherIfo(this.user).then(res => {
            this.$message({
              type: 'success',
              message: '更改成功!',
              duration: 5 * 1000
            })
            this.$emit('refresh', this.user)
          }).catch(err => {
            console.log(err)
            this.$message.error('更改失败')
          })
        } else {
          updateStudentIfo(this.user).then(res => {
            this.$message({
              type: 'success',
              message: '更改成功!',
              duration: 5 * 1000
            })
            this.$emit('refresh', this.user)
          }).catch(err => {
            console.log(err)
            this.$message.error('更改失败')
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消更改'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.acount{
  display: flex;
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }

  .el-form-item {
    .el-select,
    .el-input{
      width: 100%;
    }
  }
}
</style>
