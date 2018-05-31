<!--
描述：办公自动化-应聘人员管理-新增组件
开发人：hqj
开发日期：2017年10月30日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="genealogy" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="所属机构" prop="orgid" label-width="120px" )
        el-input(v-text="orgName")
        input(v-model="formModel.orgid" type="hidden")
      el-form-item(label="职务名称" prop="name" label-width="120px"  v-bind:rules="rules.name")
        el-input(v-model="formModel.name")
      el-form-item(label="家谱名称" prop="genealogyname" label-width="120px" )
        el-input(v-model="formModel.genealogyname")
      el-form-item(label="省" prop="province" label-width="120px")
        el-input(v-model="formModel.province")
      el-form-item(label="市" prop="city" label-width="120px")
        el-input(v-model="formModel.city")
      el-form-item(label="县" prop="county" label-width="120px")
        el-input(v-model="formModel.county")
      el-form-item(label="备注" prop="remarks" label-width="120px")
        el-input(v-model="formModel.remarks")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'

  export default {
    name: 'GenealogyAdd',
    data() {
      return {
        orgName: '',
        formModel: Object.assign({}, FormModel),
        rules: {
          name: [{required: true, message: '请输入职务名称', trigger: 'blur'}]
        },
        targetURL: '',
        labelWidth: '110px'
      }
    },
    created() {
    },
    methods: {
      init(dialogOption) {
        this.orgName = dialogOption.orgName
        this.formModel.orgid = dialogOption.orgId
        this.targetURL = dialogOption.targetURL
      }
    }
  }
</script>
