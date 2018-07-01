<!--
  描述：家谱录入树组件的二次封装
  开发人：zhangzhe
  开发日期：2018年06月08日
-->

<template lang="pug">
  keep-alive
    div.block
      el-button(v-on:click="onAddClick") 新增家谱
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
            el-button(type="text" size="mini" v-on:click="() => generationInfo(data)") 字辈
            el-button(type="text" size="mini" v-on:click="() => onViewClick(data)") 查看
            el-button(type="text" size="mini" v-on:click="() => onEditClick(data)") 修改
            el-button(type="text" size="mini" v-on:click="() => remove(data)") 删除
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
      this.$KalixEventBus.$on('refreshData', this.tjOptions)
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
        type: Array,
        default() {
          return []
        }
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
        modelId: 0,
        treeData: ''
      }
    },
    watch: {
      flag: function () {
        this.tjOptions()
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
            if (res.data.data.length > 0) {
              this.handleNodeClick(res.data.data[0])
            }
          })
      },
      handleNodeClick(data) {
        console.log('---handleNodeClick--', data)
        if (data.modelId !== this.modelId) {
          this.modelId = data.modelId
          this.$emit('setNodeId', this.modelId)
          console.log(this.modelId)
        }
      },
      remove(data) {
        this.$confirm('是否确认删除家谱及谱下族人信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.$http
            .get('/camel/rest/genealogys/deleteById?id=' + data.modelId, {})
            .then(res => {
              this.tjOptions()
              console.info('----treeData------', res)
            })
        }).then(response => {
          this.$refs.orgTree.tjOptions()
        }).catch(() => {
        })
      },
      onViewClick(data) {
        // 添加按钮点击事件
        let dig =
          this.bizDialog.filter((item) => {
            return item.id === 'view'
          })
        this.whichBizDialog = dig[0].dialog
        console.log('[onViewClick]', dig[0].dialog)
        setTimeout(() => {
          this.$refs.kalixDialog.$refs.kalixBizDialog.open('查看')
          if (typeof (this.$refs.kalixDialog.init) === 'function') {
            this.$refs.kalixDialog.init(data) // 需要传参数，就在dialog里面定义init方法
          }
        }, 20)
      },
      onAddClick() {
        console.log('-----onAddClick-------')
        let dig =
          this.bizDialog.filter((item) => {
            return item.id === 'add'
          })
        this.whichBizDialog = dig[0].dialog
        console.log('[onAddClick]', dig[0].dialog)
        setTimeout(() => {
          this.$refs.kalixDialog.$refs.kalixBizDialog.open('添加')
          if (typeof (this.$refs.kalixDialog.init) === 'function') {
            this.$refs.kalixDialog.init() // 需要传参数，就在dialog里面定义init方法
          }
        }, 20)
      },
      onEditClick(data) {
        console.log('-----onEditClick-------')
        let dig =
          this.bizDialog.filter((item) => {
            return item.id === 'edit'
          })
        this.whichBizDialog = dig[0].dialog
        console.log('[onEditClick]', dig[0].dialog)
        setTimeout(() => {
          this.$refs.kalixDialog.$refs.kalixBizDialog.open('修改')
          if (typeof (this.$refs.kalixDialog.init) === 'function') {
            this.$refs.kalixDialog.init(data) // 需要传参数，就在dialog里面定义init方法
          }
        }, 20)
      },
      generationInfo(data) {
        console.log(data)
        let dig =
          this.bizDialog.filter((item) => {
            return item.id === 'generation'
          })
        this.whichBizDialog = dig[0].dialog
        console.log('[onEditClick]', dig[0].dialog)
        setTimeout(() => {
          this.$refs.kalixDialog.$refs.kalixBizDialog.open('字辈')
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
