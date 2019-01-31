<template>
  <div class="addCourse">
    <h1 class="title">添加课程</h1>
    <!--<div class="el-loading-mask" style="" v-if="true"><div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>&lt;!&ndash;&ndash;&gt;</div></div>-->
    <router-link to="/addArticle">返回添加文章页面</router-link>
    <el-form :model="courseinfo" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="课程作者：" prop="course_author">
        <el-select v-model="courseinfo.course_author" placeholder="请选择作者">
          <el-option v-for="(item,index) in authorList" :value="item.author_name" :label="item.author_name" :key="item.author_id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程名：" prop="course_name">
        <el-input v-model="courseinfo.course_name" @change="handelDuplicateDetectionCourse"></el-input>
        <el-alert v-if="!isUsableCourseTitle"
                  title="课程名重复"
                  type="error">
        </el-alert>
      </el-form-item>
      <el-form-item label="课程描述：" prop="course_desc">
        <el-input type="textarea" v-model="courseinfo.course_desc"></el-input>
      </el-form-item>
      <el-form-item label="课程图片：" prop="course_pic">
        <!--<el-upload-->
          <!--class="upload-demo"-->
          <!--action="https://www.51jiantan.com/picuploadhandle"-->
          <!--:on-preview="handlePreview"-->
          <!--:on-remove="handleRemove"-->
          <!--:file-list="fileList2"-->
          <!--list-type="picture">-->
          <!--<el-button size="small" type="primary">点击上传</el-button>-->
          <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        <!--</el-upload>-->
        <!--手动提交图片-->
        <input type="file" ref="uploadImages"/>
        <input type="button" value="提交" @click="handleUpload"/>
      </el-form-item>
      <el-form-item label="课程金额：" prop="course_money">
        <!--<el-input v-model="courseinfo.course_money"></el-input>-->
        <el-input-number v-model="courseinfo.course_money" :precision="2" :step="0.1" :max="9999999"></el-input-number>
      </el-form-item>
      <el-form-item label="更新时间：" prop="updatetime">
        <el-input v-model="courseinfo.updatetime"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getAllAuthor, uploadImage, uploadCourseForm, duplicateDetectionCourse} from '../../api/index'
export default {
  name: 'addCourse',
  data () {
    return {
      uploadImages: '',
      isUsableCourseTitle: true,
      authorList: [],
      courseinfo: {
        course_author: '',
        course_name: '',
        course_desc: '',
        course_money: '',
        updatetime: '',
        course_pic: ''
      },
      rules: {
        course_name: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        course_desc: [
          { required: true, message: '请输入课程描述', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 100 个字符内', trigger: 'blur' }
        ],
        course_money: [
          { required: true, message: '请输入课程金额', trigger: 'blur' }
        ],
        updatetime: [
          { required: true, message: '请输入课程更新时间', trigger: 'blur' }
        ],
        course_author: [
          { required: true, message: '请选择作者', trigger: 'change' }
        ],
        course_pic: [
          {required: true, message: '请选择文章图片', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    // 提交表单数据
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('提交成功!')
          console.log(this.courseinfo)
          // 调用上传表单接口
          uploadCourseForm(this.courseinfo)
            .then(res => {
              console.log('----------表单提交成功-------------')
              location.reload()
            })
            .catch()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 检测课程名是否重复
    handelDuplicateDetectionCourse (event) {
      console.log(event)
      duplicateDetectionCourse({course_name: event})
        .then(res => {
          console.log(res)
          if (res.data.msg == '1') {
            console.log('============课程标题重复==============')
            this.isUsableCourseTitle = false
          } else {
            console.log('============课程标题可用==============')
            this.isUsableCourseTitle = true
          }
        })
    },
    // 手动提交图片
    handleUpload () {
      var file = this.$refs.uploadImages.files[0]
      console.log('=============上传图片信息==============')
      console.log(file)
      uploadImage({'file': [file]}).then(res => {
        console.log('-------------图片上传成功--------------')
        console.log(res)
        if (res.status === 200 && res.data && res.data.pic_url) {
          this.courseinfo.course_pic = res.data.pic_url
          this.open2()
        }
        // console.log(this.articleinfo.article_pic)
      })
    },
    // 提示框
    open () {
      const h = this.$createElement

      this.$notify({
        title: '上传成功',
        message: h('i', { style: 'color: teal'}, '图片成功上传到服务器')
      })
    },
    open2 () {
      this.$message({
        message: '图片上传成功',
        type: 'success'
      })
    }
  },
  created () {
    // 调用获取全部作者接口获取作者信息
    getAllAuthor()
      .then(res => {
        console.log(res)
        if (res.status === 200 && res.data && res.data.authorinfo) {
          this.authorList = res.data.authorinfo
        }
      })
      .catch(res => {
        console.log('出错了')
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title{
    text-align: center;
  }
  .addCourse{
    width: 1200px;
    margin: 100px auto;
  }
  .demo-ruleForm{
    width: 1200px;
    margin: 100px auto;
  }
</style>
