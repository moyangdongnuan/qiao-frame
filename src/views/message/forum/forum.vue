<template lang="pug">
  keep-alive
    kalix-table(bizKey="forum" title='留言列表' ref="kalixTable"
    v-bind:tableFields="tableFields"
    v-bind:targetURL="forumURL"
    v-bind:bizDialog="forumDialog"
    v-bind:btnList="forumBtnList"
    v-bind:customTableTool="customTableToolAll"
    bizSearch="QiaoForumSearch" v-bind:dictDefine="dictDefine")
</template>

<script type="text/ecmascript-6">
  import {QiaoForumURL, ForumCategoryURL} from '../../message/config.toml'
  import {forumConfigBtnList} from './config'

  export default {
    name: 'kalix-qiao-forum',
    data() {
      return {
        forumURL: QiaoForumURL,
        dictDefine: [{ // 定义数据字典的显示
          cacheKey: 'QIAO-DICT-KEY',
          type: '审核标识',
          targetField: 'categoryName',
          sourceField: 'category'
        }],
        tableFields: [
          {prop: 'idcard', label: '发帖人别名'},
          {prop: 'title', label: '帖子标题'},
          {prop: 'content', label: '帖子内容'},
          {prop: 'menuName', label: '留言分类'},
          {prop: 'categorytype', label: '类型标识'},
          {prop: 'categoryName', label: '审核状态'},
          {prop: 'creationDate', label: '发帖时间'}
        ],
        forumDialog: [
          {id: 'add', dialog: 'QiaoForumAdd'},
          {id: 'view', dialog: 'QiaoForumView'},
          {id: 'edit', dialog: 'QiaoForumEdit'}
        ],
        forumBtnList: forumConfigBtnList
      }
    },
    methods: {
      customTableToolAll(row, btnId) {
        switch (btnId) {
          case 'auditing': { // 审核功能
            this.$confirm('确定要审核吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              return this.$http
                .get(ForumCategoryURL + '?id=' + row.id, {})
                .then(res => {
                  console.log('----shenhe- res.data------', res.data)
                })
            }).then(response => {
              this.$refs.kalixTable.getData()
            }).catch(() => {
            })
            break
          }
          case 'deleteAll': { // 删除功能
            this.$confirm('确定要删除帖子及帖子下所有回复吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              return this.$http
                .get('/camel/rest/forums/deleteAllById?id=' + row.id, {})
                .then(res => {
                  console.log('---deleteAll--res.data------', res.data)
                })
            }).then(response => {
              this.$refs.kalixTable.getData()
            }).catch(() => {
            })
            break
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
