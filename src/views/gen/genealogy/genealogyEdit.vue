<!--
描述：家谱修改
开发人：wangpeng
开发日期：2018年6月14日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="genealogy" ref="kalixBizDialog" v-bind:formModel.sync="formModel"  v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="家谱名称" prop="genealogyname" label-width="120px" )
        el-input(v-model="formModel.genealogyname")
      el-form-item(label="谱属地" prop="genealogysite" label-width="120px" )
        kalix-font-cascader(v-on:change="getValue" v-bind:defaultOptions="defaultOptions")
      el-form-item(label="详细地址" prop="address" label-width="120px" )
        el-input(v-model="formModel.address" v-on:change="getValue")
      el-form-item(label="概况" prop="summarize" label-width="120px" )
        el-input(v-model="formModel.summarize")
      el-form-item(label="备注" prop="remarks" label-width="120px")
        el-input(v-model="formModel.remarks")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import KalixFontCascader from '../../../components/cascader/ThreeCascader'
  import {QiaoGenealogyURL} from '../config.toml'

  export default {
    name: 'GenealogyEdit',
    components: {KalixFontCascader},
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        targetURL: QiaoGenealogyURL,
        defaultOptions: [],
        labelWidth: '110px'
      }
    },
    methods: {
      init(dialogOption) {
        console.info('dialogOption.orgName=========', dialogOption)
        this.$http
          .get('/camel/rest/genealogys/findById?id=' + dialogOption.modelId, {})
          .then(res => {
            this.formModel = res.data.data[0]
          })
      },
      getValue(data) {
        this.formModel.genealogysite = data.toString()
        console.log('---this.data---', data)
      }
    }
  }
</script>
