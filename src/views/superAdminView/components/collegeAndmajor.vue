<template>
  <div id="container">
    <div v-loading="loading" class="filter-container">

      <div class="header">
        <div class="searchBox">
          <el-button type="primary" style="margin-right:30px" icon="el-icon-circle-plus-outline" @click="dialogCollegeVisible = true">添加学院</el-button>
          <el-button type="primary" style="margin-right:30px" icon="el-icon-circle-plus-outline" @click="dialogMajorVisible = true">添加专业</el-button>
          <el-button type="danger" style="margin-right:30px" icon="el-icon-remove-outline" @click="dialogDelMajorVisible = true">删除</el-button>
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
              :value="item.id"
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

    <!-- 删除 -->
    <el-dialog width="25%" :visible.sync="dialogDelMajorVisible" @close="handleDialogClose()">
      <el-tabs v-model="activeName">
        <el-tab-pane label="删除专业" name="first">
          <el-form ref="delMajorForm" :model="delMajorForm">
            <el-form-item label="学 院:" label-width="90px" prop="collegeId">
              <el-select v-model="delMajorForm.collegeId" placeholder="请选择学院" style="width:100%" @change="getCollegeMajor">
                <el-option
                  v-for="item in collegeList"
                  :key="item.index"
                  :label="item.college"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="专 业:" label-width="90px" prop="major">
              <el-select v-model="delMajorForm.major" placeholder="请选择专业" style="width:100%">
                <el-option
                  v-for="item in majorList"
                  :key="item.index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="删除学院" name="second">
          <el-form ref="delCollegeForm" :model="delCollegeForm">
            <el-form-item label="学 院:" label-width="90px" prop="collegeId">
              <el-select v-model="delCollegeForm.collegeId" placeholder="请选择学院" style="width:100%" @change="getCollegeMajor">
                <el-option
                  v-for="item in collegeList"
                  :key="item.index"
                  :label="item.college"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDelMajorVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteMajor()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getMajorInfoServlet, getCollegeInfoServlet, addCollegeInfoServlet, addMajorInfoServlet, delMajorInfoServlet, delCollegeInfoServlet } from '@/api/superAdmin'
export default {
  components: {

  },
  data() {
    return {
      activeName: 'first',
      loading: false,
      collegeMajorList: [],
      collegeList: [],
      majorList: [],
      // tempList: [],
      dialogCollegeVisible: false,
      collegeform: {},
      dialogMajorVisible: false,
      formLabelWidth: '80px',
      majorform: {},
      dialogDelMajorVisible: false,
      delMajorForm: {},
      delCollegeForm: {}
    }
  },
  created() {
    this.getCollegeInfoServlet()
  },
  methods: {
    handleDialogClose() {
      this.$nextTick(() => {
        this.$refs['delMajorForm'].resetFields()
        this.$refs['delCollegeForm'].resetFields()
      })
    },
    getCollegeMajor(college) {
      getMajorInfoServlet(college).then(res => {
        this.majorList = []
        delete this.delMajorForm.major
        for (const i in res.data) {
          this.majorList.push({
            label: res.data[i].major,
            value: res.data[i].id
          })
        }
      })
    },
    deleteMajor() {
      if (this.activeName === 'first') {
        // console.log('first')
        delMajorInfoServlet(this.delMajorForm.major).then(res => {
        // console.log(this.delMajorForm.major)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.majorList.splice(this.majorList.indexOf(this.delMajorForm.major), 1)
          this.dialogDelMajorVisible = false
          this.getCollegeInfoServlet()
        }).catch(res => {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
          this.dialogDelMajorVisible = false
          this.getCollegeInfoServlet()
        })
      } else {
        // console.log('second')
        delCollegeInfoServlet(this.delCollegeForm.collegeId).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.collegeList.splice(this.collegeList.indexOf(this.delCollegeForm.college), 1)
          this.dialogDelMajorVisible = false
          this.getCollegeInfoServlet()
        }).catch(res => {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
          this.dialogDelMajorVisible = false
          this.getCollegeInfoServlet()
        })
      }
    },
    resetData() {
      this.collegeMajorList = []
    },
    addMajorInfoServlet() {
      console.log(this.majorform)
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
      this.collegeMajorList = []
      getCollegeInfoServlet().then((res) => {
        this.collegeList = res.data
        if (this.collegeList.length === 0) {
          this.loading = false
          return
        }
        res.data.forEach(async element => {
          await getMajorInfoServlet(element.id).then(res2 => {
            if (res2.data.length !== 0) {
              this.collegeMajorList.push(res2.data)
              // this.tempList.push(res.data)
            } else {
              if (element.college !== '') {
                const temp = [{
                  college: element.college,
                  collegeId: '',
                  id: '',
                  major: '暂无数据'
                }]
                this.collegeMajorList.push(temp)
                // this.tempList.push(res.data)
              }
            }
          })
          this.loading = false
        })
      }).catch(err => {
        console.log(err)
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
