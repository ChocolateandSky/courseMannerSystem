<template>
  <div id="container">
    <div v-loading="loading" class="filter-container">

      <div class="header">
        <div class="searchBox">
          <el-button type="primary" style="margin-right:30px" icon="el-icon-circle-plus-outline" @click="dialogCollegeVisible = true">添加学院</el-button>
          <el-button type="primary" style="margin-right:30px" icon="el-icon-circle-plus-outline" @click="dialogMajorVisible = true">添加专业</el-button>
        </div>
      </div>
      <el-collapse class="groupCollapse">
        <el-collapse-item v-for="(item,index) in collegeMajorList" :key="index">
          <template slot="title" class="title">
            {{ index+1 }}.  {{ item[0].college }}
          </template>
          <div v-for="(ele,ind) in item" :key="ind" class="collapse-item-content">
            {{ ind+1 }}.  {{ ele.major }}
            <el-divider />
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!-- //添加学院 -->
    <el-dialog title="添加学院" width="20%" :visible.sync="dialogCollegeVisible">
      <el-form :model="collegeform">
        <el-form-item label="学院名称:" :label-width="formLabelWidth">
          <el-input v-model="collegeform.college" autocomplete="off" placeholder="请输入要添加的学院名称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCollegeVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCollegeInfoServlet">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加专业 -->
    <el-dialog title="添加专业" width="20%" :visible.sync="dialogMajorVisible">
      <el-form :model="majorform">
        <el-form-item label="所属学院：" label-width="90px">
          <el-select v-model="majorform.collegeId" placeholder="请选择所属学院" style="width:100%">
            <el-option
              v-for="item in collegeList"
              :key="item.index"
              :label="item.college"
              :value="item.collegeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="专业名称：" label-width=" 90px">
          <el-input v-model="majorform.major" autocomplete="off" placeholder="请输入要添加的专业名称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMajorVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMajorInfoServlet">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getMajorInfoServlet, getCollegeInfoServlet, addCollegeInfoServlet, addMajorInfoServlet } from '@/api/superAdmin'
export default {
  components: {

  },
  data() {
    return {
      loading: false,
      collegeMajorList: [],
      collegeList: [],
      tempList: [],
      dialogCollegeVisible: false,
      collegeform: {},
      dialogMajorVisible: false,
      formLabelWidth: '80px',
      majorform: {}
    }
  },
  created() {
    this.getCollegeInfoServlet()
  },
  methods: {
    addMajorInfoServlet() {
      addMajorInfoServlet(this.majorform)
        .then(res => {
          this.$message.success('添加成功')
          this.getCollegeInfoServlet()
          this.dialogMajorVisible = false
        })
    },
    addCollegeInfoServlet() {
      addCollegeInfoServlet(this.collegeform)
        .then(res => {
          this.$message.success('添加成功')
          this.getCollegeInfoServlet()
          this.dialogCollegeVisible = false
        })
    },
    getMajorInfoServlet(id) {
      this.majorList = []
      this.$set(this.teacherInfo, 'major', '')
      // console.log(this.teacherInfo)
      getMajorInfoServlet(id).then(res => {
        this.majorList = res.data
      })
    },
    getCollegeInfoServlet() {
      this.loading = true
      getCollegeInfoServlet().then((res) => {
        this.collegeList = res.data
        res.data.forEach(async element => {
          await getMajorInfoServlet(element.id).then(res => {
            if (res.data.length !== 0) {
              this.collegeMajorList.push(res.data)
              this.tempList.push(res.data)
            } else {
              const temp = [{
                college: element.college,
                collegeId: '',
                id: '',
                major: '暂无数据'
              }]
              this.collegeMajorList.push(temp)
              this.tempList.push(res.data)
            }
          })
        })
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss">
 #container {
    height: 100%;
    width: 100%;
    padding: 12px;
    .filter-container {
      align-items: center;
      background-color: #fff;
      padding: 20px 20px 100px 20px;
      font-size: 14px;

      .header {
        margin-bottom: 20px;
        display: flex;
      }

      .groupCollapse {
        .el-collapse-item {
          .el-collapse-item__header {
            color: rgb(64, 158, 225);
            font-size: 18px;
          }
            .collapse-item-content{
              margin-left: 30px;
              margin-top: 10px;
              font-size: 17px;
              // border-bottom: 0.5px solid black;
              color: rgb(66,185,131);
              .el-divider{
                margin: 0;
              }
            }
        }
      }
    }
  }
</style>
