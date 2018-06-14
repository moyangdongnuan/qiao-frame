<template lang="pug">
  kalix-dialog.user-add(title='审核' bizKey="forum" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="审核状态" prop="category" v-bind:label-width="labelWidth")
        el-radio(v-model="formModel.category" label="0") 未审核
        el-radio(v-model="formModel.category" label="1") 已审核
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
          category: [{required: true, message: '请输入审核标识', trigger: 'blur'}]
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
