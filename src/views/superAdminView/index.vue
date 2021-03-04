<template>
  <div class="container">
    <div class="table-container">
      <el-table
        v-loading="loading"
        :data="studentUserList"
        highlight-current-row
        height="250"
        :header-cell-style="{background:'#f0f9eb'}"
        style="width: 100%"
        row-key="id"
      >
        <el-table-column label="序号" align="center" width="80">
          <template slot-scope="{$index}">
            <span>{{ $index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="账号"
          align="center"
        />
        <el-table-column
          prop="password"
          label="密码"
          align="center"
        />
        <el-table-column
          prop="realName"
          label="姓名"
          align="center"
        />
        <el-table-column
          prop="phone"
          label="联系方式"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="{row}">
            <el-link type="warning" size="mini" @click="resetPwd(row)">
              重置密码
            </el-link>
            <el-link style="margin-left:10px" type="danger" size="mini" @click="handleDelete(row)">
              删除
            </el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getStudentsUsers } from '@/api/superAdmin'

export default {
  components: {

  },
  data() {
    return {
      loading: false,
      studentUserList: []
    }
  },
  mounted() {
    this.getStudentUsers()
  },
  methods: {
    getStudentUsers() {
      this.loading = true
      getStudentsUsers().then((res) => {
        this.studentUserList = res.data
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">

 .app-container{

    .filter-container{
      .el-select {
        width: 100px;
        padding-right: 15px;

        & >>> .el-input {
          width: 100%;
          padding-right: 0;
        }
      }

      .el-cascader {
        & >>> .el-input {
          width: 100%;
          padding-right: 0;
        }
      }

      .select-administrator {
        width: 220px;
      }
    }

    @media only screen and (max-width: 1024px) {
      .el-input >>> .el-input__inner {
        height: 32px;
      }

      .el-select >>> .el-input__inner {
        height: 32px;
      }

      .el-button {
        height: 32px;
      }

      .filter-container {
        font-size: 14px;
      }

      .el-table >>> .cell {
        font-size: 12px;
      }
    }

    .table-container {
      .gutter {
        margin-right: 5px;
      }
    }
  }
</style>
