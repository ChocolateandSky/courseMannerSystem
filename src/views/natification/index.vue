<template>
  <div class="natification">
    <div class="block">
      <el-timeline>
        <el-timeline-item v-for="(item,index) of notice" :key="index" :timestamp="item.date" placement="top">
          <el-card>
            <h4>{{ item.body }}</h4>
            <el-button type="text">{{ item.fromName }}&nbsp;提交于&nbsp;{{ item.date }}</el-button>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {
      notice: [],
      userId: this.$store.getters.user.id
    }
  },
  mounted() {
    this.notice = this.$store.getters.notice
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
 .natification{
   margin-top: 10px;
 }
</style>
