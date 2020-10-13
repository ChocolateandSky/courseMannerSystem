<template>
  <div class="app-container">
    <div
      class="filter-container "
    >
      <one-groups class="one-groups" :style="{height:autoHeight}" />
    </div>
  </div>
</template>

<script>
import OneGroups from './components/OneGroups'

export default {
  name: 'GroupDetails',
  components: {
    OneGroups
  },
  data() {
    return {
      autoHeight: '200px'
    }
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
