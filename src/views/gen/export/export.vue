<template lang="pug">
  div.kalix-article
    keep-alive
      el-row.duty-row(:gutter="0")
        el-col.duty-col(:span="8" style="padding:8px 0 8px 8px;")
          kalix-location-tree(v-bind:requestUrl="treeDefaultRequestUrl" treeTitle="家谱树" v-on:setNodeId="getNodeId")
        el-col.duty-col(:span="16")
          div
            div 当前家谱：《{{genealogyName}}》
              el-button(v-on:click="ClickToExport") 导出家谱
</template>

<script type="text/ecmascript-6">
  import KalixLocationTree from '../../../components/tree/LocationTree'
  import {QiaoGenealogyTreeURL} from '../config.toml'

  export default {
    components: {KalixLocationTree},
    name: 'kalix-qiao-export',
    data() {
      return {
        treeDefaultRequestUrl: QiaoGenealogyTreeURL,
        genealogyId: '',
        genealogyName: ''
      }
    },
    methods: {
      getNodeId(data, row) {
        console.log('==getNodeId====', row, data)
        this.genealogyId = data
        this.genealogyName = row.label
      },
      ClickToExport() {
        this.$http
          .get('/camel/rest/genealogys/exportExcel?id=' + this.genealogyId, {})
          .then(res => {
            console.info('----POI2Excel------', res)
          })
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
