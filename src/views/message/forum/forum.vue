<template lang="pug">
  keep-alive
    kalix-table(bizKey="forum" title='留言列表' ref="kalixTable"
    v-bind:tableFields="tableFields"
    v-bind:targetURL="forumURL"
    v-bind:bizDialog="forumDialog"
    v-bind:btnList="forumBtnList"
    v-bind:customTableTool="customTableTool"
    bizSearch="QiaoForumSearch" v-bind:dictDefine="dictDefine")
</template>

<script type="text/ecmascript-6">
  import {QiaoForumURL} from '../../message/config.toml'
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
          {id: 'auditing', dialog: 'QiaoForumAuditing'},
          {id: 'view', dialog: 'QiaoForumView'},
          {id: 'edit', dialog: 'QiaoForumEdit'}
        ],
        forumBtnList: forumConfigBtnList
      }
    },
    methods: {
      customTableTool(row, btnId, that) {
        switch (btnId) {
          case 'auditing': {
            // 审核功能
            this.whichBizDialog = ''
            console.log('that.forumDialog=========', this.forumDialog)
            let dig =
              this.forumDialog.filter((item) => {
                return item.id === 'auditing'
              })
            that.whichBizDialog = dig[0].dialog
            setTimeout(() => {
              that.$refs.kalixDialog.$refs.kalixBizDialog.open('审核', false, row)
            }, 20)
            break
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
