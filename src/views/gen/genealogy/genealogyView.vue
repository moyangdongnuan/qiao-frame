<!--
描述：家谱查看
开发人：wangpeng
开发日期：2018年6月14日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="genealogy" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="家谱名称" prop="genealogyname" label-width="120px" )
        el-input(v-model="formModel.genealogyname" readOnly)
      el-form-item(label="谱属地" prop="genealogysite" label-width="120px" )
        el-input(v-model="formModel.genealogysite" readOnly)
      el-form-item(label="详细地址" prop="address" label-width="120px" )
        el-input(v-model="formModel.address" readOnly)
      el-form-item(label="概况" prop="summarize" label-width="120px" )
        el-input(v-model="formModel.summarize" readOnly)
      el-form-item(label="备注" prop="remarks" label-width="120px")
        el-input(v-model="formModel.remarks" readOnly)
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'

  export default {
    name: 'GenealogyView',
    data() {
      return {
        orgName: '',
        formModel: Object.assign({}, FormModel),
        labelWidth: '110px'
      }
    },
    methods: {
      init(dialogOption) {
        console.info('dialogOption.orgName=========', dialogOption)
        this.$http
          .get('/camel/rest/genealogys/findById?id=' + dialogOption.modelId, {
          })
          .then(res => {
            console.info('----treeData------', res.data.data[0])
            this.formModel = res.data.data[0]
          })
      }
    }
  }
</script>
