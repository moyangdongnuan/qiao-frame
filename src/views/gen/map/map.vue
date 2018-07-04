<template lang="pug">
    echarts-map(v-bind:coords="coords")
</template>

<script type="text/ecmascript-6">
  import EchartsMap from '../../../components/EchartsMap/EchartMap'

  export default {
    name: 'kalix-qiao-map',
    data() {
      return {
        coords: [
          {fromCoord: '上海', toCoord: '呼和浩特'},
          {fromCoord: '呼和浩特', toCoord: '吉林'},
          {fromCoord: '上海', toCoord: '贵州'},
          {fromCoord: '上海', toCoord: '北京'},
          {fromCoord: '上海', toCoord: '海口'},
          {fromCoord: '上海', toCoord: '西安'}
        ]
      }
    },
    components: {
      EchartsMap
    }
  }
</script>

<style scoped lang="stylus">

</style>
