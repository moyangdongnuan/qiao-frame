<!--
描述：族人修改
开发人：wangpeng
开发日期：2018年6月20日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="clansman" ref="kalixBizDialog" v-bind:formModel.sync="formModel"  v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="家谱名称" prop="name" label-width="120px" )
        el-input(v-model="formModel.name")

</template>

<script type="text/ecmascript-6">
  import FormModel from './clansman_model'
  import {QiaoClansmanURL} from '../config.toml'
  export default {
    name: 'ClansmanEdit',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        targetURL: QiaoClansmanURL,
        labelWidth: '110px'
      }
    },
    methods: {
      init(dialogOption) {
        console.log('---dialogOption----', dialogOption)
        this.formModel = dialogOption
      }
    }
  }
</script>
