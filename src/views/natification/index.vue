<template>
  <div class="natification">
    <div class="block">
      <el-timeline>
        <el-timeline-item v-for="(item,index) in notice" :key="index" :timestamp="item.date" placement="top" @click.native="doRead(item)">
          <el-card class="notice-card">
            <h4>{{ item.body }}</h4>
            <el-button type="text">{{ item.fromName }}&nbsp;提交于&nbsp;{{ item.date }}</el-button>
            <svg-icon v-if="item.havaRead===0" class="notice-icon" icon-class="notice" />
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { readNotice } from '@/api/user'
export default {
  components: {

  },
  data() {
    return {
      userId: this.$store.getters.user.id,
      haveRead: false
    }
  },
  computed: {
    ...mapGetters([
      'notice'
    ])
  },
  methods: {
    doRead(item) {
      console.log(item)
      const data = { noticeId: item.id }
      readNotice(data).then((res) => {
        console.log(res)
        item.havaRead = 1
      })
    }
  }
}
</script>

<style scoped lang="scss">
 .natification{
   .block{
     padding-bottom: 100px;
   }
   margin-top: 10px;
   .notice-card{
     position: relative;
     .notice-icon{
       position: absolute;
       right: 30px;
       top: 40%;
       width: 30px;
       height: 30px;
     }
   }
   .notice-card:hover{
      box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.2);
        backface-visibility: hidden;
        transform: translateY(-2px);
        cursor: pointer;
   }
 }
</style>
