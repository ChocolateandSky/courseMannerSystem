<template>
  <div>
    <h1>首页</h1>
    <fill-person-info
      :dialog-form-visible="dialogFormVisible"
      @close="close"
    />
  </div>
</template>

<script>
import fillPersonInfo from './components/fillPersonInfo'
export default {
  components: {
    fillPersonInfo
  },
  data() {
    return {
      dialogFormVisible: false
    }
  },
  mounted() {
    this.dialogFormVisible = true
  },
  methods: {
    close() {
      this.dialogFormVisible = false
    }
  }
}
</script>

<style>

</style>
