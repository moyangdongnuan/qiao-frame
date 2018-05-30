<!--
描述：论坛应用-回复管理
开发人：sunli
开发日期：2018年05月30日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="reply" ref="kalixBizDialog" v-bind:submitBefore="submitBefore"
  v-bind:submitAfter="submitAfter" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      input(v-model="formModel.id" type="hidden")
      input(v-model="formModel.isLeaf" type="hidden")
      input(v-model="formModel.applicationId" type="hidden")
      el-form-item(label="上级回复姓名" prop="parentName" label-width="120px" v-bind:rules="rules.parentName")
        el-input(v-model="formModel.parentName" readonly)
      el-form-item(label="回复姓名" prop="username" label-width="120px" v-bind:rules="rules.username")
        el-input(v-model="formModel.username")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  // import Dialog from '../../../components/custom/baseDialog.vue'
  import {QiaoReplyURL} from '../config.toml'

  export default {
    name: 'replyEdit',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          parentName: [{required: true, message: '上级回复名称', trigger: 'blur'}],
          username: [{required: true, message: '请输入回复名称', trigger: 'blur'}]
        },
        targetURL: QiaoReplyURL,
        labelWidth: '110px',
        options: [{
          value: 'true',
          label: '是'
        }, {
          value: 'false',
          label: '否'
        }],
        // dataPermission: ''
        tempParent: undefined,
        tempChildren: undefined
      }
    },
    components: {
    },
    methods: {
      submitBefore(baseDialog, callBack) {
        let code = baseDialog.formModel.code
        baseDialog.formModel.permission = baseDialog.formModel.permission + ':' + code
        if (baseDialog.formModel.parent) {
          this.tempParent = baseDialog.formModel.parent
          baseDialog.formModel.parent = undefined
        }
        if (baseDialog.formModel.children) {
          this.tempChildren = baseDialog.formModel.children
          baseDialog.formModel.children = undefined
        }
        // console.log('baseDialog==============', baseDialog)
        callBack()
      },
      submitAfter(baseDialog, callBack) {
        if (this.tempParent) {
          baseDialog.formModel.parent = this.tempParent
        }
        if (this.tempChildren) {
          baseDialog.formModel.children = this.tempChildren
        }
        // callBack()
      }
    }
  }
</script>

<style scoped>

</style>
