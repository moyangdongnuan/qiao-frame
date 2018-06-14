<!--
  描述：家谱录入树组件的二次封装
  开发人：zhangzhe
  开发日期：2018年06月08日
-->

<template lang="pug">
      div.block
        el-tree.filter-tree(node-key="id" default-expand-all
        v-bind:expand-on-click-node="false"
        v-bind:data="treeData"
        v-bind:props="defaultProps"
        accordion
        highlight-current
        v-on:node-click="handleNodeClick"
        ref="orgTree")
          span.custom-tree-node(slot-scope="{ node, data }")
            span {{ node.label }}
            span
              el-button(type="text" size="mini" v-on:click="() => onViewClick(data)") 查看
              el-button(type="text" size="mini" v-on:click="() => remove(node, data)") 删除
        component(:is="whichBizDialog" ref="kalixDialog"
        v-bind:formModel="formModel"
        v-bind:formRules="formRules")
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'qiao-tree',
    activated() {
      console.log('orgTree component is activated')
      this.whichBizDialog = ''
      /* this.$KalixEventBus.$on('refreshData', this.getData) */
    },
    deactivated() {
      console.log('orgTree component is deactivated')
      this.$KalixEventBus.$off('refreshData')
    },
    props: {
      buttonPermissionPrefix: { //  table中tool的按钮组件认证前缀
        type: String,
        default: ''
      },
      requestUrl: {
        type: String,
        default: '/camel/rest/genealogys'
      },
      bizSearch: {
        type: String
      },
      bizDialog: {
        type: Array
      },
      formModel: {
        type: Object
      },
      formRules: {
        type: Object
      },
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
        defaultProps: '',
        whichBizDialog: '',
        filterText: '',
        treeData: ''
      }
    },
    created() {
      this.tjOptions() // 加载执行
    },
    methods: {
      tjOptions() {
        this.$http
          .get(this.requestUrl, {})
          .then(res => {
            console.log('----treeData------', res.data.data)
            this.treeData = res.data.data
          })
      },
      handleNodeClick() {
        console.log('handleNodeClick')
      },
      remove(node, data) {
        console.log('----node-------', node)
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      },
      onViewClick(data) {
        console.log('data-------------------', data)
        // 添加按钮点击事件
        console.log('dialog--------------------', this.bizDialog)
        let dig =
          this.bizDialog.filter((item) => {
            return item.id === 'view'
          })
        this.whichBizDialog = dig[0].dialog
        console.log('[onAddClick]', dig[0].dialog)
        setTimeout(() => {
          this.$refs.kalixDialog.$refs.kalixBizDialog.open('查看')
          if (typeof (this.$refs.kalixDialog.init) === 'function') {
            this.$refs.kalixDialog.init(data) // 需要传参数，就在dialog里面定义init方法
          }
        }, 20)
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
