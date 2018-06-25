<!--
描述：族人-新增
开发人：wangpeng
开发日期：2018年6月19日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="generation" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="字辈" prop="grade" label-width="120px" )
        el-input(v-model="formModel.grade"  placeholder="例：赵钱孙李")


</template>

<script type="text/ecmascript-6">
  import FormModel from './generation_model'
  import {QiaoGenerationURL} from '../config.toml'

  export default {
    name: 'generation',
    data() {
      return {
        targetURL: QiaoGenerationURL,
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
      init(genealogyId) {
        console.log('====genealogyId====', genealogyId.modelId)
        this.formModel.genealogyId = genealogyId.modelId
        this.$http
          .get('/camel/rest/generations/getGenerationByGenealogyId?genealogyId=' + genealogyId.modelId, {})
          .then(res => {
            console.log('----getGenerationByGenealogyId------', res.data.data.length)
            if (res.data.data.length > 0) {
              this.formModel = res.data.data[0]
            }
          })
      }
    }
  }
</script>
