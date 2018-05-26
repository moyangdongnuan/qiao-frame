<template lang="pug">
  kalix-search(:searchFields="searchFields" title="家谱查询" bizKey="genealogy")
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'QiaoGenealogySearch',
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
