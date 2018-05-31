<!--
  描述：组织结构树组件的二次封装
  开发人：sunlf
  开发日期：2017年11月08日
-->

<template lang="pug">
    <!--div.kalix-search.org-tree-->
      <!--div.kalix-search-hd-->
        <!--i.tit_icon.iconfont.icon-organization-->
        <!--| {{treeTitle}}-->
      <!--div.kalix-search-bd.org-tree-bd-->
        <!--div.ipt-wrapper-->
          <!--el-input.kalix-search-input(placeholder="输入关键字进行过滤" v-model="filterText")-->
        <!--div.kalix-tree-wrapper-->
      div.block
        el-tree.filter-tree(show-checkbox node-key="id" default-expand-all
        v-bind:expand-on-click-node="false"
        v-bind:data="treeData"
        v-bind:props="defaultProps"
        accordion
        highlight-current
        v-bind:filter-node-method="filterNode"
        v-on:node-click="handleNodeClick"
        ref="orgTree")
          span.custom-tree-node(slot-scope="{ node, data }")
            span {{ node.label }}
            span
              el-button(type="text" size="mini" v-on:click="() => append(data)") 增加
              el-button(type="text" size="mini" v-on:click="() => remove(node, data)") 删除
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'qiao-tree',
    activated() {
      console.log('orgTree component is activated')
      this.$KalixEventBus.$on('refreshData', this.getData)
    },
    deactivated() {
      console.log('orgTree component is deactivated')
      this.$KalixEventBus.$off('refreshData')
    },
    props: {
      treeTitle: {
        type: String,
        default: '组织机构树'
      },
      placeholder: {
        default: '请选择职务'
      },
      value: null,
      organizationId: {
        default: -1
      },
      targetURL: ''
    },
    data() {
      return {
        id: 1000,
        filterText: '',
        treeData: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }]
      }
    },
    methods: {
      append(data) {
        const newChild = { id: this.id++, label: 'testtest', children: [] }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
      },

      remove(node, data) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
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
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

</style>
