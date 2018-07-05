<template lang="pug">
  table-station(title="站长信息管理组件" bizkey="station" ref="tableStation"  v-bind:formModel.sync="formModel")
    div.el-form(slot="dialogFormSlot")
      <!--el-form-item(label="站长图片")-->
        <!--el-input(v-model="formModel.imgurl")-->
      el-form-item(label="站长图片" prop="imgurl")
        kalix-clansman-upload(:action="action" v-on:filePath="getVoiceFilePath" fileType="img" tipText="只能上传jpg/png文件，且不超过2MB")
      el-form-item(label="站长信息" prop="introduce")
        mavon-editor(v-model="formModel.introduce")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {baseURL} from '../config.toml'
  import TableStation from '../../../components/cascader/tableStation'
  import KalixClansmanUpload from '../../../components/fileUpload/upload'
  export default {
    name: 'kalix-qiao-station',
    components: {KalixClansmanUpload, TableStation},
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        item: [],
        action: baseURL + '/camel/rest/upload' // http://localhost:8181/camel/rest/upload
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.axios.request({
          method: 'GET',
          url: `/camel/rest/stations`,
          params: {}
        }).then(res => {
          this.formModel = res.data.data[0]
          console.log('this.formModel.introduce:---', this.formModel.introduce)
        })
      },
      getVoiceFilePath(filePath, fileName) {
        console.log('--getFilePath---', fileName)
        this.formModel.voiceurl = filePath
        this.formModel.voiceName = fileName
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
