<template>
  <div>
    <div class="app-container">
      <div class="filter-container">
        <div class="form-table">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="170px"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="进度计划表标题:" prop="title">
                  <el-input v-model="ruleForm.title" placeholder="文件标题" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="总人数:" prop="stuAmountMax">
                  <el-input v-model="ruleForm.stuAmountMax" type="number" placeholder="只能填写数字" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="学院（系、部):" prop="collegeName">
                  <el-select v-model="ruleForm.collegeName" filterable placeholder="请选择学院">
                    <el-option
                      v-for="item in collegeList"
                      :key="item.index"
                      :label="item.college"
                      :value="item.college"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="课程代码、名称:" prop="practName">
                  <el-input v-model="ruleForm.practName" placeholder="请选择课程代码" clearable />
                  <!-- <el-select v-model="ruleForm.practName" filterable placeholder="请选择课程代码">
                    <el-option
                      v-for="item in courseId"
                      :key="item.index"
                      :label="item"
                      :value="item"
                    />
                  </el-select> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="课程序号:" prop="practNum">
                  <el-input v-model="ruleForm.practNum" placeholder="填写课程序号" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="面向年级、专业:" prop="major">
                  <el-input v-model="ruleForm.major" placeholder="填写年级专业" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="学时:" prop="time">
                  <el-input v-model="ruleForm.time" placeholder="只能填写数字" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="实施时间:" prop="periods">
                  <el-date-picker
                    v-model="ruleForm.periods"
                    style="width:65%"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="指导老师:" prop="teacherName">
                  <el-input v-model="ruleForm.teacherName" placeholder="填写指导老师" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设计场所:" prop="address">
                  <el-input v-model="ruleForm.address" placeholder="填写设计场所" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top: 20px;margin-bottom:10px">
              <el-col :span="24">
                <el-button size="small" type="success" @click="addRow">新增表格内容</el-button>
              </el-col>
            </el-row>
            <el-row class="workTable">
              <el-col :span="24">
                <el-table
                  ref="workTable"
                  :data="newList"
                  highlight-current-row
                  max-height="300px"
                  style="width: 100%"
                  :header-cell-style="{background:'#f0f9eb'}"
                  :default-sort="{prop: 'sort', order: 'ascending'}"
                >
                  <el-table-column label="具体工作内容" align="center">
                    <template slot-scope="{row}">
                      <template v-if="row.edit">
                        <el-input v-model="row.subject" resize="none" autosize type="textarea" clearable placeholder="请输入内容(可换行)" />
                      </template>
                      <span v-else>{{ row.subject }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="时间(周次，星期几，第几大节) 安排/地点" align="center">
                    <template slot-scope="{row}">
                      <template v-if="row.edit">
                        <el-input v-model="row.details" resize="none" autosize type="textarea" clearable placeholder="请输入内容(可换行)" />
                      </template>
                      <span v-else>{{ row.details }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" width="250" fixed="right">
                    <template slot-scope="{row, $index}">
                      <el-button v-if="!row.edit" style="margin:0 10px" type="primary" size="mini" @click="changeInput(row)">编辑</el-button>
                      <el-button v-else style="margin:0 10px" type="success" size="mini" @click="saveInput(row)">保存</el-button>
                      <el-button v-if="row.edit" type="warning" size="mini" @click="cancleEdit(row,$index)">取消</el-button>
                      <el-button v-else type="danger" size="mini" @click="deleteRow($index)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="填表人:" prop="preparer">
                  <el-input v-model="ruleForm.preparer" style="width:70%" placeholder="输入填表人" size="small" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="教研室主任:" prop="director">
                  <el-input v-model="ruleForm.director" style="width:70%" placeholder="填写教研室主任名字" size="small" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="日期:" prop="date">
                  <el-date-picker
                    v-model="ruleForm.date"
                    size="small"
                    type="date"
                    style="width:70%"
                    placeholder="选择日期"
                  />
                </el-form-item></el-col>
            </el-row>
            <el-row :style="{'margin-bottom':'50px'}">
              <el-col :span="24">
                <el-form-item>
                  <el-button class="pan-btn green-btn" @click="exportWord('ruleForm')">导出word文档</el-button>
                  <el-button class="pan-btn yellow-btn" @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { exportScheduleWord } from '@/api/file'
import { getCollegeInfoServlet } from '@/api/superAdmin'
export default {
  data() {
    return {
      autoHeight: '200px',
      collegeList: [],
      // courseId: ['软件工程课程设计AT1000', '嵌入式课程设计AT1001'],
      wokerTable: { subject: '', details: '', edit: true, index: 1 },
      ruleForm: {
        title: '',
        collegeName: '',
        practName: '',
        practNum: '',
        major: '',
        stuAmountMax: '',
        time: '',
        periods: [],
        period: '',
        teacherName: '',
        address: '',
        subject1: '',
        details1: '',
        subject2: '',
        details2: '',
        subject3: '',
        details3: '',
        subject4: '',
        details4: '',
        subject5: '',
        details5: '',
        subject6: '',
        details6: '',
        preparer: '',
        director: '',
        date: ''
      },
      newList: [
        { subject: '',
          details: '',
          edit: true,
          index: 1
        }
      ],
      rules: {
        stuAmountMax: [
          { required: true, message: '请填写总人数', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请填写标题', trigger: 'blur' }
        ],
        collegeName: [
          { required: true, message: '请选择学院', trigger: 'blur' }
        ],
        practName: [
          { required: true, message: '请填写课程名称,代码', trigger: 'blur' }
        ],
        practNum: [
          { required: true, message: '请填写课程序号', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '请填写学时', trigger: 'blur' }
        ],
        periods: [
          { required: true, type: 'array', message: '请填写实施时间', trigger: 'blur' }
        ],
        teacherName: [
          { required: true, message: '请填写指导老师', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请填写设计场地', trigger: 'blur' }
        ],
        major: [
          { required: true, message: '请填写所面向的年级专业', trigger: 'blur' }
        ],
        preparer: [
          { required: true, message: '请填写填表人', trigger: 'blur' }
        ],
        director: [
          { required: true, message: '请填写教研室主任', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请填写日期', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getAutoHeight()
    this.getCollegeInfoServlet()
    window.onresize = () => {
      this.getAutoHeight()
      console.log(this.autoHeight)
    }
  },
  methods: {
    getCollegeInfoServlet() {
      getCollegeInfoServlet().then(res => {
        this.collegeList = res.data
      })
    },
    exportWord(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.fixRuleForm()
          this.exportScheduleWord()
        }
      })
    },
    exportScheduleWord() {
      console.log(this.ruleForm)
      const data = this.ruleForm
      exportScheduleWord(data, '计划安排进度表')
      // exportScheduleWord(this.ruleForm)
      //   .then(res => {
      //     console.log(res)
      //   })
    },
    fixRuleForm() {
      const tableList = [...this.newList]
      for (let index = tableList.length; index < 6; index++) {
        tableList.push(this.wokerTable)
      }
      this.ruleForm.subject1 = tableList[0].subject
      this.ruleForm.details1 = tableList[0].details
      this.ruleForm.subject2 = tableList[1].subject
      this.ruleForm.details2 = tableList[1].details
      this.ruleForm.subject3 = tableList[2].subject
      this.ruleForm.details3 = tableList[2].details
      this.ruleForm.subject4 = tableList[3].subject
      this.ruleForm.details4 = tableList[3].details
      this.ruleForm.subject5 = tableList[4].subject
      this.ruleForm.details5 = tableList[4].details
      this.ruleForm.subject6 = tableList[5].subject
      this.ruleForm.details6 = tableList[5].details
      const period = []
      // 实施时间字符串转化
      this.ruleForm.periods.forEach(el => {
        var date = new Date(el)
        period.push(date.getFullYear() + `-` + (date.getMonth() + 1) + `-` + date.getDate())
      })
      this.ruleForm.period = period[0] + ' 至 ' + period[1]
      // 填表时间字符串转化
      var date = new Date(this.ruleForm.date)
      const tempDate = date.getFullYear() + `-` + (date.getMonth() + 1) + `-` + date.getDate()
      this.ruleForm.date = tempDate
    },
    saveInput(row, index) {
      row.edit = !row.edit
      row.index = index + 1
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    addRow() {
      const item = { ...this.wokerTable }
      if (this.newList.length >= 6) {
        this.$message.error('抱歉，内容最多只能填写6行')
        return
      }
      this.newList.push(item)
    },
    changeInput(row) {
      row.edit = !row.edit
    },
    cancleEdit(row) {
      row.edit = !row.edit
    },
    deleteRow(index) {
      this.newList.splice(index, 1)
    },
    getAutoHeight() {
      this.$nextTick(() => {
        this.autoHeight = window.innerHeight - (110) + 'px'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .app-container{
    padding: 12px;
    .filter-container{
      align-items: center;
      background-color: #fff;
      padding: 20px 20px 10px 20px;
      font-size: 14px;
      .form-table{
        margin: 0 auto;
      }
      .el-select{
        width: 65%;
      }
        .el-input {
        width: 65%;
      }
      .workTable{
        margin-bottom: 50px;
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
  }
</style>
