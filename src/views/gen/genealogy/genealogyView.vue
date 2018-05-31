<!--
描述：办公自动化-应聘人员管理-查看组件
开发人：hqj
开发日期：2017年10月19日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="candidate" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="所属机构" label-width="120px" )
        el-input(v-text="orgName")
      el-form-item(label="职务名称" prop="name" label-width="120px"  v-bind:rules="rules.name")
        el-input(v-model="formModel.name" readonly)
      el-form-item(label="家谱名称" prop="genealogyname" label-width="120px"  v-bind:rules="rules.name")
        el-input(v-model="formModel.genealogyname" readonly)
      el-form-item(label="省" prop="province" label-width="120px")
        el-input(v-model="formModel.province" readonly)
      el-form-item(label="市" prop="city" label-width="120px")
        el-input(v-model="formModel.city" readonly)
      el-form-item(label="县" prop="county" label-width="120px")
        el-input(v-model="formModel.county" readonly)
      el-form-item(label="备注" prop="remarks" label-width="120px")
        el-input(v-model="formModel.remarks" readonly)
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
        console.info('dialogOption.orgName=========', dialogOption.orgName)
        this.orgName = dialogOption.orgName
      }
    }
  }
</script>
