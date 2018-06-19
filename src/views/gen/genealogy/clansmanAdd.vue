<!--
描述：族人-新增
开发人：wangpeng
开发日期：2018年6月19日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="clansman" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="族人姓名" prop="name" label-width="120px" )
        el-input(v-model="formModel.name")
      el-form-item(label="字号" prop="monicker" label-width="120px" )
        el-input(v-model="formModel.monicker")
      el-form-item(label="性别" prop="sex" label-width="120px" )
        el-input(v-model="formModel.sex")
      el-form-item(label="婚姻状况" prop="matrimony" label-width="120px" )
        el-input(v-model="formModel.matrimony")
      el-form-item(label="排行" prop="sequence" label-width="120px" )
        el-input(v-model="formModel.sequence")
      el-form-item(label="世代" prop="generations" label-width="120px")
        el-input(v-model="formModel.generations")

</template>

<script type="text/ecmascript-6">
  import FormModel from './clansman_model'
  import {QiaoClansmanURL} from '../config.toml'
  import KalixFontCascader from '../../../components/cascader/ThreeCascader'

  export default {
    name: 'clansmanAdd',
    components: {KalixFontCascader},
    data() {
      return {
        targetURL: QiaoClansmanURL,
        formModel: Object.assign({}, FormModel),
        rules: {
          name: [{required: true, message: '请输入名称', trigger: 'blur'}]
        },
        labelWidth: '110px'
      }
    },
    created() {
    },
    methods: {
      init(dialogOption) {
      }
    }
  }
</script>
