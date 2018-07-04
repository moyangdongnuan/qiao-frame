<template lang="pug">
  keep-alive
    kalix-table(bizKey="station" title='站长信息列表' ref="kalixTable"
    v-bind:tableFields="tableFields"
    v-bind:targetURL="stationURL"
    v-bind:bizDialog="stationDialog"
    v-bind:btnList="stationBtnList"
    bizSearch="QiaoStationSearch")
</template>

<script type="text/ecmascript-6">
  import {QiaoStationURL} from '../config.toml'
  import {stationConfigBtnList} from './config'

  export default {
    name: 'kalix-qiao-station',
    data() {
      return {
        stationURL: QiaoStationURL,
        tableFields: [
          {prop: 'imgurl', label: '站长图片'},
          {prop: 'introduce', label: '站长信息'}
        ],
        stationDialog: [
          {id: 'add', dialog: 'QiaoStationAdd'},
          {id: 'view', dialog: 'QiaoStationView'},
          {id: 'edit', dialog: 'QiaoStationEdit'}
        ],
        stationBtnList: stationConfigBtnList
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
