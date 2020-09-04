<template>
  <div class="acount">
    <el-row>
      <el-col :span="11" style="margin-right: 40px">
        <el-form label-width="100px" style="flex:1">
          <el-form-item label="教师编号:">
            <el-input v-model.trim="user.teacherId" />
          </el-form-item>
          <el-form-item label="姓名:">
            <el-input v-model.trim="user.name" />
          </el-form-item>
          <el-form-item label="性别:">
            <el-radio-group v-model="user.gender">
              <el-radio label="男" />
              <el-radio label="女" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="电话:">
            <el-input v-model.trim="user.phone" />
          </el-form-item>
          <el-form-item label="Email:">
            <el-input v-model.trim="user.email" />
          </el-form-item>
          <el-form-item label="年级:">
            <el-input v-model.trim="user.grade" />
          </el-form-item>
          <el-form-item label="所属专业:">
            <el-select v-model.trim="user.major" filterable placeholder="请选择">
              <el-option
                v-for="item in majorList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">更改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="11">
        <el-card :body-style="{ padding: '0px' }">
          <el-image
            :src="require('@/assets/profile.png')"
            fit="fill"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        }
      }
    }
  },
  data() {
    return {
      majorList: [{
        value: '软件工程',
        label: '软件工程'
      }, {
        value: '计算机科学与技术',
        label: '计算机科学与技术'
      }, {
        value: '物联网工程',
        label: '物联网工程'
      }, {
        value: '智能科学与技术',
        label: '智能科学与技术'
      }, {
        value: '信息安全',
        label: '信息安全'
      }]
    }
  },
  computed: {
    imgUrl() {
      return '@/assets/profile.png'
    }
  },
  methods: {
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.acount{
  display: flex;
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }

  .el-form-item {
    .el-select,
    .el-input{
      width: 100%;
    }
  }
}
</style>
