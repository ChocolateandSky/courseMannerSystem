<template>
  <div>
    <div class="app-container">
      <div class="filter-container">
        <div class="form-table">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="auto"
            class="demo-ruleForm"
          >
            <el-row>
              <el-col :span="24">
                <el-form-item label="进度计划表标题:" prop="title">
                  <el-input v-model="ruleForm.title" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="学院（系、部):" prop="college">
                  <el-select v-model="ruleForm.college" filterable placeholder="请选择">
                    <el-option
                      v-for="item in collegeList"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="课程代码、名称:" prop="course">
                  <el-select v-model="ruleForm.course" filterable placeholder="请选择">
                    <el-option
                      v-for="item in courseId"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="课程序号:" prop="courseOrder">
                  <el-input v-model="ruleForm.courseOrder" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="面向年级、专业:" prop="gradeAndMajor">
                  <el-input v-model="ruleForm.gradeAndMajor" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="学时:" prop="period">
                  <el-input v-model="ruleForm.period" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="实施时间:" prop="time">
                  <el-date-picker
                    v-model="ruleForm.time"
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
                <el-form-item label="指导老师:" prop="teacher">
                  <el-input v-model="ruleForm.teacher" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设计场所:" prop="site">
                  <el-input v-model="ruleForm.site" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top: 20px;margin-bottom:10px">
              <el-col :span="24">
                <el-button size="small" type="success" @click="addRow">新增表格内容</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-table
                  ref="workTable"
                  :data="ruleForm.newList"
                  highlight-current-row
                  max-height="300px"
                  style="width: 100%"
                  class="workTable"
                  :header-cell-style="{background:'#f5f7fa'}"
                  :default-sort="{prop: 'sort', order: 'ascending'}"
                >
                  <el-table-column label="具体工作内容" align="center">
                    <template slot-scope="{row}">
                      <el-input v-model="row.workContent" placeholder="请输入内容" />
                    </template>
                  </el-table-column>
                  <el-table-column label="时间(周次，星期几，第几大节) 安排/地点" align="center" placeholder="请输入内容">
                    <template slot-scope="{row}">
                      <el-input v-model="row.details" />
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" width="250" fixed="right">
                    <template slot-scope="{row, $index}">
                      <el-link v-if="!row.edit" type="primary" size="mini" @click="changeInput(row)">
                        编辑
                      </el-link>
                      <el-link v-else type="primary" size="mini" @click="row.edit = !row.edit">
                        保存
                      </el-link>
                      <el-link v-if="row.edit" type="primary" size="mini" @click="cancleEdit(row)">
                        取消
                      </el-link>
                      <el-link v-else type="primary" size="mini" @click="deleteRow($index)">
                        删除
                      </el-link>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="exportWord('ruleForm')">导出word文档</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import docxtemplater from 'docxtemplater'
// eslint-disable-next-line no-unused-vars
import PizZip from 'pizzip'
// eslint-disable-next-line no-unused-vars
import JSZipUtils from 'jszip-utils'
// eslint-disable-next-line no-unused-vars
import { saveAs } from 'file-saver'

export default {
  data() {
    return {
      collegeList: ['软件工程', '计算机科学与技术'],
      courseId: ['软件工程课程设计', '嵌入式课程设计'],
      wokerTable: { workeContent: '', details: '', edit: true },
      ruleForm: {
        title: '',
        college: '',
        course: '',
        courseOrder: '',
        gradeAndMajor: '',
        totalMan: 0,
        period: '',
        time: '',
        teacher: '',
        site: '',
        newList: [{ workeContent: '', details: '', edit: true }]
      },
      rules: {
        title: [
          { required: true, message: '请填写标题', trigger: 'blur' }
        ],
        college: [
          { type: 'array', required: true, message: '请选择学院', trigger: 'change' }
        ],
        course: [
          { required: true, message: '请填写课程代码', trigger: 'change' }
        ],
        courseOrder: [
          { required: true, message: '请填写课程序号', trigger: 'change' }
        ],
        period: [
          { type: 'array', required: true, message: '请填写学时', trigger: 'change' }
        ],
        time: [
          { type: 'date', required: true, message: '请填写实施时间', trigger: 'change' }
        ],
        teacher: [
          { required: true, message: '请填写指导老师', trigger: 'blur' }
        ],
        site: [
          { required: true, message: '请填写设计场地', trigger: 'blur' }
        ],
        gradeAndMajor: [
          { required: true, message: '请填写所面向的年级专业', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    exportWord(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('asd')
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    addRow() {
      const item = { ...this.wokerTable }
      this.ruleForm.newList.push(item)
    },
    changeInput(row) {
      row.edit = !row.edit
    },
    cancleEdit(row) {
      row.edit = !row.edit
    },
    deleteRow(index) {
      this.ruleForm.newList.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
   .form-table{
        margin: 0 auto;
      }
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
        width: 300px;
      }
      .workTable{
        margin-bottom: 50px;
      }
      .el-input {
        width: 300px;
      }
      .search {
        margin-left: 10px;
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
