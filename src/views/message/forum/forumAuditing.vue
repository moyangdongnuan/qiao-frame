<template lang="pug">
  kalix-dialog.user-add(title='审核' bizKey="forum" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="审核标识" prop="category" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.category"  readonly)
      el-form-item(label="类型标识" prop="categorytype" v-bind:label-width="labelWidth" v-bind:rules="rules.categorytype")
        el-input(v-model="formModel.categorytype")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoForumURL, QiaoMenuURL} from '../../message/config.toml'
  import KalixSelect from 'kalix-vue-lib/src/components/common/baseSelect'

  export default {
    components: {KalixSelect},
    name: 'QiaoForumAuditing',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '120px',
        rules: {
          category: [{required: true, message: '请输入审核标识', trigger: 'blur'}],
          categorytype: [{message: '请输入类型标识'}]
        },
        targetURL: QiaoForumURL,
        menuURL: QiaoMenuURL,
        menuParam: undefined
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
