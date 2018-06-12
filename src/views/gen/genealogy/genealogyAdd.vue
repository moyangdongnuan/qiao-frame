<!--
描述：办公自动化-应聘人员管理-新增组件
开发人：hqj
开发日期：2017年10月30日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="genealogy" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="姓名" prop="name" label-width="120px" )
        el-input(v-model="formModel.name")
      el-form-item(label="性别" prop="sex" label-width="120px" )
        el-input(v-model="formModel.sex")
      el-form-item(label="婚姻" prop="matrimony" label-width="120px" )
        el-input(v-model="formModel.matrimony")
      el-form-item(label="配偶" prop="spouseid" label-width="120px")
        el-input(v-model="formModel.spouseid")
      el-form-item(label="父亲" prop="fatherid" label-width="120px")
        el-input(v-model="formModel.fatherid")
      el-form-item(label="母亲" prop="motherid" label-width="120px")
        el-input(v-model="formModel.motherid")
      el-form-item(label="排行" prop="sequence" label-width="120px")
        el-input(v-model="formModel.sequence")
      el-form-item(label="世代" prop="generations" label-width="120px")
        el-input(v-model="formModel.generations")
      el-form-item(label="字辈" prop="gradeid" label-width="120px")
        el-input(v-model="formModel.gradeid")
      el-form-item(label="字号" prop="monicker" label-width="120px")
        el-input(v-model="formModel.monicker")
      el-form-item(label="出生日期" prop="birth" label-width="120px")
        el-input(v-model="formModel.birth")
      el-form-item(label="纪念日期" prop="time" label-width="120px")
        el-input(v-model="formModel.time")
      el-form-item(label="体重" prop="weight" label-width="120px")
        el-input(v-model="formModel.weight")
      el-form-item(label="身高" prop="stature" label-width="120px")
        el-input(v-model="formModel.stature")
      el-form-item(label="官爵" prop="duty" label-width="120px")
        el-input(v-model="formModel.duty")
      el-form-item(label="教育" prop="education" label-width="120px")
        el-input(v-model="formModel.education")
      el-form-item(label="家庭住址" prop="homeaddress" label-width="120px")
        el-input(v-model="formModel.homeaddress")
      el-form-item(label="儿女" prop="childrenid" label-width="120px")
        el-input(v-model="formModel.childrenid")
      el-form-item(label="外貌" prop="appearance" label-width="120px")
        el-input(v-model="formModel.appearance")
      el-form-item(label="荣誉" prop="honor" label-width="120px")
        el-input(v-model="formModel.honor")
      el-form-item(label="姐妹" prop="sistersid" label-width="120px")
        el-input(v-model="formModel.sistersid")
      el-form-item(label="兄弟" prop="brothersid" label-width="120px")
        el-input(v-model="formModel.brothersid")
      el-form-item(label="爱好" prop="hobby" label-width="120px")
        el-input(v-model="formModel.hobby")
      el-form-item(label="健康情况" prop="health" label-width="120px")
        el-input(v-model="formModel.health")


</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoGenealogyURL} from '../config.toml'

  export default {
    name: 'GenealogyAdd',
    data() {
      return {
        targetURL: QiaoGenealogyURL,
        formModel: Object.assign({}, FormModel),
        rules: {
          name: [{required: true, message: '请输入名称', trigger: 'blur'}]
        },
        labelWidth: '110px'
      }
    },
    created() {
    },
    methods: {
      init(dialogOption) {
      }
    }
  }
</script>
