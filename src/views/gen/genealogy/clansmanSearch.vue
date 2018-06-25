<!--
描述：办公自动化-应聘人员管理-查询组件
开发人：hqj
开发日期：2017年10月30日
-->

<template lang="pug">
  kalix-search(title="家谱查询" v-bind:searchFields="searchFields")
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'GenealogySearch',
    data() {
      return {
        searchFields: [
          {label: '家谱名称', prop: 'genealogyname'}
        ]
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
</style>
