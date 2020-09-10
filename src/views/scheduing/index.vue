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
                  <el-input v-model="ruleForm.title" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="总人数:" prop="totalMan">
                  <el-input v-model="ruleForm.totalMan" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="学院（系、部):" prop="college">
                  <el-select v-model="ruleForm.college" filterable placeholder="请选择学院">
                    <el-option
                      v-for="item in collegeList"
                      :key="item.index"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="课程代码、名称:" prop="course">
                  <el-select v-model="ruleForm.course" filterable placeholder="请选择课程代码">
                    <el-option
                      v-for="item in courseId"
                      :key="item.index"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="课程序号:" prop="courseOrder">
                  <el-input v-model="ruleForm.courseOrder" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="面向年级、专业:" prop="gradeAndMajor">
                  <el-input v-model="ruleForm.gradeAndMajor" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="学时:" prop="period">
                  <el-input v-model="ruleForm.period" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="实施时间:" prop="time">
                  <el-date-picker
                    v-model="ruleForm.time"
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
                <el-form-item label="指导老师:" prop="teacher">
                  <el-input v-model="ruleForm.teacher" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设计场所:" prop="site">
                  <el-input v-model="ruleForm.site" clearable />
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
                  :data="ruleForm.newList"
                  highlight-current-row
                  max-height="300px"
                  style="width: 100%"
                  :header-cell-style="{background:'#f0f9eb'}"
                  :default-sort="{prop: 'sort', order: 'ascending'}"
                >
                  <el-table-column label="具体工作内容" align="center">
                    <template slot-scope="{row}">
                      <template v-if="row.edit">
                        <el-input v-model="row.workContent" resize="none" autosize type="textarea" clearable placeholder="请输入内容(可换行)" />
                      </template>
                      <span v-else>{{ row.workContent }}</span>
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
                      <el-link v-if="!row.edit" style="margin:0 10px" type="primary" size="mini" @click="changeInput(row)">
                        编辑
                      </el-link>
                      <el-link v-else style="margin:0 10px" type="primary" size="mini" @click="saveInput(row)">
                        保存
                      </el-link>
                      <el-link v-if="row.edit" type="primary" size="mini" @click="cancleEdit(row,$index)">
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
            <el-row>
              <el-col :span="8">
                <el-form-item label="填表人:" prop="fillFormName">
                  <el-input v-model="ruleForm.fillFormName" style="width:70%" size="small" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="教研室主任:" prop="chairman">
                  <el-input v-model="ruleForm.chairman" style="width:70%" size="small" clearable />
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
import docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'

export default {
  data() {
    return {
      autoHeight: '200px',
      collegeList: ['软件工程', '计算机科学与技术'],
      courseId: ['软件工程课程设计AT1000', '嵌入式课程设计AT1001'],
      wokerTable: { workeContent: '', details: '', edit: true },
      ruleForm: {
        title: '',
        college: '',
        course: '',
        courseOrder: '',
        gradeAndMajor: '',
        totalMan: 0,
        period: '',
        time: [],
        teacher: '',
        site: '',
        fillFormName: '',
        chairman: '',
        date: '',
        newList: [
          { workContent: '',
            details: '',
            edit: true,
            index: 1
          }
        ]
      },
      rules: {
        title: [
          { message: '请填写标题', trigger: 'blur' }
        ],
        college: [
          { message: '请选择学院', trigger: 'blur' }
        ],
        course: [
          { message: '请填写课程代码', trigger: 'blur' }
        ],
        courseOrder: [
          { message: '请填写课程序号', trigger: 'blur' }
        ],
        period: [
          { message: '请填写学时', trigger: 'blur' }
        ],
        time: [
          { type: 'array', message: '请填写实施时间', trigger: 'blur' }
        ],
        teacher: [
          { message: '请填写指导老师', trigger: 'blur' }
        ],
        site: [
          { message: '请填写设计场地', trigger: 'blur' }
        ],
        gradeAndMajor: [
          { message: '请填写所面向的年级专业', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getAutoHeight()
    window.onresize = () => {
      this.getAutoHeight()
      console.log(this.autoHeight)
    }
  },
  methods: {
    exportWord(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // eslint-disable-next-line no-unused-vars
          const that = this
          // 读取并获得模板文件的二进制内容
          JSZipUtils.getBinaryContent('scheduleForm.doc', function(error, content) {
            // model.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
            // 抛出异常
            if (error) {
              throw error
            }

            // 创建一个PizZip实例，内容为模板的内容
            var zip = new PizZip(content)
            // 创建并加载docxtemplater实例对象
            // eslint-disable-next-line new-cap
            var doc = new docxtemplater().loadZip(zip)
            // 设置模板变量的值
            const docxData = {
              title: this.ruleForm.title,
              college: this.ruleForm.college,
              course: this.ruleForm.course,
              courseOrder: this.ruleForm.courseOrder,
              gradeAndMajor: this.ruleForm.gradeAndMajor,
              totalMan: this.ruleForm.totalMan,
              period: this.ruleForm.period,
              time: this.ruleForm.time,
              teacher: this.ruleForm.teacher,
              site: this.ruleForm.site,
              workTable: this.ruleForm.newList,
              fillFormName: this.ruleForm.fillFormName
            }
            doc.setData({
              ...docxData
            })

            try {
            // 用模板变量的值替换所有模板变量
              doc.render()
            } catch (error) {
            // 抛出异常
              const e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties
              }
              console.log(JSON.stringify({ error: e }))
              throw error
            }

            // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
            const out = doc.getZip().generate({
              type: 'blob',
              mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            })
            // 将目标文件对象保存为目标类型的文件，并命名
            saveAs(out, '计划安排表格.docx')
          })
        }
      })
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
