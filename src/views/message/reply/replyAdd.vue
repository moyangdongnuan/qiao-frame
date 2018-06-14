<!--
描述：留言应用-回复管理-添加
开发人：sunli
开发日期：2018年06月01日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="reply" ref="kalixBizDialog"
    v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      input(v-model="formModel.parentId" type="hidden")
      input(v-model="formModel.postId" type="hidden")
      input(v-model="formModel.isLeaf" type="hidden")
      el-form-item(label="所属帖子标题" prop="postId" label-width="120px" v-bind:rules="rules.forumTitle")
        el-input(v-text="formModel.forumTitle")
      el-form-item(label="上级回复人姓名" prop="parentName" label-width="120px" v-bind:rules="rules.parentName")
        el-input(v-text="formModel.parentName")
      el-form-item(label="上级回复内容" prop="parentContent" label-width="120px" v-bind:rules="rules.parentContent")
        el-input(v-text="formModel.parentContent")
      el-form-item(label="回复内容" prop="content" label-width="120px" v-bind:rules="rules.content")
        el-input(v-model="formModel.content")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  // import Dialog from '../../../components/custom/baseDialog.vue'
  import {QiaoReplyURL} from '../config.toml'
  export default {
    name: 'replyAdd',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          // forumTitle: [{message: '所属帖子标题不能为空', trigger: 'blur'}],
          parentName: [{required: true, message: '上级功能不能为空', trigger: 'blur'}],
          username: [{required: true, message: '请输入回复人姓名', trigger: 'blur'}],
          content: [{required: true, message: '请输入回复内容', trigger: 'blur'}]
        },
        targetURL: QiaoReplyURL,
        labelWidth: '110px'
      }
    },
    components: {
      // KalixDialog: Dialog
    },
    computed: {
    },
    created() {
    },
    methods: {
      init(dialogOption) {
        // this.forumTitle = dialogOption.forumTitle
        // this.formModel.postId = dialogOption.postId
      }
      // submitBefore(baseDialog, callBack) {
      //   let code = baseDialog.formModel.code
      //   baseDialog.formModel.permission = baseDialog.formModel.permission + code
      //   callBack()
      // }
    }
  }
</script>

<style scoped>

</style>
