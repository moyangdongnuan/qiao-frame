<template lang="pug">
  el-upload(
    :action="requestUrl"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :limit="1"
    :on-exceed="handleExceed"
    :file-list="fileList"
    list-type="picture")
    el-button(size="small" type="primary") 点击上传
    div(slot="tip" class="el-upload__tip") 只能上传jpg/png文件,且不超过500kb
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'kalix-clansman-upload',
    props: {
      requestUrl: { // 文件上传路径
        type: String, default: 'https://jsonplaceholder.typicode.com/posts/'
      },
      fileList: {
        type: Array, default: []
      }
    },
    data() {
      return {
        // https://jsonplaceholder.typicode.com/posts/
        file: null
      }
    },
    methods: {
      beforeAvatarUpload (file) {
        console.log('----file-----', file)
        this.$http.post('/camel/rest/clansmans/clansmanFileUpload', {file: file}).then(function (res) { // 成功后回调
          console.log('success')
        }, function () {
          console.log('failed')
        })
        return true
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
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
