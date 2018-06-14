<template lang="pug">
  div.kalix-article
    keep-alive
      el-row.duty-row(:gutter="0")
        el-col.duty-col(:span="8" style="padding:8px 0 8px 8px;")
          kalix-qiao-tree(v-bind:bizDialog="bizDialog" v-bind:requestUrl="treeDefaultRequestUrl")
        el-col.duty-col(:span="16")
          kalix-qiao-form(value="" organizationId="")
</template>

<script>
  import {GenealogyButtonList, QiaoGenealogyTreeURL} from '../config.toml'
  import QiaoTree from '../../../components/tree/ZSTree'
  import QiaoForm from '../../../components/form/Jyform'

  export default {
    name: 'kalix-qiao-genealogy',
    isFixedColumn: true,
    watch: {},
    methods: {
    },

    data() {
      return {
        dialogOptions: {},
        isFixedColumn: true,
        btnList: GenealogyButtonList,
        treeDefaultRequestUrl: QiaoGenealogyTreeURL,
        targetURL: '',
        orgId: -1,
        orgName: '',
        bizDialog: [
          {id: 'view', dialog: 'GenealogyView'},
          {id: 'edit', dialog: 'GenealogyEdit'},
          {id: 'add', dialog: 'GenealogyAdd'},
          {id: 'addUser', dialog: 'GenealogyAddUser'}
        ],
        tableHeight: 0 //  列表组件高度
        // bizSearch: 'AdminDutySearch'
      }
    },
    mounted() {
    },
    components: {
      kalixQiaoTree: QiaoTree,
      kalixQiaoForm: QiaoForm
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
