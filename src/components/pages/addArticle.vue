<template>
  <div class="addArticle">
    <h1 class="title">添加文章</h1>
    <el-form :model="articleinfo" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="作者：" prop="author_id">
        <el-select v-model="articleinfo.author_id" placeholder="请选择作者" @change="handleAuthorChange">
          <el-option v-for="item in authorList" :value="item.author_id" :label="item.author_name"
                     :key="item.author_id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属课程：" prop="course_name">
        <el-select v-model="articleinfo.course_name" placeholder="请选择所属课程" @change="handleCourseChange">
          <el-option v-for="item in courseList" :label="item.course_name" :value="item.course_name"
                     :key="item.course_id"></el-option>
          <el-option label="精品单文" value="article" key="9999"></el-option>
        </el-select>
        <router-link to="/addCourse">新建课程</router-link>
      </el-form-item>
      <el-form-item label="文章金额：" prop="article_price" v-if="isArticle">
        <!--<el-input v-model="articleinfo.article_price"></el-input>-->
        <el-input-number v-model="articleinfo.article_price" :precision="2" :step="0.1"
                         :max="9999999"></el-input-number>
      </el-form-item>
      <el-form-item label="文章标题：" prop="article_title">
        <el-input v-model="articleinfo.article_title" @change="handelDuplicateDetectionArticle"></el-input>
        <el-alert v-if="!isUsableArticleTitle"
                  title="文章标题重复"
                  type="error">
        </el-alert>
      </el-form-item>
      <el-form-item label="文章描述：" prop="article_desc">
        <el-input type="textarea" v-model="articleinfo.article_desc"></el-input>
      </el-form-item>
      <el-form-item label="文章图片：" prop="article_pic">
        <!--<el-upload-->
        <!--class="upload-demo"-->
        <!--action="https://www.51jiantan.com/picuploadhandle"-->
        <!--name="file"-->
        <!--ref="upload"-->
        <!--:http-request="uploadImg"-->
        <!--:on-change="handleChange"-->
        <!--:on-preview="handlePreview"-->
        <!--:on-remove="handleRemove"-->
        <!--:on-success="handleSuccess"-->
        <!--:on-error="handleError"-->
        <!--list-type="picture">-->
        <!--<el-button size="small" type="primary">点击上传</el-button>-->
        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        <!--</el-upload>-->

        <!--手动提交图片-->
        <input type="file" ref="uploadImages"/>
        <input type="button" value="提交" @click="handleUpload"/>
      </el-form-item>
      <!--<el-form-item label="音/视频名称："  v-if="isArticle" prop="video_title_none">-->
      <!--<el-input v-model="articleinfo.video_title"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="音/视频名称：" :prop="isArticle?'video_title_none':'video_title'" >-->
      <!--<el-input v-model="articleinfo.video_title"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="音/视频："  v-if="isArticle" prop="audio_type_none">-->
      <!--<el-radio-group v-model="articleinfo.audio_type" @change="changeAudioType">-->
      <!--<el-radio label="音频"></el-radio>-->
      <!--<el-radio label="视频"></el-radio>-->
      <!--</el-radio-group>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="音/视频：" :prop="isArticle?'audio_type_none':'audio_type'" >-->
      <!--<el-radio-group v-model="articleinfo.audio_type" @change="changeAudioType">-->
      <!--<el-radio label="音频"></el-radio>-->
      <!--<el-radio label="视频"></el-radio>-->
      <!--</el-radio-group>-->
      <!--</el-form-item>-->
      <!--<div v-if="isArticle">-->
      <!--<el-form-item v-if="isAudio" label="音频地址：" prop="audio_url_none"  >-->
      <!--<el-input v-model="articleinfo.audio_url"></el-input>-->
      <!--</el-form-item>-->

      <!--<el-form-item v-else label="视频地址：" prop="video_url_none">-->
      <!--<el-input v-model="articleinfo.video_url"></el-input>-->
      <!--</el-form-item></div>-->
      <el-form-item label="视频地址：" prop="video_url">
        <input type="file" ref="uploadVideo"/>
        <input type="button" value="提交" @click="handleUploadVideo" />
        <el-input v-model="articleinfo.video_url"></el-input>
      </el-form-item>
      <el-form-item label="音频地址：" prop="audio_url">
        <input type="file" ref="uploadAudio"/>
        <input type="button" value="提交" @click="handleUploadAudio" />
        <el-input v-model="articleinfo.audio_url"></el-input>
      </el-form-item>

      <div class="audioBoxBox">
        <el-form-item class="audioBox " label="朗读人：" prop="audio_read">
          <el-input class="input" v-model="articleinfo.audio_read"></el-input>
        </el-form-item>
        <el-form-item class="audioBox " label="时长：" prop="audio_duration">
          <!--<el-input class="input" v-model="hour" @change="changeTime"></el-input>-->
          <!--时-->
          <el-input type="number" class="input" v-model="minute" @change="changeTime"></el-input>
          分
          <el-input type="number" class="input" v-model="second" @change="changeTime"></el-input>
          秒
        </el-form-item>
        <el-form-item class="audioBox " label="文件大小：" prop="audio_size">
          <el-input type="number" class="input" v-model="articleinfo.audio_size"></el-input>
          M
        </el-form-item>
      </div>
      <el-form-item label="文章内容：" prop="content">
        <!--<div id="editorElem" style="text-align:left"></div>-->
        <!--<button v-on:click="getContent">查看内容</button>-->
        <tin-edite :height="400" eWidth="1160px" @editorChange="editorChange"></tin-edite>
      </el-form-item>.
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import tinEdite from '../../components/common/editor.vue'

  import E from 'wangeditor'
import {getAllAuthor, getCourse, uploadImage, uploadAudio, uploadVideo, uploadArticleForm, duplicateDetectionArticle} from '../../api/index'

// axios.defaults.withCredentials = true
export default {
  name: 'addArticle',
  data () {
    return {
      editor: null,
      // isAudio: true,
      isArticle: false,
      isUsableArticleTitle: true,
      uploadImages: '',
      authorList: [],
      courseList: [],
      articleinfo: {
        author_id: '',
        course_name: '',
        article_price: '',
        article_title: '',
        article_desc: '',
        // audio_type: '',
        audio_url: '',
        audio_read: '',
        audio_duration: '',
        audio_size: '',
        video_url: '',
        // video_title: '',
        article_pic: '',
        content: ''
      },
      // hour: null,
      minute: null,
      second: null,
      rules: {
        article_title: [
          {required: true, message: '请输入文章标题', trigger: 'blur'}
        ],
        article_desc: [
          {required: false, message: '请输入文章描述', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 100 个字符内', trigger: 'blur'}
        ],
        // video_title: [
        //   {required: true, message: '请输入课程音/视频名称', trigger: 'blur'}
        // ],
        // audio_type: [
        //   {required: true, message: '请选择音/视频', trigger: 'change'}
        // ],
        audio_url: [
          {required: false, message: '请输入课程音频地址', trigger: 'blur'}
        ],
        video_url: [
          {required: false, message: '请输入课程视频地址', trigger: 'blur'}
        ],
        // audio_duration: [
        //   {required: false, trigger: 'change'},
        //   {type: 'number', message: '必须是数字'}
        // ],
        article_price: [
          {required: true, message: '请输入文章金额', trigger: 'blur'},
          {type: 'number', message: '必须是数字'}
        ],
        author_id: [
          {required: true, message: '请选择作者', trigger: 'change'}
        ],
        course_name: [
          {required: true, message: '请选择所属课程', trigger: 'change'}
        ],
        article_pic: [
          {required: false, message: '请选择文章图片', trigger: 'change'}
        ],
        // audio_size: [
        //   {required: false, trigger: 'change'},
        //   {type: 'number', message: '必须是数字'}
        // ],
        content: [
          {required: true, message: '请输入文章内容', trigger: 'blur'}
        ]
      }
    }
  },
  components: {
    tinEdite
  },
  methods: {
    // 上传图片
    // uploadImg (f) {
    //   console.log(f)
    //   let param = new FormData() // 创建form对象
    //   param.append('file', f.file)// 通过append向form对象添加数据
    //   // param.append('fileName', f.file.name)
    //   console.log('*********')
    //   console.log(f.file)
    //   console.log(f.file.name)
    //   console.log('*********')
    //
    //   let config = {
    //     // 添加请求头
    //     headers: {'Content-Type': 'multipart/form-data'}
    //   }
    //
    //   // axios({
    //   //   method: 'post',
    //   //   url: 'https://www.51jiantan.com/picuploadhandle',
    //   //   headers: {
    //   //     'Content-Type': 'multipart/form-data',
    //   //     'X-Requested-With': 'XMLHttpRequest',
    //   //     'Access-Control-Allow-Origin': '*',
    //   //     'Access-Control-Allow-Methods': 'POST',
    //   //     'Access-Control-Allow-Headers': 'x-requested-with,content-type'
    //   //   },
    //   //   data: {
    //   //     file: ff
    //   //   }
    //   // })
    //
    //   // 上传图片
    //   this.$axios.post(f.action, param)
    //     .then(res => {
    //       console.log('=============图片上传成功===============')
    //       console.log(res)
    //       // onSuccess(response.data)
    //       if (res.status === 200 && res.data && res.data.pic_url) {
    //         this.articleForm.articlePicUrl = res.data.pic_url
    //       }
    //     })
    //     .catch(error => {
    //       // f.onError()
    //       console.log('---------------图片上传失败---------------')
    //       console.log(error)
    //     })
    // },
    // handleChange (file, fileList) {
    //   console.log(file)
    // },
    // // 移除已上传的图片
    // handleRemove (file, fileList) {
    //   console.log(file, fileList)
    // },
    // // 预览已上传的图片
    // handlePreview (file) {
    //   console.log(file)
    // },
    // // 图片上传成功
    // handleSuccess (response, file, fileList) {
    //   console.log(response, file, fileList)
    //   alert(response.toString())
    //   // 调用接口获取图片地址
    // },
    // handleError (err, file, fileList) {
    //   console.log(err, file, fileList)
    // },
    // 手动提交图片
    handleUpload () {
      var file = this.$refs.uploadImages.files[0]
      console.log('=============上传图片信息==============')
      console.log(file)
      uploadImage({'file': [file]}).then(res => {
        console.log(res)
        if (res.status === 200 && res.data && res.data.pic_url) {
          console.log('-------------图片上传成功--------------')
          this.articleinfo.article_pic = res.data.pic_url
          // this.open()
          this.open2()
        }
        // console.log(this.articleinfo.article_pic)
      })
    },
    // 手动提交音频文件
    handleUploadAudio () {
      this.loading = true
      var file = this.$refs.uploadAudio.files[0]
      console.log('=============上传文件信息==============')
      console.log(file)
      console.log(file.size)
      let size = file.size / 1024 / 1024
      this.articleinfo.audio_size = size.toFixed(2)
      // 获取录音时长
      var url = URL.createObjectURL(file)
      // 经测试，发现audio也可获取视频的时长
      var audioElement = new Audio(url)

      var that = this
      var duration
      audioElement.addEventListener('loadedmetadata', function (_event) {
        duration = audioElement.duration
        console.log(duration)
        console.log(duration / 60)
        that.articleinfo.audio_duration = duration
        that.minute = parseInt(duration / 60)
        that.second = parseInt(duration % 60)
        console.log(that.minute, that.second)
      })
      console.log([file])
      uploadAudio({'file': [file]}).then(res => {
        console.log(res)
        if (res.status === 200 && res.data && res.data.audio_url) {
          console.log('-------------音频上传成功--------------')
          this.articleinfo.audio_url = res.data.audio_url
          this.loading = false
          // this.open()
          this.open2('音频上传成功')
        }
        console.log(this.articleinfo.audio_url)
      })
    },
    // 手动提交视频文件
    handleUploadVideo () {
      this.loading = true

      var file = this.$refs.uploadVideo.files[0]
      console.log('=============上传文件信息==============')
      console.log(file)
      // console.log(file.size)
      // // this.articleinfo.audio_size = file.size/1024/1024
      // // 获取录音时长
      // var url = URL.createObjectURL(file)
      // // 经测试，发现audio也可获取视频的时长
      // var audioElement = new Audio(url)
      //
      // var duration
      // audioElement.addEventListener('loadedmetadata', function (_event) {
      //   duration = audioElement.duration
      //   console.log(duration)
      //   console.log(duration / 60)
      //   // this.articleinfo.audio_duration = duration
      //   this.minute = parseInt(duration / 60)
      //   this.second = parseInt(duration % 60)
      //   console.log(this.minute,this.second)
      // })
      console.log([file])
      uploadVideo({'file': [file]}).then(res => {
        console.log(res)
        if (res.status === 200 && res.data && res.data.video_url) {
          console.log('-------------视频上传成功--------------')
          this.articleinfo.video_url = res.data.video_url
          this.loading = false
          // this.open()
          this.open2('视频上传成功')
        }
        console.log(this.articleinfo.video_url)
      })
    },
    // 提示框
    // 右上角的提示框
    open () {
      this.$notify({
        title: '成功',
        message: '图片上传成功',
        type: 'success'
      })
    },
    // 中间顶部的提示框
    open2 () {
      this.$message({
        message: '图片上传成功',
        type: 'success'
      })
    },
    // 提交表单数据
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.articleinfo)
          // 调用上传表单接口
          uploadArticleForm(this.articleinfo)
            .then(res => {
              console.log(res)
              if (res.data.msg == '1') {
                console.log('----------表单提交成功-------------')
                alert('提交成功!')
                location.reload()
              } else {
                console.log('----------表单提交失败-------------')
                alert('提交失败!')
              }
            })
            .catch()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置表单数据
    resetForm (formName) {
      // this.uploadImages.value = ''
      this.editor.txt.clear()
      this.$refs[formName].resetFields()
    },

    // 选择作者,显示作者对应的课程
    handleAuthorChange (event) {
      console.log(event)
      var json = {
        author_id: event
      }
      this.articleinfo.course_name = ''
      // 调用根据作者id查询作者课程接口
      getCourse(json)
        .then(res => {
          console.log('-------------获取到作者课程数据----------------')
          console.log(res)

          if (res.status === 200 && res.data && res.data.courseinfo) {
            this.courseList = res.data.courseinfo
          }

          // console.log(this.courseList)
        })
        .catch(res => {
          console.log('出错啦')
        })
    },
    // 改变课程，如果是精品单文，显示文章金额，音/视频信息变为非必填项
    handleCourseChange (event) {
      console.log(event)
      if (event === 'article') {
        this.isArticle = true
      } else {
        this.isArticle = false
      }
    },
    // // 音视频单选框选择不同的选项，对应相应的地址输入框
    // changeAudioType (event) {
    //   console.log(event)
    //   if (event === '音频') {
    //     this.isAudio = true
    //   } else {
    //     this.isAudio = false
    //   }
    // },
    // 检测文章标题是否重复
    handelDuplicateDetectionArticle (event) {
      console.log(event)
      duplicateDetectionArticle({article_title: event})
        .then(res => {
          console.log(res)
          if (res.data.msg == '1') {
            console.log('============文章标题重复==============')
            this.isUsableArticleTitle = false
          } else {
            console.log('============文章标题可用==============')
            this.isUsableArticleTitle = true
          }
        })
    },
    // 转换时间
    changeTime () {
      console.log(this.minute + '分' + this.second + '秒')
      this.articleinfo.audio_duration = this.minute * 60 + this.second * 1
      console.log(this.articleinfo.audio_duration)
    },
    //  富文本过滤word标签
    // removeWordXml (text) {
    //   var html = text
    //   html = html.replace(/<\/?SPANYES[^>]*>/gi, '')//  Remove  all  SPAN  tags
    //   html = html.replace(/<(\w[^>]*) {2}class=([^|>]*)([^>]*)/gi, '<$1$3') //  Remove  Class  attributes
    //   html = html.replace(/<(\w[^>]*) {2}style="([^"]*)"([^>]*)/gi, '<$1$3') //  Remove  Style  attributes
    //   html = html.replace(/<(\w[^>]*) {2}lang=([^|>]*)([^>]*)/gi, '<$1$3')//  Remove  Lang  attributes
    //   html = html.replace(/<\\?\?xml[^>]*>/gi, '')//  Remove  XML  elements  and  declarations
    //   html = html.replace(/<\/?\w+:[^>]*>/gi, '')//  Remove  Tags  with  XML  namespace  declarations:  <o:p></o:p>
    //   html = html.replace(/&nbsp;/, '')//  Replace  the  &nbsp;
    //   html = html.replace(/\n(\n)*( )*(\n)*\n/gi, '\n')
    //   //  Transform  <P>  to  <DIV>
    //   // var  re  =  new  RegExp("(<P)([^>]*>.*?)(<//P>)","gi")  ;            //  Different  because  of  a  IE  5.0  error
    //   //        html = html.replace(re, "<div$2</div>");
    //   return html
    // },
    editorChange (str) {
      console.log(str)
      this.articleinfo.content = str
      this.validateFieldInput('content')
    },
    validateFieldInput (key) {
      try {
        this.$refs.ruleForm.validateField(key)
      } catch (e) {
        console.log('validateFieldInput [ validateField ] with valid prop string!')
      }
    }
  },
  // 富文本编辑器
  mounted () {
    // var that = this
    // this.editor = new E('#editorElem')
    // this.editor.customConfig.pasteFilterStyle = true
    // // 自定义处理粘贴的文本内容
    // this.editor.customConfig.pasteTextHandle = function (content) {
    //   // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
    //   // return content + '<p>在粘贴内容后面追加一行</p>'
    //   if (content == '' && !content) return ''
    //   var str = content
    //   str = str.replace(/<xml>[\s\S]*?<\/xml>/ig, '')
    //   str = str.replace(/<style>[\s\S]*?<\/style>/ig, '')
    //   str = str.replace(/<\/?[^>]*>/g, '')
    //   str = str.replace(/[ | ]*\n/g, '\n')
    //   str = str.replace(/&nbsp;/ig, '')
    //   console.log('****', content)
    //   console.log('****', str)
    //   return str
    // }
    // this.editor.customConfig.onchange = (html) => {
    //   // let html1 = this.removeWordXml(html)
    //   this.articleinfo.content = html
    // }
    // this.editor.customConfig.customUploadImg = function (files, insert) {
    //   // files 是 input 中选中的文件列表
    //   // insert 是获取图片 url 后，插入到编辑器的方法
    //   var file = files[0]
    //   console.log(file)
    //   uploadImage({'file': [file]}).then(res => {
    //     console.log('-------------图片上传成功--------------')
    //     console.log(res)
    //     if (res.status === 200 && res.data && res.data.pic_url) {
    //       that.open()
    //     }
    //     // 上传代码返回结果之后，将图片插入到编辑器中
    //     insert(res.data.pic_url)
    //   })
    // }
    // this.editor.create()
  },
  created () {
    // 调用获取全部作者接口获取作者信息
    getAllAuthor()
      .then(res => {
        console.log('-------------获取到作者数据----------------')
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
<style>
  .audioBox .el-form-item__label {
    color: #999 !important;
    display: inline-block;
    color: #999;
  }

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .demo-ruleForm {
    width: 1200px;
    margin: 100px auto;
  }

  .audioBoxBox {
    padding-left: 70px;
  }

  /*.audioBox .el-form-item__label {*/
    /*color: #999 !important;*/
  /*}*/

  .audioBox {
    display: inline-block;
    color: #999;
  }

  .title {
    text-align: center;
  }

  .input {
    width: 100px;
    padding-right: 10px;
  }
</style>
