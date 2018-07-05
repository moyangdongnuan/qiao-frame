<template lang="pug">
  div.kalix-article
    keep-alive
      el-row.duty-row(:gutter="0")
        el-col.duty-col(:span="8" style="padding:8px 0 8px 8px;")
          kalix-table-tree(v-on:tableTreeClick="onTableTreeClick")
        el-col.duty-col(:span="16")
          kalix-table.duty-wrapper(bizKey="content" title='内容列表' ref="kalixBaseTable"
          v-bind:tableFields="tableFields"
          v-bind:targetURL="contentURL"
          v-bind:bizDialog="contentDialog"
          v-bind:customTableTool="callCustomTableTool"
          v-bind:btnList="contentBtnList")
            template(slot="tableColumnSlot")
              el-table-column(prop="title"  label="标题")
              el-table-column(prop="subtitle"  label="次标题")
              el-table-column(prop="content"  label="内容")
              el-table-column(prop="sequence"  label="排序")
</template>

<script type="text/ecmascript-6">
  import {QiaoContentURL} from '../config.toml'
  import {contentConfigBtnList} from './config'
  import KalixTableTree from '../../../components/cascader/tableTree'
  import KalixTable from 'kalix-vue-lib-qiao/src/components/common/baseTable'
  import Message from '../../../common/message'

  export default {
    components: {KalixTable, KalixTableTree},
    name: 'kalix-qiao-content',
    data() {
      return {
        isFixedColumn: true,
        modelId: -1,
        modelName: '',
        contentURL: QiaoContentURL,
        tableFields: [
          {prop: 'title', label: '标题'},
          {prop: 'subtitle', label: '次标题'},
          {prop: 'content', label: '内容'},
          {prop: 'sequence', label: '排序号'}
        ],
        contentDialog: [
          {id: 'add', dialog: 'QiaoContentAdd'},
          {id: 'view', dialog: 'QiaoContentView'},
          {id: 'edit', dialog: 'QiaoContentEdit'}
        ],
        contentBtnList: contentConfigBtnList,
        tableHeight: 0, //  列表组件高度
        flag: 0
      }
    },
    methods: {
      callCustomTableTool(row, btnId, that) {
        if (btnId === 'deleteOne') {
          console.log('==deleteOne=====', row)
          this.$confirm('确定要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            return this.$http
              .get('/camel/rest/contents/deleteById?id=' + row.id, {})
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
      onTableTreeClick(data) {
        console.log('org data is ', data.label)
        if (data.flag === 'menu') {
          this.contentURL = QiaoContentURL + '/getContentByMenuId?menuId=' + data.modelId
        }
        if (data.flag === 'columnMenu' && this.flag === 0) {
          this.contentURL = QiaoContentURL + '/getContentByMenuId?menuId=' + data.modelId
          this.flag = 1
        }
        /* this.orgId = data.id
         this.orgName = data.name
         this.targetURL = `/camel/rest/orgs/${data.id}/dutys`
         this.dialogOptions = {
         orgId: this.orgId,
         orgName: this.orgName,
         targetURL: this.targetURL
         } */
        // this.$refs.kalixBaseTable.getData()
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
