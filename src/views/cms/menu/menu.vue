<template lang="pug">
  keep-alive
    kalix-table(bizKey="menu" title='菜单列表' ref="kalixTable"
    v-bind:tableFields="tableFields"
    v-bind:targetURL="menuURL"
    v-bind:bizDialog="menuDialog"
    v-bind:btnList="menuBtnList"
    v-bind:customTableTool="callCustomTableTool"
    bizSearch="QiaoMenuSearch")
</template>

<script type="text/ecmascript-6">
  import {QiaoMenuListURL} from '../config.toml' // QiaoMenuListURL
  import {menuConfigBtnList} from './config'
  import KalixTable from 'kalix-vue-lib-qiao/src/components/common/baseTable'
  import Message from '../../../common/message'

  export default {
    name: 'kalix-qiao-menu',
    components: {KalixTable},
    data() {
      return {
        menuURL: QiaoMenuListURL, // QiaoMenuListURL
        tableFields: [
          {prop: 'columnName', label: '所属栏目'},
          {prop: 'name', label: '菜单名称'},
          {prop: 'sequence', label: '排序号'},
          {prop: 'viewURL', label: '菜单路由'},
          {prop: 'show', label: '是否展示'},
          {prop: 'message', label: '是否留言'}
        ],
        menuDialog: [
          {id: 'add', dialog: 'QiaoMenuAdd'},
          {id: 'view', dialog: 'QiaoMenuView'},
          {id: 'edit', dialog: 'QiaoMenuEdit'}
        ],
        menuBtnList: menuConfigBtnList
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
              .get('/camel/rest/menus/deleteById?id=' + row.id, {})
              .then(res => {
                console.info('----treeData------', res)
                Message.success(res.data)
                this.$refs.kalixTable.getData()
              })
          }).then(response => {
          }).catch(() => {
          })
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
