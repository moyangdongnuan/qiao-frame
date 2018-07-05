<!--
描述：系统应用-用户管理-查看组件
开发人：hqj
开发日期：2017年12月11日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="user" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      <!--el-form-item(label="用户类型" prop="userType" v-bind:label-width="labelWidth")-->
        <!--kalix-dict-select(v-model="formModel.userType" appName="admin" dictType="用户类型" style="width:100%" disabled)-->
      <!--el-form-item(label="头像" prop="icon" v-bind:label-width="labelWidth")-->
        <!--kalix-upload(v-model="formModel.icon" v-bind:isImage="true" style="width:100%" readonly)-->
      <!--el-form-item(label="登录名" prop="loginName" v-bind:label-width="labelWidth")-->
        <!--el-input(v-model="formModel.loginName" readonly)-->
      <!--el-form-item(label="状态" prop="available" v-bind:label-width="labelWidth")-->
        <!--template(v-if="formModel.available === 1")-->
          <!--| 启用-->
        <!--template(v-else)-->
          <!--| 停用-->
      <!--template(v-if="formModel.userType === 0 || formModel.userType === 2")-->
        <!--el-form-item(label="工号" prop="code" v-bind:label-width="labelWidth")-->
          <!--el-input(v-model="formModel.code" readonly)-->
        <!--el-form-item(label="岗位" prop="position" v-bind:label-width="labelWidth")-->
          <!--el-input(v-bind:value="formModel.position" readonly)-->
        <!--el-form-item(label="姓名" prop="name" v-bind:label-width="labelWidth")-->
          <!--el-input(v-model="formModel.name" readonly)-->
        <!--el-form-item(label="性别" prop="sex" v-bind:label-width="labelWidth")-->
          <!--el-radio-group(v-model="formModel.sex" disabled)-->
            <!--el-radio(label="男")-->
            <!--el-radio(label="女")-->
        <!--el-form-item(label="邮箱" prop="email" v-bind:label-width="labelWidth")-->
          <!--el-input(v-model="formModel.email" readonly)-->
        <!--el-form-item(label="固定电话" prop="phone" v-bind:label-width="labelWidth")-->
          <!--el-input(v-model="formModel.phone" readonly)-->
        <!--el-form-item(label="手机" prop="mobile" v-bind:label-width="labelWidth")-->
          <!--el-input(v-model="formModel.mobile" readonly)-->
      <!--template(v-else-if="formModel.userType === 1")-->
        <!--el-form-item(label="学号" prop="code" v-bind:label-width="labelWidth")-->
          <!--el-input(v-model="formModel.code" readonly)-->
        <!--el-form-item(label="姓名" prop="name" v-bind:label-width="labelWidth")-->
          <!--el-input(v-model="formModel.name" readonly)-->
        <!--el-form-item(label="性别" prop="sex" v-bind:label-width="labelWidth")-->
          <!--el-radio-group(v-model="formModel.sex" disabled)-->
            <!--el-radio(label="男")-->
            <!--el-radio(label="女")-->
        <!--el-form-item(label="邮箱" prop="email" v-bind:label-width="labelWidth")-->
          <!--el-input(v-model="formModel.email" readonly)-->
        <!--el-form-item(label="固定电话" prop="phone" v-bind:label-width="labelWidth")-->
          <!--el-input(v-model="formModel.phone" readonly)-->
        <!--el-form-item(label="手机" prop="mobile" v-bind:label-width="labelWidth")-->
          <!--el-input(v-model="formModel.mobile" readonly)-->
      <!--template(v-else-if="formModel.userType === 3")-->
        <!--el-form-item(label="企业组织机构代码" prop="code" v-bind:label-width="labelWidth")-->
          <!--el-input(v-model="formModel.code" readonly)-->
        <!--el-form-item(label="公司名称" prop="name" v-bind:label-width="labelWidth")-->
          <!--el-input(v-model="formModel.name" readonly)-->
        <!--el-form-item(label="邮箱" prop="email" v-bind:label-width="labelWidth")-->
          <!--el-input(v-model="formModel.email" readonly)-->
        <!--el-form-item(label="固定电话" prop="phone" v-bind:label-width="labelWidth")-->
          <!--el-input(v-model="formModel.phone" readonly)-->
        <!--el-form-item(label="手机" prop="mobile" v-bind:label-width="labelWidth")-->
          <!--el-input(v-model="formModel.mobile" readonly)-->
      <!--template(v-else)-->
        // 暂无
      el-form-item(label="姓名" prop="name"  v-bind:label-width="labelWidth")
        el-input(v-model="formModel.name" readonly)
      el-form-item(label="别名" prop="idCard"  v-bind:label-width="labelWidth")
        el-input(v-model="formModel.idCard" readonly)
      el-form-item(label="性别" prop="sex" v-bind:label-width="labelWidth")
        el-radio-group(v-model="formModel.sex" disabled)
          el-radio(label="男")
          el-radio(label="女")
      el-form-item(label="邮箱" prop="email" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.email" readonly)
      el-form-item(label="固定电话" prop="phone" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.phone" readonly)
      el-form-item(label="手机" prop="mobile" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.mobile" readonly)
      el-form-item(label="登录名" prop="loginName"  v-bind:label-width="labelWidth")
        el-input(v-model="formModel.loginName" readonly)
      el-form-item(label="状态" prop="available" v-bind:label-width="labelWidth")
        template(v-if="formModel.available === 1")
          | 启用
        template(v-else)
          | 停用
      el-form-item(label="出生日期" prop="birthdate" v-bind:label-width="labelWidth")
        kalix-datepicker-simple(v-model="formModel.birthdate" type="datetime" placeholder="选择出生日期" format="yyyy-MM-dd" style="width: 100%;")
      el-form-item(label="身份证号" prop="idNumber"  v-bind:label-width="labelWidth")
        el-input(v-model="formModel.idNumber" readonly)
      el-form-item(label="地址" prop="address"  v-bind:label-width="labelWidth")
        el-input(v-model="formModel.address" readonly)
      el-form-item(label="谱属地" prop="apanage"  v-bind:label-width="labelWidth")
        el-input(v-model="formModel.apanage" readonly)
      el-form-item(label="祖籍" prop="ancestralhome"  v-bind:label-width="labelWidth")
        el-input(v-model="formModel.ancestralhome" readonly)
      el-form-item(label="审核状态" prop="audit"  v-bind:label-width="labelWidth")
        kalix-dict-select(v-model="formModel.audit" appName="admin" dictType="审核标识" style="width:100%" disabled)
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'

  export default {
    name: 'AdminUserView',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '140px'
      }
    },
    methods: {
    }
  }
</script>
