<!--
描述：系统应用-功能管理-添加
开发人：sunli
开发日期：2018年06月01日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="reply" ref="kalixBizDialog" v-bind:submitBefore="submitBefore"
  v-bind:submitAfter="submitAfter" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      input(v-model="formModel.id" type="hidden")
      input(v-model="formModel.postId" type="hidden")
      el-form-item(label="所属帖子标题" prop="forumtitle" label-width="120px" v-bind:rules="rules.forumtitle")
        el-input(v-model="formModel.forumtitle" readonly)
      el-form-item(label="上级回复姓名" prop="parentName" label-width="120px" v-bind:rules="rules.parentName")
        el-input(v-model="formModel.parentName" readonly)
      el-form-item(label="回复人姓名" prop="username" label-width="120px" v-bind:rules="rules.username")
        el-input(v-model="formModel.username")
      el-form-item(label="回复内容" prop="content" label-width="120px" v-bind:rules="rules.content")
        el-input(v-model="formModel.content")
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
          formModel: [{message: '所属帖子标题不能为空', trigger: 'blur'}],
          parentName: [{message: '上级回复人姓名不能为空', trigger: 'blur'}],
          username: [{required: true, message: '请输入回复人姓名', trigger: 'blur'}],
          content: [{required: true, message: '请输入回复内容', trigger: 'blur'}]
        },
        targetURL: QiaoReplyURL,
        labelWidth: '110px',
        tempParent: undefined,
        tempChildren: undefined
      }
    },
    components: {
      // KalixDialog: Dialog
    },
    methods: {
      submitBefore(baseDialog, callBack) {
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
