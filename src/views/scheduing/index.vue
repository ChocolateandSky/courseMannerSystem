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
              <el-col :span="24"><el-form-item label="进度计划表标题:" prop="name">
                <el-input v-model="ruleForm.name" />
              </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="学院（系、部):" prop="region">
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
              <el-col :span="10">
                <el-form-item label="课程代码、名称:" prop="region">
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
              <el-col :span="10">
                <el-form-item label="课程序号:" prop="name">
                  <el-input v-model="ruleForm.courseOrder" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="学时：" prop="delivery">
                  <el-switch v-model="ruleForm.delivery" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="活动性质" prop="type">
              <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="美食/餐厅线上活动" name="type" />
                <el-checkbox label="地推活动" name="type" />
                <el-checkbox label="线下主题活动" name="type" />
                <el-checkbox label="单纯品牌曝光" name="type" />
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源" prop="resource">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="线上品牌商赞助" />
                <el-radio label="线下场地免费" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式" prop="desc">
              <el-input v-model="ruleForm.desc" style="width:500px" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  rules: {
    name: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    region: [
      { required: true, message: '请选择活动区域', trigger: 'change' }
    ],
    date1: [
      { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
    ],
    date2: [
      { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
    ],
    type: [
      { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
    ],
    resource: [
      { required: true, message: '请选择活动资源', trigger: 'change' }
    ],
    desc: [
      { required: true, message: '请填写活动形式', trigger: 'blur' }
    ]
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
        width: 350px;
      }
      .el-input {
        width: 350px;
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
