<template lang="pug">
  div.kalix-article
    keep-alive
      el-row.duty-row(:gutter="0")
        el-col.duty-col(:span="8" style="padding:8px 0 8px 8px;")
          kalix-location-tree(v-bind:requestUrl="treeDefaultRequestUrl" treeTitle="家谱树" v-on:setNodeId="getNodeId")
        el-col.duty-col(:span="16")
          echarts-map(v-bind:coords="coords" ref="genealogyMap")
</template>

<script type="text/ecmascript-6">
  import EchartsMap from '../../../components/EchartsMap/EchartMap'
  import {QiaoLocationURL, QiaoGenealogyTreeURL} from '../config.toml'
  import KalixLocationTree from '../../../components/tree/LocationTree'

  export default {
    name: 'kalix-qiao-map',
    data() {
      return {
        treeDefaultRequestUrl: QiaoGenealogyTreeURL,
        coords: []
      }
    },
    computed: {
    },
    methods: {
      getNodeId(data) {
        console.log('----getLocationForMap------')
        this.$http
          .get(QiaoLocationURL + '/getLocationForMap?genealogyId=' + data, {})
          .then(res => {
            this.coords = res.data.data
            // this.$refs.genealogyMap.initChart()
          })
      }
    },
    components: {
      EchartsMap,
      KalixLocationTree
    }
  }
</script>

<style scoped lang="stylus">

</style>
