<template lang="pug">
  keep-alive
    <!--kalix-table(bizKey="reply" title='回复列表' ref="kalixTable"-->
    <!--v-bind:tableFields="tableFields"-->
    <!--v-bind:targetURL="replyURL"-->
    <!--v-bind:bizDialog="replyDialog"-->
    <!--v-bind:btnList="replyBtnList"-->
    <!--bizSearch="QiaoReplySearch" v-bind:dictDefine="dictDefine")-->
    kalix-tree-grid(
    v-bind:tableFields="tableFields"
    v-bind:targetURL="replyURL"
    title="回复列表"
    v-bind:bizSearch="'QiaoReplySearch'"
    v-bind:btnList="replyBtnList"
    v-bind:bizDialog="replyDialog"
    v-bind:formModel="formModel"
    v-bind:dialogOptions="dialogOptions"
    v-on:selectedRow="selectedRow"
    v-bind:isSearchAfterHandle="true"
    v-on:handleAfterSearch="handleAfterSearch"
    v-bind:isLimitLayer="false")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoReplyURL} from '../../message/config.toml'
  import {replyConfigBtnList} from './config'

  export default {
    name: 'kalix-qiao-reply',
    data() {
      return {
        replyURL: QiaoReplyURL,
        formModel: Object.assign({}, FormModel),
        dictDefine: [{ // 定义数据字典的显示
          cacheKey: 'QIAO-DICT-KEY',
          type: '审核标识',
          targetField: 'categoryName',
          sourceField: 'category'
        }],
        tableFields: [
          {prop: 'username', label: '回复人姓名'},
          {prop: 'content', label: '回复内容'},
          {prop: 'categoryName', label: '审核状态'},
          {prop: 'parentid', type: 'hidden'},
          {prop: 'id', type: 'hidden'}
        ],
        replyDialog: [
          {id: 'add', dialog: 'QiaoReplyAdd'},
          {id: 'view', dialog: 'QiaoReplyView'},
          {id: 'edit', dialog: 'QiaoReplyEdit'}
        ],
        replyBtnList: replyConfigBtnList,
        dialogOptions: {}
      }
    },
    methods: {
      selectedRow(row) {
        if (row) {
          this.dialogOptions = {
            parentid: row.id,
            // 选中以后replyName 为当前选中行的值
            replyName: row.username
          }
        }
      },
      handleAfterSearch(tableData) {
        if (tableData && tableData.length) {
          this.dialogOptions = {
            parentid: tableData[0].parentid,
            // 未被选中时replyName 为父节点名
            replyName: tableData[0].parentName
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
