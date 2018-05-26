<template lang="pug">
  kalix-dialog.user-add(title='添加' bizKey="genealogy" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="家谱名称" prop="genealogyname" v-bind:label-width="labelWidth" v-bind:rules="rules.genealogyname")
        el-input(v-model="formModel.genealogyname")
      el-form-item(label="区" prop="area" v-bind:label-width="labelWidth" v-bind:rules="rules.area")
        el-input(v-model="formModel.area")
      el-form-item(label="审核标识" prop="category" v-bind:label-width="labelWidth" v-bind:rules="rules.category")
        el-input(v-model="formModel.category")
      el-form-item(label="市" prop="city" v-bind:label-width="labelWidth" v-bind:rules="rules.city")
        el-input(v-model="formModel.city")
      el-form-item(label="国家" prop="country" v-bind:label-width="labelWidth" v-bind:rules="rules.country")
        el-input(v-model="formModel.country")
      el-form-item(label="县" prop="county" v-bind:label-width="labelWidth" v-bind:rules="rules.county")
        el-input(v-model="formModel.county")
      el-form-item(label="地区编码" prop="encoding" v-bind:label-width="labelWidth" v-bind:rules="rules.encoding")
        el-input(v-model="formModel.encoding")
      el-form-item(label="谱属地" prop="genealogysite" v-bind:label-width="labelWidth" v-bind:rules="rules.genealogysite")
        el-input(v-model="formModel.genealogysite")
      el-form-item(label="村" prop="hamlet" v-bind:label-width="labelWidth" v-bind:rules="rules.hamlet")
        el-input(v-model="formModel.hamletv")
      el-form-item(label="栏目id（打印菜单）" prop="listid" v-bind:label-width="labelWidth" v-bind:rules="rules.listid")
        el-input(v-model="formModel.listid")
      el-form-item(label="父id" prop="parentid" v-bind:label-width="labelWidth" v-bind:rules="rules.parentid")
        el-input(v-model="formModel.parentid")
      el-form-item(label="部id（字典表）" prop="part" v-bind:label-width="labelWidth" v-bind:rules="rules.part")
        el-input(v-model="formModel.part")
      el-form-item(label="省" prop="province" v-bind:label-width="labelWidth" v-bind:rules="rules.province")
        el-input(v-model="formModel.province")
      el-form-item(label="备注" prop="remarks" v-bind:label-width="labelWidth" v-bind:rules="rules.remarks")
        el-input(v-model="formModel.remarks")
      el-form-item(label="街道" prop="streets" v-bind:label-width="labelWidth" v-bind:rules="rules.streets")
        el-input(v-model="formModel.streets")
      el-form-item(label="概况" prop="summarize" v-bind:label-width="labelWidth" v-bind:rules="rules.summarize")
        el-input(v-model="formModel.summarize")
      el-form-item(label="卷id（字典表）" prop="unit" v-bind:label-width="labelWidth" v-bind:rules="rules.unit")
        el-input(v-model="formModel.unit")
      el-form-item(label="册id（字典表）" prop="volume" v-bind:label-width="labelWidth" v-bind:rules="rules.volume")
        el-input(v-model="formModel.volume")

</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoGenealogyURL} from '../config.toml'

  export default {
    name: 'QiaoGenealogyAdd',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '120px',

        rules: {
          genealogyname: [{required: true, message: '请输入家谱名称', trigger: 'blur'}]
        },
        targetURL: QiaoGenealogyURL
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
