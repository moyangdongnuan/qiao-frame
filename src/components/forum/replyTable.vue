<!--
  描述：前台回复管理-左侧table
  开发人：sunli
  开发日期：2018年6月1日
-->
<template lang="pug">
  div.kalix-search.org-table
    div.kalix-search-hd
      i.tit_icon.iconfont.icon-organization
      | {{tableTitle}}
    div.kalix-search-bd.org-table-bd
      div.ipt-wrapper
        el-input.kalix-search-input(placeholder="输入关键字进行过滤" v-model="filterText")
      div.kalix-table-wrapper
        el-table.filter-table(v-bind:data="tableData"
        v-bind:props="defaultProps" accordion
        node-key="id" highlight-current
        v-bind:filter-node-method="filterNode" v-on:node-click="handleNodeClick"
        ref="tableTree")
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'kalix-reply-table',
    activated() {
      console.log('orgTable component is activated')
      this.$KalixEventBus.$on('refreshData', this.getData)
    },
    deactivated() {
      console.log('orgTable component is deactivated')
      this.$KalixEventBus.$off('refreshData')
    },
    props: {
      treeTitle: {
        type: String,
        default: '留言列表'
      },
      placeholder: {
        default: '请选择'
      },
      value: null,
      parentId: {
        default: -1
      }
    },
    data() {
      return {
        currentValue: this.value,
        input: '',
        iconCls: '',
        filterText: '',
        treeData: [],
        targetURL: '',
        jsonStr: {},
        tableHeight: 0 //  列表组件高度
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true
        return data.title.indexOf(value) !== -1
      },
      handleNodeClick(data) {
        this.postId = data.value
        this.$emit('replyTreeClick', data)
        /* 发送事件供外部调用 */
        console.log('table tree data is ', data.value)
      },
      getData() {
        let url = ''
        url = '/camel/rest/forums/getReplyForTree'
        // if (this.parentId === -1) {
        //   url = '/camel/rest/forums/getReplyForTree'
        // } else {
        //   url = '/camel/rest/forums/' + this.parentId
        // }
        this.axios.request({
          method: 'GET',
          url: url,
          params: {}
        }).then(res => {
          this.treeData = res.data.data
          // 加载数据后自动选中第一个节点
          // this.$nextTick(() => {
          //   const firstNode = document.querySelector('.el-tree-node')
          //   // const firstNode = firstNodes.firstChild
          //   console.log('====firstNode=====', firstNode)
          //   if (firstNode) {
          //     firstNode.click()
          //   }
          // })
        })
        // const currentTreeListItem = JSON.parse(this.$KalixCatch.get('currentTreeListItem'))
        // if (currentTreeListItem) {
        //   this.iconCls = currentTreeListItem.iconCls
        // }
      }
    },
    watch: {
      // filterText(val) {
      //   this.$refs.tableTree.filter(val)
      // },
      orgId(val) {
        this.targetURL = `/camel/rest/orgs/${this.orgId}/dutys`
      }
    },
    components: {},
    computed: {}

  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "../../assets/stylus/baseTable.styl"
  @import "../../assets/stylus/color.styl"
  .org-tree
    display flex
    flex-flow column
    .org-tree-bd
      flex 1
      display flex
      flex-flow column
      padding 0
      .ipt-wrapper
        padding 8px 12px
      .kalix-tree-wrapper
        flex 1
        padding 0 12px
        box-sizing border-box
        overflow auto
</style>
