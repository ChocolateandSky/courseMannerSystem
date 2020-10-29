<template>
  <div class="app-container">
    <div
      class="filter-container "
    >
      <one-groups :team-data="teamData" class="one-groups" :style="{height:autoHeight}" />
    </div>
  </div>
</template>

<script>
import OneGroups from './components/OneGroups'
import { getGroupDetail } from '@/api/group'

export default {
  name: 'GroupDetails',
  components: {
    OneGroups
  },
  data() {
    return {
      autoHeight: '200px',
      teamId: this.$route.query.teamId,
      teamData: null
    }
  },
  created() {
    this.getGroupDetail(this.teamId)
  },
  mounted() {
    this.getAutoHeight()
    window.onresize = () => {
      this.getAutoHeight()
    }
  },
  methods: {
    getAutoHeight() {
      this.$nextTick(() => {
        this.autoHeight = window.innerHeight + 100 + 'px'
      })
    },
    getGroupDetail(id) {
      getGroupDetail(id).then(res => {
        this.teamData = res.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>

 .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
 .app-container{
    height: auto;
    width: 100%;
    padding: 12px 12px 50px 12px;
    .filter-container{
      align-items: center;
      background-color: #fff ;
      height: 100%;
      font-size: 14px;
    }
 }
</style>
