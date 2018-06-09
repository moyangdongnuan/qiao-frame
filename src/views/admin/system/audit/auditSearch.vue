<!--
描述：系统应用-系统管理-审计管理
开发人：杨泽
开发日期：2018年1月31日
-->
<template lang="pug">
  kalix-search(:searchFields="searchFields" title="审计查询" bizKey="audit")
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'AdminAuditSearch',
    created() {
    },
    data() {
      return {
        searchFields: [
          {label: '应用名称', prop: 'appName', placeholder: '请输入应用名称'},
          {label: '功能名称', prop: 'funName', placeholder: '请输入功能名称'},
          {label: '操作人', prop: 'actor', placeholder: '请输入操作人'},
          {label: '操作时间', prop: 'beginDate_begin', type: 'date', field: 'creationDate:begin:gt', placeholder: '选择日期'},
          {label: '-', prop: 'beginDate_end', type: 'date', field: 'creationDate:end:lt', placeholder: '选择日期'}
        ]
        // formModel: {
        //   appName: '',
        //   funName: '',
        //   actor: '',
        //   beginDate_begin: '',
        //   beginDate_end: ''
        // },
        // rules: {
        //   appName: [],
        //   funName: [],
        //   actor: [],
        //   beginDate_begin: [],
        //   beginDate_end: []
        // }
      }
    },
    methods: {}
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
