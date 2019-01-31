<!-- 富文本编辑器组件 -->
<template>
  <div class="ho-editor" :style="{minHeight: height}" :class="'ho-editor-'+sizeEditor">
    <textarea :id="'editor'+elId" v-model="content"></textarea>
    <div class="ed-toj" v-if="tojWord" :class="{red:defaultWordCount>maxWord}"><span>{{defaultWordCount}}</span>/{{maxWord}}</div>
    <div v-if="loading" class="el-loading-mask" style=""><div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg></div></div>
  </div>
</template>

<script>
import { uploadImage } from '../../api/index'
export default {
  name: 'tinEdite',
  // head () {
  //   return {
  //     script: [
  //       {type: 'text/javascript', src: '../../../../../lib/tinymce_4.9.0/tinymce.min.js'}
  //     ]
  //   }
  // },
  props: {
    'value': {
      default: '',
      type: String
    },
    'height': {
      default: 500,
      type: Number
    },
    'size-editor': {
      default: 'nor', // nor  为 正常编辑器功能  mini 为 简版编辑器  msg 发消息编辑
      type: String
    },
    'mode-editor': {
      default: true, // true is design（设计模式） false is readonly（只读模式）
      type: Boolean
    },
    'max-word': {
      default: 10000,
      type: Number
    },
    'min-word': {
      default: 0,
      type: Number
    },
    'toj-word': {
      default: false, // 字数统计开关
      type: Boolean
    },
    'eWidth': {
      default: '100%',
      type: String
    }
  },
  data () {
    return {
      serBaseUrl: this.$store.state.serFileUrl,
      loading: true,
      editor: null,
      timers: null,
      content: '',
      apiKey: 'uq1ijaov6slirk22y1vdpxptvjz78h0tqem94rp9qjp28joh',
      init: {
        convert_urls: false, // 是否将资源地址转换为 相对路径
        branding: false,
        theme: 'modern',
        language: 'zh_CN',
        language_url: '',
        menubar: false,
        plugins: '',
        external_plugins: {},
        // CONFIG
        forced_root_block: 'p',
        force_p_newlines: true,
        importcss_append: true,
        // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
        content_style: `
                    *                         { padding:0; margin:0; }
                    html, body                { height:100%; }
                    body                      { width: 100%;margin: 0 auto;}
                    img                       { ${this.sizeEditor != 'msg' ? 'max-width: 100%; display:block; margin:0 auto;' : ''}}
                    a                         { text-decoration: none; }
                    iframe                    { width: 100%; }
                    p                         { line-height:1.6; margin: 0px; }
                    table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
                    .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
                    ul,ol                     { list-style-position:inside; }
                  `,
        /* insert_button_items: 'image link | inserttable', */
        // CONFIG: Paste
        paste_retain_style_properties: 'all',
        paste_word_valid_elements: '*[*]', // word需要它
        paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_convert_word_fake_lists: false, // 插入word文档需要该属性
        paste_webkit_styles: 'all',
        paste_merge_formats: true,
        nonbreaking_force_tab: false,
        paste_auto_cleanup_on_paste: false,
        // CONFIG: Font
        fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px 32px 36px',
        // CONFIG: StyleSelect
        style_formats: [
          {
            title: '首行缩进',
            block: 'p',
            styles: { 'text-indent': '2em' }
          },
          {
            title: '行高',
            items: [
              {title: '1', styles: { 'line-height': '1' }, inline: 'span'},
              {title: '1.5', styles: { 'line-height': '1.5' }, inline: 'span'},
              {title: '2', styles: { 'line-height': '2' }, inline: 'span'},
              {title: '2.5', styles: { 'line-height': '2.5' }, inline: 'span'},
              {title: '3', styles: { 'line-height': '3' }, inline: 'span'}
            ]
          }
        ],
        // FontSelect
        font_formats: `
                    微软雅黑=微软雅黑;
                    宋体=宋体;
                    黑体=黑体;
                    仿宋=仿宋;
                    楷体=楷体;
                    隶书=隶书;
                    幼圆=幼圆;
                    Andale Mono=andale mono,times;
                    Arial=arial, helvetica,
                    sans-serif;
                    Arial Black=arial black, avant garde;
                    Book Antiqua=book antiqua,palatino;
                    Comic Sans MS=comic sans ms,sans-serif;
                    Courier New=courier new,courier;
                    Georgia=georgia,palatino;
                    Helvetica=helvetica;
                    Impact=impact,chicago;
                    Symbol=symbol;
                    Tahoma=tahoma,arial,helvetica,sans-serif;
                    Terminal=terminal,monaco;
                    Times New Roman=times new roman,times;
                    Trebuchet MS=trebuchet ms,geneva;
                    Verdana=verdana,geneva;
                    Webdings=webdings;
                    Wingdings=wingdings,zapf dingbats`,

        // Tab
        tabfocus_elements: ':prev,:next',
        object_resizing: true,
        // Image
        imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
        /* file_browser_callback_types: 'image media', */
        images_upload_handler: (blobInfo, success, failure) => {
          // uploadSigFile({
          //   file: blobInfo.blob(), fileType: 'IMAGE', prefix: 'general'
          // })
          //   .then(res => {
          //     if (res.data && res.data.code >= 0) {
          //       success(this.serBaseUrl + '/' + res.data.data.transformationPath)
          //     } else {
          //       failure('err')
          //     }
          //   })
          //   .catch(err => {
          //     failure('err')
          //   })
          uploadImage({file: blobInfo.blob()})
            .then(res => {
              console.log('上传成功')
              console.log(res)
              success(res.data.pic_url)
            })
            .catch(res => {
              console.log('失败了')
              failure('err')
            })
        }
      },
      normalToolbar: `styleselect | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | image  | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist  | table | preview removeformat  hr | paste code  link | undo redo | fullscreen `,
      miniToolbar: `styleselect | fontselect | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent`,
      /* msgToolbar: `hoEmoji | hoImage`, */
      msgToolbar: `hoEmoji | image`,
      normalPlugins: 'paste hoEmoji hoImage importcss image code table advlist fullscreen link media lists textcolor colorpicker hr preview',
      miniPlugins: 'paste hoEmoji hoImage importcss image code table advlist fullscreen link media lists textcolor colorpicker hr preview',
      msgPlugins: 'paste hoEmoji hoImage image',
      // 不同示例标示id  实现  多个编辑器使用
      elId: (new Date()).getTime() + (Math.round(Math.random() * 1000)).toString(),
      defaultWordCount: 5000,
      edFlag: true
    }
  },
  created () {

  },
  methods: {
    initOption () {
      /* var baseUrl = 'http://'+window.location.origin */
      if (this.sizeEditor == 'msg') {
        // 消息模式时 粘贴 过滤 dom标签
        this.init.paste_preprocess = function (plugin, args) {
          var content = args.content.replace(/<\/?.+?>/g, '')
          args.content = content.replace(/ /g, '')
        }
      }
      var origin = window.location.origin
      this.init.selector = '#editor' + this.elId
      this.init.height = this.height
      this.init.language_url = origin + '/static/lib/langs/zh_CN.js'
      this.init.external_plugins.hoEmoji = origin + '/static/js/tinymce/hoEmoji.js'
      this.init.external_plugins.hoImage = origin + '/static/js/tinymce/hoImage.js'
      this.init.toolbar = this.sizeEditor == 'nor' ? this.normalToolbar : this.sizeEditor == 'mini' ? this.miniToolbar : this.msgToolbar
      this.init.plugins = this.sizeEditor == 'nor' ? this.normalPlugins : this.sizeEditor == 'mini' ? this.miniPlugins : this.msgPlugins
      this.init.init_instance_callback = this.initEditor
    },
    initEditor (editor) {
      this.editor = editor
      this.editor.on('NodeChange', (e) => this.uploadData(true))
      if (this.modeEditor) this.editor.setMode('design')
      else this.editor.setMode('readonly')
    },
    uploadData (flag = false) {
      let content = this.editor.getContent()
      this.content = content
      if (flag) this.$emit('editorChange', content)
      this.defaultWordCount = this.validateWordSize(content)
      if (this.defaultWordCount > this.maxWord) {
        this.$message({
          message: '不能输入超过' + this.maxWord + '个字符',
          type: 'warning'
        })
      }
    },
    validateWordSize (content) {
      if (content == '' && !content) return 0
      var str = content
      str = str.replace(/<\/?[^>]*>/g, '')
      str = str.replace(/[ | ]*\n/g, '\n')
      str = str.replace(/&nbsp;/ig, '')
      return str.length
    },
    initFn () {
      tinymce.init(this.init).then(() => {
        // 置空并销毁该组件上的editor
        if (this.editor) this.editor.setContent(this.value)
        // 解决富文本在项目相同组复用 时 插件不启用
        if (this.edFlag) {
          if (this.editor) this.editor.destroy()
          setTimeout(() => {
            this.initOption()
            this.initFn()
            this.loading = false
            this.edFlag = false
            if (!this.edFlag && this.editor && (this.content !== this.value)) this.editor.setContent(this.value)
          }, 500)
        }
      })
    }
  },
  watch: {
    value () {
      // if parent component for value is change  when  child for content is upload  data
      if (!this.edFlag && this.editor && (this.content !== this.value)) this.editor.setContent(this.value)
    }
  },
  mounted () {
    this.initOption()
    this.initFn()
  },
  beforeDestroy () {
    if (this.editor) this.editor.destroy()
  }
}
</script>

<style lang="scss">
  .ho-editor{
    position: relative;
    padding-right: 2px;
    &.ho-editor-msg{
      .mce-panel.mce-stack-layout-item.mce-last{
        display: none;
      }
    }
    textarea{
      opacity: 0;
    }
    .mce-menubtn.mce-fixed-width span{
      width: auto;
    }
    .ed-toj{
      display: inline-block;
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 5px 10px;
      &.red{
        color: #ff0000;
      }
      span{

      }
    }
  }
</style>
