<!--
描述：办公自动化-应聘人员管理-新增组件
开发人：hqj
开发日期：2017年10月30日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="genealogy" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="家谱名称" prop="genealogyname" label-width="120px" )
        el-input(v-model="formModel.genealogyname")
      el-form-item(label="谱属地" prop="genealogysite" label-width="120px" )
        kalix-font-cascader(v-on:change="getValue")
      el-form-item(label="详细地址" prop="streets" label-width="120px" )
        el-input(v-model="formModel.streets")
      el-form-item(label="概况" prop="summarize" label-width="120px" )
        el-input(v-model="formModel.summarize")
      el-form-item(label="备注" prop="remarks" label-width="120px")
        el-input(v-model="formModel.remarks")

</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoGenealogyURL} from '../config.toml'
  import KalixFontCascader from '../../../components/cascader/ThreeCascader'

  export default {
    name: 'GenealogyAdd',
    components: {KalixFontCascader},
    data() {
      return {
        targetURL: QiaoGenealogyURL,
        formModel: Object.assign({}, FormModel),
        rules: {
          genealogyname: [{required: true, message: '请输入名称', trigger: 'blur'}]
        },
        labelWidth: '110px'
      }
    },
    created() {
    },
    methods: {
      init(dialogOption) {
      },
      getValue(data) {
        console.log('---getValue----', data.toString())
        this.formModel.genealogysite = data.toString()
      }
    }
  }
</script>
