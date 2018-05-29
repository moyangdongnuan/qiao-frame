<!--
描述：办公自动化-应聘人员管理-新增组件
开发人：hqj
开发日期：2017年10月30日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="reply" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="回复名称" prop="username" label-width="120px"  v-bind:rules="rules.username")
        el-input(v-model="formModel.username")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoReplyURL} from '../config.toml'

  export default {
    name: 'replyEdit',
    data() {
      return {
        replyName: '',
        formModel: Object.assign({}, FormModel),
        rules: {
          name: [{required: true, message: '请输入组织机构名称', trigger: 'blur'}]
        },
        targetURL: QiaoReplyURL,
        labelWidth: '110px'
      }
    },
    methods: {
      init(dialogOption, row) {
      }
    }
  }
</script>
