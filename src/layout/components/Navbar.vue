<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->

    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <el-badge :value="NoticeNum" class="item" type="primary">
            <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          </el-badge>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>个人主页</el-dropdown-item>
          </router-link>
          <router-link to="/natification/index">
            <el-dropdown-item>
              消息
              <el-badge class="mark" type="primary" :value="NoticeNum" />
            </el-dropdown-item>
          </router-link>
          <!-- <el-dropdown-item>
            <el-popover
              placement="left"
              width="100"
              trigger="hover"
            >
              <div v-for="o in 5" :key="o" class="teacher" style="text-align: center;margin-bottom:5px;border-bottom:rgb(220,223,230) 1px solid;padding-bottom: 5px;" @click="changeAdmin">
                <div>王宇英</div>
              </div>
              <el-button slot="reference" style="color:rgb(96,98,102)" type="text">转让管理员</el-button>
            </el-popover>
          </el-dropdown-item> -->
          <el-dropdown-item>
            <div @click="changePsw">修改密码</div>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <update-password :dialog-visible="showDialog" :userid="id" @dialogVisible="showDialog = $event" />
  </div>
</template>

<script>
import UpdatePassword from '@/components/UpdatePassword/index'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Breadcrumb,
    Hamburger,
    UpdatePassword
  },
  data() {
    return {
      showDialog: false,
      id: this.$store.getters.user.id,
      noticeNum: 0
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ]),
    NoticeNum() {
      let num = 0
      this.$store.getters.notice.forEach(el => {
        if (el.haveRead === 0) {
          num++
        }
      })
      return num
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push(`/`)
    },
    changeAdmin() {
      this.$confirm('你确定要将管理员权限转给他(她)吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '更改成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '更改失败'
        })
      })
    },
    changePsw() {
      this.showDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .teacher:hover{
    background-color: rgb(220,223,230);
   cursor: pointer;
  }
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
