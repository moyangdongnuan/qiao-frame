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
              el-button(type="text" size="mini" v-on:click="() => onAddClick(data)") 增加
              el-button(type="text" size="mini" v-on:click="() => remove(node, data)") 删除
        component(:is="whichBizDialog" ref="kalixDialog"
        v-bind:formModel="formModel"
        v-bind:formRules="formRules")
</template>

<script type="text/ecmascript-6">
  import Message from '../../common/message'
  export default {
    name: 'qiao-tree',
    activated() {
      console.log('orgTree component is activated')
      this.whichBizDialog = ''
      this.$KalixEventBus.$on('refreshData', this.getData)
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
      },
      append(data) {
        const newChild = { id: this.id++, label: '', children: [] }
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
      },
      onAddClick(data) {
        console.log('data-------------------', data)
        // 添加按钮点击事件
        console.log('dialog--------------------', this.bizDialog)
        let dig =
          this.bizDialog.filter((item) => {
            return item.id === 'add'
          })
        this.whichBizDialog = dig[0].dialog
        console.log('[onAddClick]', dig[0].dialog)
        setTimeout(() => {
          this.$refs.kalixDialog.$refs.kalixBizDialog.open('添加')
          if (typeof (this.$refs.kalixDialog.init) === 'function') {
            this.$refs.kalixDialog.init(this.dialogOptions) // 需要传参数，就在dialog里面定义init方法
          }
        }, 20)
      },
      btnClick(row, btnId) { // table工具栏点击事件
        console.log(row, btnId)
        switch (btnId) {
          case 'view': {
            let that = this
            let dig =
              this.bizDialog.filter((item) => {
                return item.id === 'view'
              })
            this.whichBizDialog = dig[0].dialog
            setTimeout(() => {
              if (this.isBeforeView) {
                this.$emit('handleBeforeView', row)
                if (typeof (this.$refs.kalixDialog.initPropertis) === 'object') {
                  this.$refs.kalixDialog.initPropertis = row
                }
              }
              that.$refs.kalixDialog.$refs.kalixBizDialog.open('查看', false, row)
              if (typeof (this.$refs.kalixDialog.init) === 'function') {
                // 添加初始化模型赋值参数
                if (this.dialogOptions && this.dialogOptions.row) {
                  this.dialogOptions.row = row
                }
                this.$refs.kalixDialog.init(this.dialogOptions)
              }
              if (this.isAfterView === true) {
                this.$emit('handleAfterView', row)
              }
            }, 20)
            break
          }

          case 'edit': {
            this.whichBizDialog = ''
            let dig =
              this.bizDialog.filter((item) => {
                return item.id === 'edit'
              })
            console.log('[kalix] edit dialog is: ' + dig[0].dialog)
            this.whichBizDialog = dig[0].dialog
            setTimeout(() => {
              this.$refs.kalixDialog.$refs.kalixBizDialog.open('编辑', true, row)
              if (typeof (this.$refs.kalixDialog.init) === 'function') {
                // 添加初始化模型赋值参数
                // this.dialogOptions.editFormModel = row
                if (this.dialogOptions && this.dialogOptions.row) {
                  this.dialogOptions.row = row
                }
                this.$refs.kalixDialog.init(this.dialogOptions)
              }
            }, 20)
            console.log('edit is clicked')
            break
          }

          case 'delete': {
            console.log('delete is clicked')
            this.$confirm('确定要删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              return this.axios.request({
                method: 'DELETE',
                url: this.targetURL + '/' + row.id,
                params: {},
                data: {
                  id: row.id
                }
              })
            }).then(response => {
              this.getData()
              Message.success(response.data.msg)
              // 添加删除后自定义处理事件
              // this.$emit('afterDelete')
            }).catch(() => {
            })
            break
          }
          // 附件管理
          case 'attachment': {
            console.log(' attachment is clicked ', 'background:#c7320a;')
            let that = this
            // this.whichBizDialog = 'AttachmentDialog'
            this.whichBizDialog = 'kalix-attachment-dialog'
            setTimeout(() => {
              that.$refs.kalixDialog.openDialog(row, this.bizKey, this.fileAccept)
            }, 20)
            break
          }

          default: // 默认转到调用props的方法
            this.customTableTool(row, btnId, this)
            break
        }
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
