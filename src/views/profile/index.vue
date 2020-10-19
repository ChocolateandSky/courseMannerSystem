<template>
  <div class="app-container">
    <div v-if="userIfo">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="userIfo" @refresh="tempUserIfo = $event" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="个人信息" name="account">
                <account :user="userIfo" :is-teacher="isTeacher" :is-student="isStudent" @refresh="tempUserIfo = $event" />
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
      tempUserIfo: {},
      activeTab: 'account',
      isTeacher: false,
      isStudent: false,
      college: this.$store.getters.user.college
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'roles',
      'user'
    ])
  },
  watch: {
    tempUserIfo(newName) {
      // const info = newName
      // info.college = this.college
      this.tempUserIfo.college = this.college
      // console.log(this.tempUserIfo)
      this.$store.dispatch('user/setUser', this.tempUserIfo)
      console.log(this.$store.getters.user)
      location.reload()
    }
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
          grade: this.user.grade,
          introduction: this.user.introduction
        }
      } else {
        this.userIfo = this.user
      }
    }
  }
}
</script>
