<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>关于我</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          {{ role }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <div class="user-role text-center text-muted">{{ role }}</div>
        <!-- <div class="user-role text-center text-muted">{{ user.role | uppercaseFirst }}</div> -->
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="education" />
          <span style="margin-right:40%">个人介绍</span>
          <el-link type="primary" @click="updateItd">更改介绍</el-link>
        </div>
        <div class="user-bio-section-body">
          <el-input
            v-model="introductions[index]"
            :class="{active:!readonly}"
            type="textarea"
            autosize
            :rows="8"
            :readonly="readonly"
            resize="none"
            placeholder="请输入内容"
          />
          <div class="body-button">
            <el-button v-show="!readonly" round size="mini" @click="cancle">取消</el-button>
            <el-button v-show="!readonly" type="primary" round size="mini" @click="submin">确定</el-button>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { updateTeacherIfo, updateStudentIfo } from '@/api/user'
import PanThumb from '@/components/PanThumb'
import '../css/index.css'
export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          role: '',
          introduction: ''
        }
      }
    }
  },
  data() {
    return {
      introductions: [],
      index: 0,
      readonly: true,
      avatar: this.$store.getters.avatar,
      role: ''
    }
  },
  created() {
    this.introductions[0] = (this.user.introduction === '') ? '这家伙很懒，什么都没有留下' : this.user.introduction
    this.introductions[1] = this.introductions[0]
    this.role = this.user.role.toString()
  },
  methods: {
    updateItd() {
      this.readonly = false
      this.index = 1
    },
    submin() {
      this.readonly = true
      this.introductions[0] = this.introductions[1]
      this.index = 0
      this.user.introduction = this.introductions[1]
      this.$confirm('是否确认修改个人介绍?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        if (this.$store.getters.roleNum !== 0) {
          await this.updateTeacherIfo()
        } else {
          await this.updateStudentIfo()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消更改'
        })
      })
    },
    cancle() {
      this.readonly = true
      this.introductions[1] = this.user.introduction
      this.index = 0
    },
    updateTeacherIfo() {
      updateTeacherIfo(this.user)
        .then(res => {
          this.$message({
            type: 'success',
            message: '更改成功!'
          })
          // console.log(this.user)
          this.$emit('refresh', this.user)
        })
    },
    updateStudentIfo() {
      updateStudentIfo(this.user)
        .then(res => {
          this.$message({
            type: 'success',
            message: '更改成功!'
          })
          // console.log(this.user)
          this.$emit('refresh', this.user)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }
  .itd-style{
     color: red;
  }
  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
    .user-bio-section-body{
      .active{
        border: solid 1px;
        margin-bottom: 15px;
      }
      .body-button{
        margin-left: 50%;
      }
    }
  }
}
</style>
