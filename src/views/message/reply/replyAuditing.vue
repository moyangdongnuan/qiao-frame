<!--
描述：留言应用-回复管理-审核
开发人：sunli
开发日期：2018年06月01日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="reply" ref="kalixBizDialog" v-bind:submitBefore="submitBefore"
  v-bind:submitAfter="submitAfter" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      input(v-model="formModel.id" type="hidden")
      input(v-model="formModel.postId" type="hidden")
      el-form-item(label="审核状态" prop="category" label-width="120px" v-bind:rules="rules.category")
        el-input(v-model="formModel.category")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoReplyURL} from '../config.toml'

  export default {
    name: 'replyAuditing',
    data() {
      return {
        // forumTitle: '',
        formModel: Object.assign({}, FormModel),
        rules: {
          category: [{required: true, message: '请输入审核状态', trigger: 'blur'}]
        },
        targetURL: QiaoReplyURL,
        labelWidth: '110px'
      }
    },
    components: {
    },
    methods: {
      // submitBefore(baseDialog, callBack) {
      //   if (baseDialog.formModel.parent) {
      //     this.tempParent = baseDialog.formModel.parent
      //     baseDialog.formModel.parent = undefined
      //   }
      //   if (baseDialog.formModel.children) {
      //     this.tempChildren = baseDialog.formModel.children
      //     baseDialog.formModel.children = undefined
      //   }
      //   // console.log('baseDialog==============', baseDialog)
      //   callBack()
      // },
      // submitAfter(baseDialog, callBack) {
      //   if (this.tempParent) {
      //     baseDialog.formModel.parent = this.tempParent
      //   }
      //   if (this.tempChildren) {
      //     baseDialog.formModel.children = this.tempChildren
      //   }
      //   // callBack()
      // }
    }
  }
</script>

<style scoped>

</style>
