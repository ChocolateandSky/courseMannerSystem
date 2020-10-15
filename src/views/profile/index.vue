<template>
  <div class="app-container">
    <div v-if="userIfo">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="userIfo" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="个人信息" name="account">
                <account :user="userIfo" :is-teacher="isTeacher" :is-student="isStudent" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, Account },
  data() {
    return {
      userIfo: {},
      activeTab: 'account',
      isTeacher: false,
      isStudent: false
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'roles',
      'user'
    ])
  },
  created() {
    this.getUser()
  },
  mounted() {
    console.log(this.userIfo)
  },
  methods: {
    getUser() {
      if (this.roles.includes('teacher')) {
        this.isTeacher = true
        this.userIfo = {
          id: this.user.id,
          name: this.user.name,
          role: this.roles.join(' | '),
          email: this.user.email,
          gender: this.user.gender,
          phone: this.user.phone,
          major: this.user.major,
          grade: this.user.gender,
          introduction: this.user.introduction,
          avatar: this.avatar
        }
      } else {
        this.userIfo = this.user
      }
    }
  }
}
</script>
