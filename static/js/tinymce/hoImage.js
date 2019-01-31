tinymce.PluginManager.add('hoImage', function (editor, url) {
  function hoImageUploadAjax () {
    var input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.onchange = function () {
      var file = this.files[0]
      var reader = new FileReader()
      reader.onload = function () {
        /* var id = 'blobid' + (new Date()).getTime()
                var blobCache =  tinymce.activeEditor.editorUpload.blobCache
                var base64 = reader.result.split(',')[1]
                var blobInfo = blobCache.create(id, file, base64)
                blobCache.add(blobInfo) */
        var fileUrl = window.createObjectURL != undefined
          ? window.createObjectURL(file)
          : window.URL != undefined
            ? window.URL.createObjectURL(file)
            : window.URL.createObjectURL(file)
        editor.insertContent('<img src="' + fileUrl + '">')
      }
      reader.readAsDataURL(file)
    }
    input.click()
  }
  editor.addCommand('hoImageUpload', hoImageUploadAjax)
  editor.addButton('hoImage', {
    /* text: '图片 ', */
    icon: 'image',
    cmd: 'hoImageUpload',
    tooltip: '图片'
  })
})
