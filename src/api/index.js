import axios from 'axios'

axios.defaults.withCredentials = true

/*  封装ajax方法 */
const requestResponse = (type, url, data) => {
  if (!type) type = 'GET'
  if (!data) data = null
  type = type.toUpperCase()
  if (type == 'GET') return axios.get(url, {params: data})
  if (type == 'PUT') return axios.put(url, qsToformdata(data))
  if (type == 'POST') return axios.post(url, qsToformdata(data))
}
/* json数据转化成formdata数据格式 */
const qsToformdata = (json) => {
  if (!json) return null
  var fd = new FormData()
  var jn = ''
  for (jn in json) {
    var jsonLi = json[jn]
    if (jsonLi.constructor === Array) {
      if (jsonLi.length === 0) {
        fd.append(jn, '')
      } else {
        if ((jsonLi[0]).constructor === File) {
          jsonLi.forEach((curr, index) => {
            fd.append(jn, curr)
          })
        } else {
          fd.append(jn, jsonLi)
        }
      }
    } else {
      fd.append(jn, jsonLi)
    }
  }
  return fd
}
var smaBaseUrl = '/api'
if (process.env.NODE_ENV === 'production') {
  smaBaseUrl = process.env.API_ROOT
}

// 获取所有作者名称
var getAllAuthor = () => requestResponse('POST', smaBaseUrl + '/searchallauthor')
// 根据作者id查询作者课程接口
var getCourse = (json) => requestResponse('POST', smaBaseUrl + '/getauthorarticle', json)
// 查询文章标题是否重复
var duplicateDetectionArticle = (json) => requestResponse('POST', smaBaseUrl + '/existarticlename', json)
// 查询课程标题是否重复
var duplicateDetectionCourse = (json) => requestResponse('POST', smaBaseUrl + '/existcourse', json)
// 查询新闻标题是否重复
var duplicateDetectionNews = (json) => requestResponse('POST', smaBaseUrl + '/checknewstitle', json)
// uploadImage
var uploadImage = (json) => requestResponse('POST', smaBaseUrl + '/picuploadhandle', json)
// uploadAudio
var uploadAudio = (json) => requestResponse('POST', smaBaseUrl + '/saveaudiohandle', json)
// uploadVideo
var uploadVideo = (json) => requestResponse('POST', smaBaseUrl + '/savevideohandle', json)
// 文章表单上传
var uploadArticleForm = (json) => requestResponse('POST', smaBaseUrl + '/addArticle', json)
// 课程表单上传
var uploadCourseForm = (json) => requestResponse('POST', smaBaseUrl + '/addCourse', json)
// 新闻表单上传
var uploadNewsForm = (json) => requestResponse('POST', smaBaseUrl + '/addnews', json)
// 查询新闻列表（每次请求20条数据）
var getNewsList = (json) => requestResponse('POST', smaBaseUrl + '/searchallnews', json)

// 根据文章id查询文章内容
var getArticleInfo = (json) => requestResponse('POST', smaBaseUrl + '/searcharticleinfo', json)
// 修改新闻内容
var modifyNews = (json) => requestResponse('POST', smaBaseUrl + '/updatenews', json)

export {

  getAllAuthor,
  getCourse,
  uploadImage,
  uploadAudio,
  uploadVideo,
  uploadArticleForm,
  uploadCourseForm,
  uploadNewsForm,
  duplicateDetectionArticle,
  duplicateDetectionCourse,
  duplicateDetectionNews,
  getNewsList,
  modifyNews,
  getArticleInfo
}
