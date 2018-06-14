<!--
描述：留言应用-回复管理-添加
开发人：sunli
开发日期：2018年06月01日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="reply" ref="kalixBizDialog" v-bind:submitBefore="submitBefore"
  v-bind:submitAfter="submitAfter" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      input(v-model="formModel.id" type="hidden")
      input(v-model="formModel.postId" type="hidden")
      el-form-item(label="所属帖子标题" prop="postId" label-width="120px" v-bind:rules="rules.forumTitle")
        el-input(v-text="formModel.forumTitle")
      <!--el-form-item(label="上级回复姓名" prop="parentName" label-width="120px" v-bind:rules="rules.parentName")-->
        <!--el-input(v-text="formModel.parentName")-->
      <!--el-form-item(label="上级回复内容" prop="parentContent" label-width="120px" v-bind:rules="rules.parentContent")-->
        <!--el-input(v-model="formModel.parentContent" readonly)-->
      el-form-item(label="回复内容" prop="content" label-width="120px" v-bind:rules="rules.content")
        el-input(v-model="formModel.content")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoReplyURL} from '../config.toml'

  export default {
    name: 'replyEdit',
    data() {
      return {
        // forumTitle: '',
        formModel: Object.assign({}, FormModel),
        rules: {
          // formModel: [{message: '所属帖子标题不能为空', trigger: 'blur'}],
          // parentName: [{message: '上级回复人姓名不能为空'}],
          // parentContent: [{message: '请输入回复人姓名'}],
          content: [{required: true, message: '请输入回复内容', trigger: 'blur'}]
        },
        targetURL: QiaoReplyURL,
        labelWidth: '110px',
        tempParent: undefined,
        tempChildren: undefined
      }
    },
    components: {
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
