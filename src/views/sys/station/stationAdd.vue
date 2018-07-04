<template lang="pug">
  kalix-dialog.user-add(title='编辑' bizKey="station" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="站长图片" prop="imgurl" v-bind:label-width="labelWidth" v-bind:rules="rules.imgurl")
        el-input(v-model="formModel.imgurl")
      el-form-item(label="站长信息" prop="introduce" v-bind:label-width="labelWidth" v-bind:rules="rules.introduce")
        el-input(v-model="formModel.introduce")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoStationURL} from '../config.toml'

  export default {
    name: 'QiaoStationAdd',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '120px',
        rules: {
          imgurl: [{required: true, message: '请输入广告图片', trigger: 'blur'}],
          introduce: [{required: true, message: '请输入广告名称', trigger: 'blur'}]
        },
        targetURL: QiaoStationURL
      }
    },
    methods: {
      init(dialogOption) {
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
