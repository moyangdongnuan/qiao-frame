<template lang="pug">
  kalix-dialog.user-add(title='查看' bizKey="genealogy" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="家谱名称" prop="genealogyname" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.genealogyname" readonly)
      el-form-item(label="区" prop="area" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.area" readonly)
      el-form-item(label="审核标识" prop="category" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.category" readonly)
      el-form-item(label="市" prop="city" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.city" readonly)
      el-form-item(label="国家" prop="country" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.country" readonly)
      el-form-item(label="县" prop="county" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.county" readonly)
      el-form-item(label="地区编码" prop="encoding" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.encoding" readonly)
      el-form-item(label="谱属地" prop="genealogysite" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.genealogysite" readonly)
      el-form-item(label="村" prop="hamlet" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.hamletv" readonly)
      el-form-item(label="栏目id（打印菜单）" prop="listid" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.listid" readonly)
      el-form-item(label="父id" prop="parentid" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.parentid" readonly)
      el-form-item(label="部id（字典表）" prop="part" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.part" readonly)
      el-form-item(label="省" prop="province" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.province" readonly)
      el-form-item(label="备注" prop="remarks" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.remarks" readonly)
      el-form-item(label="街道" prop="streets" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.streets" readonly)
      el-form-item(label="概况" prop="summarize" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.summarize" readonly)
      el-form-item(label="卷id（字典表）" prop="unit" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.unit" readonly)
      el-form-item(label="册id（字典表）" prop="volume" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.volume" readonly)
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'

  export default {
    name: 'QiaoGenealogyView',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '120px'
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
