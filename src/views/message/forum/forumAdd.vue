<template lang="pug">
  kalix-dialog.user-add(title='添加' bizKey="forum" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      <!--el-form-item(label="发帖人别名" prop="idcard" v-bind:label-width="labelWidth" v-bind:rules="rules.idcard")-->
        <!--el-input(v-model="formModel.idcard")-->
      el-form-item(label="帖子标题" prop="title" v-bind:label-width="labelWidth" v-bind:rules="rules.title")
        el-input(v-model="formModel.title")
      el-form-item(label="帖子内容" prop="content" v-bind:label-width="labelWidth" v-bind:rules="rules.content")
        el-input(v-model="formModel.content")
      el-form-item(label="留言分类" prop="menuName" v-bind:label-width="labelWidth" v-bind:rules="rules.menuName")
        kalix-select(v-model="formModel.menuName" v-bind:requestUrl="menuURL"
        appName="forumMenu"  placeholder="请选择菜单分类" v-bind:paramObj="menuParam"
        v-bind:defaultSelect="true" v-on:selectChange="setGroup")
      <!--el-form-item(label="审核标识" prop="category" v-bind:label-width="labelWidth" v-bind:rules="rules.category")-->
        <!--el-input(v-model="formModel.category")-->
      el-form-item(label="类型标识" prop="categorytype" v-bind:label-width="labelWidth" v-bind:rules="rules.categorytype")
        el-select(v-model="formModel.categorytype" placeholder="请选择")
          el-option(label="" value="")
          el-option(label="推荐" value="推荐")
          el-option(label="精华" value="精华")
          el-option(label="置顶" value="置顶")
    </template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoForumURL, QiaoMenuURL} from '../../message/config.toml'
  import KalixSelect from 'kalix-vue-lib/src/components/common/baseSelect'

  export default {
    components: {KalixSelect},
    name: 'QiaoForumAdd',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '120px',
        rules: {
          // idcard: [{required: true, message: '请输入发帖人别名', trigger: 'blur'}],
          title: [{required: true, message: '请输入帖子标题', trigger: 'blur'}],
          content: [{required: true, message: '请输入帖子内容', trigger: 'blur'}],
          menuName: [{required: true, message: '请输入留言分类', trigger: 'blur'}],
          category: [{required: true, message: '请输入审核标识', trigger: 'blur'}],
          categorytype: [{message: '请输入类型标识'}]
        },
        menuURL: QiaoMenuURL,
        targetURL: QiaoForumURL,
        menuParam: undefined,
        options: [],
        name: ''
      }
    },
    methods: {
      init(dialogOption) {
      },
      setGroup(item) {
        this.formModel.menuName = item.name
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
