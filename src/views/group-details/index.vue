<template>
  <div class="app-container">
    <div
      class="filter-container"
      :style="{height:autoHeight}"
    >
      <one-groups />
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
        this.autoHeight = window.innerHeight - (100) + 'px'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
 .app-container{
    height: 100%;
    width: 100%;
    padding: 12px;
    .filter-container{
      align-items: center;
      background-color: #fff ;
      padding: 20px 20px 10px 20px;
      font-size: 14px;
    }
 }
</style>
