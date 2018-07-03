<template lang="pug">
  kalix-search(:searchFields="searchFields" title="站长查询" bizKey="station")
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'QiaoStationSearch',
    data() {
      return {
        searchFields: [
          {label: '站长信息', prop: 'introduce'}
        ]
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
