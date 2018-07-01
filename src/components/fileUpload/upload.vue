<template lang="pug">
  el-upload(
    :action="action"
    :headers="headers"
    :multiple="false"
    :on-success="handleSuccess"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :before-upload="beforeUpload"
    :limit="1"
    :on-exceed="handleExceed"
    :file-list="fileListData"
    list-type="picture")
    el-button(size="small" type="primary") 点击上传
    div(slot="tip" class="el-upload__tip") 只能上传jpg/png文件,且不超过2MB
</template>
<script type="text/ecmascript-6">
  import Cache from '../../../src/common/cache.js'
  import Vue from 'vue'
  import Message from '../../../src/common/message'
  export default {
    name: 'kalix-clansman-upload',
    props: {
      action: { // 文件上传路径
        type: String, default: ''
      },
      fileType: {
        type: String
      },
      fileList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        // https://jsonplaceholder.typicode.com/posts/
        file: null,
        headers: {'access_token': Cache.get('access_token'), 'jsessionid': Cache.get('user_token')},
        fileListData: this.fileList,
        isUpload: true
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList)
        if (file.status === 'success') {
          let attachmentId = ''
          let rev = ''
          if (file.response) {
            attachmentId = file.response.attachmentId
            rev = file.response.attachmentRev
          } else {
            let pathParts = file.url.split('/')
            pathParts.pop()
            attachmentId = pathParts.pop()
          }
          // 删除couchdb数据库中附件
          if (attachmentId !== '' && rev !== '') {
            Vue.axios.request({
              method: 'DELETE',
              url: '/camel/rest/couchdb',
              params: {'id': attachmentId, 'rev': rev},
              data: {}
            }).then((response) => {
              console.log(response.data.success)
            })
          }
          this.$emit('filePath', null, null)
        }
      },
      beforeUpload(file) {
        let isJPG = false
        let isLt2M = false
        if (this.fileType === 'img') {
          isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
          isLt2M = file.size / 1024 / 1024 < 2
          if (!isJPG) {
            Message.error('上传图片只能是 JPG 或 PNG 格式!')
            this.fileListData = []
            return
          }
          if (!isLt2M) {
            Message.error('上传图片大小不能超过 2MB!')
            this.fileListData = []
            return
          }
        } else if (this.fileType === 'video') {
          isJPG = file.type === 'video/avi' || file.type === 'video/mp4'
          isLt2M = file.size / 1024 / 1024 < 2
          if (!isJPG) {
            Message.error('上传头像图片只能是 JPG 或 PNG 格式!')
          }
          if (!isLt2M) {
            Message.error('上传头像图片大小不能超过 2MB!')
          }
        } else {
          isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
          isLt2M = file.size / 1024 / 1024 < 2
          if (!isJPG) {
            Message.error('上传头像图片只能是 JPG 或 PNG 格式!')
          }
          if (!isLt2M) {
            Message.error('上传头像图片大小不能超过 2MB!')
          }
        }
        if (!isJPG || !isLt2M) {
          this.isUpload = false
          this.fileListData = []
        }
        return isJPG && isLt2M
      },
      handleSuccess(response, file, fileList) {
        console.log('--file-status---', response.attachmentPath, response.attachmentName)
        this.$emit('filePath', response.attachmentPath, response.attachmentName)
      },
      handlePreview(file) {
        console.log(file)
      },
      handleExceed(files, fileList) {
        Message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove(file, fileList) {
        console.log(fileList)
        return this.$confirm(`确定移除 ` + file.name + `？`)
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
