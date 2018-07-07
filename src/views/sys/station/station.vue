<template lang="pug">
  table-station(title="站长信息管理" bizkey="station" ref="tableStation"  v-bind:targetURL="targetURL"  v-bind:formModel.sync="formModel")
    div.el-form(slot="dialogFormSlot")
      <!--el-form-item(label="站长图片")-->
        <!--el-input(v-model="formModel.imgurl")-->
      input(v-model="formModel.id" type="hidden")
      el-form-item(label="站长图片" prop="imgurl")
        kalix-clansman-upload(:action="action" v-on:filePath="getFilePath" fileType="img" tipText="只能上传jpg/png文件，且不超过2MB")
      el-form-item(label="站长信息" prop="introduce")
        el-input(type="textarea" v-model="formModel.introduce" v-bind:autosize="{ minRows: 2, maxRows: 5}")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {baseURL, QiaoStationURL} from '../config.toml'
  import TableStation from '../../../components/cascader/tableStation'
  import KalixClansmanUpload from '../../../components/fileUpload/upload'
  export default {
    name: 'kalix-qiao-station',
    components: {KalixClansmanUpload, TableStation},
    data() {
      return {
        targetURL: QiaoStationURL,
        formModel: Object.assign({}, FormModel),
        item: [],
        rules: {
          imgurl: [{required: true, message: '请输入广告图片', trigger: 'blur'}],
          introduce: [{required: true, message: '请输入广告名称', trigger: 'blur'}]
        },
        action: baseURL + '/camel/rest/upload' // http://localhost:8181/camel/rest/upload
      }
    },
    mounted() {
      this.getData()
    },
    watch: {
      // targetURL(oldVal, newVal) {
      //   console.log('oldVal----------------', oldVal)
      //   console.log('newVal----------------', newVal)
      //   this.$confirm('确定要离开吗? 系统可能不会保存您所做的更改！', '提示', {
      //     confirmButtonText: '离开',
      //     cancelButtonText: '留下',
      //     type: 'warning'
      //   }).then(() => {
      //     return this.axios.request({
      //       url: newVal
      //     })
      //   }).catch(() => {
      //   })
      // }
    },
    methods: {
      getData() {
        this.axios.request({
          method: 'GET',
          url: `/camel/rest/stations`,
          params: {}
        }).then(res => {
          this.formModel = res.data.data[0]
        })
      },
      init(dialogOption) {
      },
      getFilePath(filePath, fileName) {
        console.log('--getFilePath---', fileName)
        this.formModel.imgurl = filePath
        this.formModel.imgName = fileName
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
