<template lang="pug">
  kalix-dialog.user-add(title='修改' bizKey="content" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="所属菜单" v-bind:label-width="labelWidth")
        kalix-cascader(v-on:getMenuId="setMenuId" v-bind:queryOneUrl="getMenuByIdURL" v-bind:value="formModel.menuId" v-bind:defaultSelect="true" v-bind:requestUrl="cmURL" v-bind:appName="allMenu")
      el-form-item(label="标题" prop="title" v-bind:label-width="labelWidth" v-bind:rules="rules.title")
        el-input(v-model="formModel.title")
      el-form-item(label="次标题" prop="subtitle" v-bind:label-width="labelWidth" v-bind:rules="rules.subtitle")
        el-input(v-model="formModel.subtitle")
      el-form-item(label="排序" prop="sequence" v-bind:label-width="labelWidth" v-bind:rules="rules.sequence")
        el-input(v-model="formModel.sequence" type="number" min="1")
      el-form-item(label="内容" prop="content" v-bind:label-width="labelWidth" v-bind:rules="rules.content")
        div.content
          mavon-editor(v-model="formModel.content")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoContentURL, QiaoCMURL, queryMenuById} from '../config.toml'
  import kalixCascader from '../../../components/cascader/cascader'

  export default {
    components: {
      kalixCascader
    },
    name: 'QiaoContentEdit',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '120px',
        rules: {
          title: [{required: true, message: '请输标题', trigger: 'blur'}],
          subtitle: [{required: true, message: '请输次标题', trigger: 'blur'}],
          content: [{required: true, message: '请输内容', trigger: 'blur'}],
          sequence: [{required: true, message: '请输入排序号', trigger: 'blur'}]
        },
        targetURL: QiaoContentURL,
        getMenuByIdURL: queryMenuById,
        cmURL: QiaoCMURL,
        allMenu: 'allMenu'
      }
    },
    methods: {
      init(dialogOption) {
      },
      setMenuId(val) {
        this.formModel.menuId = val
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
