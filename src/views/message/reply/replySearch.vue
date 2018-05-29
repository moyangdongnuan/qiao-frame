<template lang="pug">
  kalix-search(title="回复查询" v-bind:searchFields="searchFields")
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'replySearch',
    data() {
      return {
        searchFields: [
          {label: '回复名称', prop: 'username'}
        ]
      }
    },
    created() {
    },
    methods: {}
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
