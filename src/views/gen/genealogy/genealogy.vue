<template lang="pug">
  keep-alive
    kalix-table(bizKey="genealogy" title='家谱列表' ref="kalixTable"
    v-bind:tableFields="tableFields"
    v-bind:targetURL="genealogyURL"
    v-bind:bizDialog="genealogyDialog"
    v-bind:btnList="genealogyBtnList"
    bizSearch="QiaoGenealogySearch"
    v-bind:isFixedColumn="isFixedColumn"
    )
</template>

<script type="text/ecmascript-6">
  import {QiaoGenealogyURL} from '../config.toml'
  import {genealogyConfigBtnList} from './config'

  export default {
    name: 'kalix-qiao-genealogy',
    data() {
      return {
        isFixedColumn: true,
        genealogyURL: QiaoGenealogyURL,
        tableFields: [
          {prop: 'genealogyname', label: '家谱名称'},
          {prop: 'area', label: '区'},
          {prop: 'category', label: '审核标识'},
          {prop: 'city', label: '市'},
          {prop: 'country', label: '国家'},
          {prop: 'county', label: '县'},
          {prop: 'encoding', label: '地区编码'},
          {prop: 'genealogysite', label: '谱属地'},
          {prop: 'hamlet', label: '村'},
          {prop: 'listid', label: '栏目id（打印菜单）'},
          {prop: 'parentid', label: '父id'},
          {prop: 'part', label: '部id（字典表）'},
          {prop: 'province', label: '省'},
          {prop: 'remarks', label: '备注'},
          {prop: 'streets', label: '街道'},
          {prop: 'summarize', label: '概况'},
          {prop: 'unit', label: '卷id（字典表）'},
          {prop: 'volume', label: '册id（字典表）'}
        ],
        genealogyDialog: [
          {id: 'add', dialog: 'QiaoGenealogyAdd'},
          {id: 'view', dialog: 'QiaoGenealogyView'},
          {id: 'edit', dialog: 'QiaoGenealogyEdit'}
        ],
        genealogyBtnList: genealogyConfigBtnList
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
