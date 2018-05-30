<!--
描述：论坛应用-回复管理
开发人：sunli
开发日期：2018年05月30日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="reply" ref="kalixBizDialog" v-bind:submitBefore="submitBefore"
    v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      input(v-model="formModel.parentId" type="hidden")
      input(v-model="formModel.isLeaf" type="hidden")
      input(v-model="formModel.permission" type="hidden")
      input(v-model="formModel.applicationId" type="hidden")
      el-form-item(label="回复名称" prop="username" label-width="120px" v-bind:rules="rules.username")
        el-input(v-model="formModel.username")
      el-form-item(label="回复内容" prop="content" label-width="120px" v-bind:rules="rules.content")
        el-input(v-model="formModel.content")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '../../../components/custom/baseDialog.vue'
  import {QiaoReplyURL} from '../config.toml'
  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          parentName: [{required: true, message: '上级回复名称不能为空', trigger: 'blur'}],
          username: [{required: true, message: '请输入回复名称', trigger: 'blur'}],
          content: [{required: true, message: '请输入回复内容', trigger: 'blur'}]
        },
        targetURL: QiaoReplyURL,
        labelWidth: '110px',
        options: [{
          value: 'true',
          label: '是'
        }, {
          value: 'false',
          label: '否'
        }]
      }
    },
    components: {
      KalixDialog: Dialog
    },
    computed: {
    },
    created() {
    },
    methods: {
      init(dialogOption) {
      },
      submitBefore(baseDialog, callBack) {
        let code = baseDialog.formModel.code
        baseDialog.formModel.permission = baseDialog.formModel.permission + code
        callBack()
      }
    }
  }
</script>

<style scoped>

</style>
