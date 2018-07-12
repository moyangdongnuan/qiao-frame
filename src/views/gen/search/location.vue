<template lang="pug">
  div.kalix-article
    keep-alive
      el-row.duty-row(:gutter="0")
        el-col.duty-col(:span="8" style="padding:8px 0 8px 8px;")
          kalix-location-tree(v-bind:requestUrl="treeDefaultRequestUrl" treeTitle="家谱树" v-on:setNodeId="getNodeId")
        el-col.duty-col(:span="16")
          kalix-table.duty-wrapper(bizKey="location" title='迁徙记录' ref="kalixBaseTable"
          v-bind:tableFields="tableFields"
          v-bind:targetURL="locationURL"
          v-bind:bizDialog="locationDialog"
          v-bind:dialogOptions="flag"
          v-bind:jsonStr="jsonStr"
          v-bind:customTableTool="callCustomTableTool"
          v-bind:btnList="locationBtnList")
            template(slot="tableColumnSlot")
              el-table-column(prop="startProvince"  label="起始城市")
              el-table-column(prop="endProvince"  label="终止城市")
              el-table-column(prop="updateDate"  label="操作时间")
</template>

<script type="text/ecmascript-6">
  import {QiaoLocationURL, QiaoGenealogyTreeURL} from '../config.toml'
  import {locationConfigBtnList} from './config'
  import KalixLocationTree from '../../../components/tree/LocationTree'
  import KalixTable from '../../../components/cascader/LocationTable'
  import Message from '../../../common/message'

  export default {
    components: {KalixTable, KalixLocationTree},
    name: 'kalix-qiao-search',
    data() {
      return {
        modelId: -1,
        treeDefaultRequestUrl: QiaoGenealogyTreeURL,
        locationURL: QiaoLocationURL + '/getLocationByGenealogyId',
        tableFields: [
          {prop: 'startProvince', label: '起始城市'},
          {prop: 'updateDate', label: '操作时间'},
          {prop: 'endProvince', label: '终止城市'}
        ],
        locationDialog: [
          {id: 'add', dialog: 'QiaoLocationAdd'},
          {id: 'edit', dialog: 'QiaoLocationEdit'}
        ],
        locationBtnList: locationConfigBtnList,
        tableHeight: 0, //  列表组件高度
        flag: ''
      }
    },
    computed: {
      jsonStr() {
        return this.flag.modelId + ''
      }
    },
    watch: {
      jsonStr(newVal, oldVal) {
        console.log('jsonStr(newVal)', newVal, oldVal)
        this.$refs.kalixBaseTable.getData()
      }
    },
    methods: {
      refreshData() {
        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&==refreshData===refreshData==')
        this.$refs.kalixBaseTable.getData()
      },
      callCustomTableTool(row, btnId, that) {
        if (btnId === 'deleteOne') {
          console.log('==deleteOne=====', row)
          this.$confirm('确定要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            return this.$http
              .get('/camel/rest/locations/deleteById?id=' + row.id, {})
              .then(res => {
                console.info('----treeData------', res)
                Message.success(res.data)
                this.$refs.kalixBaseTable.getData()
              })
          }).then(response => {
          }).catch(() => {
          })
        }
      },
      getNodeId(data, row) {
        console.log('==getNodeId====', row)
        this.flag = row
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "../../../assets/stylus/baseTable.styl"
  @import "../../../assets/stylus/color.styl"
  .kalix-search
    position relative
    margin 5px
    border 1px solid border-color_1
    box-sizing border-box
    .kalix-search-hd
      background-color #5fa2dd
      color txt-color_1
      line-height 44px
      padding 0 15px
      text-align left
    .kalix-search-bd
      position absolute
      border-top 1px solid border-color_1
      font-size 0
      padding 5px 15px
      text-align left
      top 44px
      left 0
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      .search-container
        display flex
      .kalix-tree-wrapper
        position: absolute;
        top 60px
        right 10px
        bottom 10px
        left 10px
        padding-right 16px
        box-sizing border-box
        overflow auto

    .el-button
      .iconfont
        font-size 14px

  .kalix-article
    position relative
    height 100%
    overflow hidden
    box-sizing border-box
    .kalix-search,
    .kalix-wrapper
      height 100%
      margin 0
      box-sizing border-box
    .kalix-search
      margin-top 0 !important
    .kalix-wrapper
      margin-bottom 0 !important
      position relative
      top 0
      .kalix-wrapper-hd
        height 44px
      .kalix-wrapper-bd
        position absolute
        top 44px
        bottom 0
        left 0
        width 100%
        box-sizing border-box
        padding 12px
        .kalix-table-container
          position relative
          top 0
          height 100%
          margin 0

  .duty-row
    height 100%
    .duty-col
      height 100%
      box-sizing border-box

  .duty-wrapper
    margin 8px 0
    .kalix-wrapper
      bottom 0 !important
</style>

