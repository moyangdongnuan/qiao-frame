<template lang="pug">
  kalix-dialog.user-add(title='添加' bizKey="forum" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      // el-form-item(label="发帖人别名" prop="idcard" v-bind:label-width="labelWidth" v-bind:rules="rules.idcard")
      el-input(v-model="formModel.idcard=idcard" type="hidden")
      el-form-item(label="帖子标题" prop="title" v-bind:label-width="labelWidth" v-bind:rules="rules.title")
        el-input(v-model="formModel.title")
      el-form-item(label="帖子内容" prop="content" v-bind:label-width="labelWidth" v-bind:rules="rules.content")
        el-input(v-model="formModel.content")
      el-form-item(label="留言分类" prop="menuName" v-bind:label-width="labelWidth" v-bind:rules="rules.menuName")
        kalix-select(v-model="formModel.menuName" v-bind:requestUrl="menuURL" appName="forumMenu"  placeholder="请选择菜单分类"
        v-bind:paramObj="menuParam" v-bind:defaultSelect="true" v-on:selectChange="selectChange")
      el-form-item(label="类型标识" prop="categorytype" v-bind:label-width="labelWidth" v-bind:rules="rules.categorytype")
        kalix-select(v-model="formModel.categorytype" v-bind:requestUrl="dictURL" appName="dictMenu"  placeholder="请选择类型标识"
        v-bind:paramObj="dictParam" v-bind:defaultSelect="false" id="label")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoForumURL, QiaoMenuURL, DictURL} from '../../message/config.toml'
  import KalixSelect from 'kalix-vue-lib-qiao/src/components/common/baseSelect'

  export default {
    name: 'QiaoForumAdd',
    components: {KalixSelect},
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
        dictURL: DictURL,
        targetURL: QiaoForumURL,
        menuParam: undefined,
        dictParam: {type: '类型标识'},
        options: [],
        name: '',
        label: '',
        idcard: this.$KalixCatch.get('user_name')
      }
    },
    methods: {
      init(dialogOption) {
      },
      selectChange(item) {
        this.formModel.menuName = item.name
        // this.formModel.categorytype = item.label
        console.log('--------------item.name------------', item.name)
        // console.log('--------------item.label------------', item.label)
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
