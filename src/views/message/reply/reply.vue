<!--
描述：论坛应用-回复管理
开发人：sunli
开发日期：2018年05月30日
-->
<template lang="pug">
  div.kalix-article
    keep-alive
      el-row.reply-row(:gutter="0")
        el-col.reply-col(:span="20")
          kalix-tree-grid(bizKey="reply" title="回复管理"
            ref="kalixTreeGrid"
            v-bind:isToolBarSelf="true" v-bind:toolbarBtnList="treeToolbarBtnList" v-bind:onToolBarSelfClick="onToolBarClick"
            v-bind:bizDialog="bizDialog" v-bind:columns='columns' v-bind:targetURL="treeUrl"
            v-bind:customRender="showPermissionText" v-on:selectedRow="getSelectRow"
            bizSearch="replySearch" v-on:KalixDialogOpen=""
            v-bind:isRowButtonSelf="true" v-bind:btnSelfClick="btnClick" v-bind:isColumnfixed="false")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  // import BaseNavMenu from '../../../components/custom/baseNavMenu'
  // import TreeGrid from '../../../components/custom/treeGrid'
  // import Message from '../../../common/message'
  import {QiaoReplyURL} from '../config.toml'

  export default {
    name: 'kalix-qiao-reply',
    data() {
      return {
        dictDefine: [{
          cacheKey: 'QIAO-DICT-KEY',
          type: '审核标识    ',
          targetField: 'categoryName',
          sourceField: 'category'
        }],
        treeToolbarBtnList: [
          // {id: 'refresh', isShow: true, icon: 'icon-refresh', title: '刷新'}
        ],
        treeUrl: undefined,
        replyUrl: QiaoReplyURL,
        menuItems: [],
        addFormModel: Object.assign({}, FormModel),
        editFormModel: Object.assign({}, FormModel),
        applicationName: undefined,
        applicationId: undefined,
        applicationCode: undefined,
        parentPermission: undefined,
        kalixDialog: undefined,
        currentRow: undefined,
        isIconSelf: true,
        bizDialog: [
          {id: 'add', dialog: 'replyAdd'},
          {id: 'edit', dialog: 'replyEdit'},
          {id: 'view', dialog: 'replyView'}
        ],
        columns: [{
          type: 'hidden',
          key: 'id',
          width: '0'
        }, {
          type: 'hidden',
          key: 'parentId',
          width: '0'
        }, {
          title: '回复名称',
          key: 'username',
          width: '150'
        }, {
          title: '回复内容',
          key: 'content',
          width: '120'
        }, {
          title: '回复日期',
          key: 'creationDate',
          width: '150'
        }, {
          title: '审核状态',
          key: 'categoryName',
          width: '150'
        }, {
          title: '操作',
          type: 'action',
          actions: [{
            type: 'edit',
            text: '编辑',
            icon: 'el-icon-edit'
          }, {
            type: 'delete',
            text: '删除',
            icon: 'el-icon-delete'
          }],
          width: '150'
        }]
      }
    },
    components: {
      // KalixNavMenu: BaseNavMenu,
      // KalixTreeGrid: TreeGrid
    },
    computed: {
    },
    methods: {
      getMenuItems(data) {
        this.menuItems = data.children
      },
      getMenuItem(val) {
        this.treeUrl = this.itemBasePath + val.id
        this.applicationName = val.name
        this.applicationId = val.id
        this.applicationCode = val.code
      },
      showPermissionText(_data) {
        this.showPermission(_data)
      },
      showPermission(_data) {
        if (_data) {
          _data.forEach((e) => {
            e.isDataPermission = e.dataPermission ? '是' : '否'
            if (e.children) {
              this.showPermission(e.children)
            }
          })
        }
      },
      onToolBarClick(btnId) {
        if (btnId === 'add') {
          this.onAddClick()
        }
        if (btnId === 'refresh') {
          this.onRefreshClick()
        }
      },
      btnClick(row, btnId) {
        if (btnId === 'edit') {
          this.onEditClick(row)
        }
        if (btnId === 'delete') {
          this.onDeleteClick(row)
        }
      },
      onRefreshClick() {
        if (this.treeUrl !== undefined) {
          this.$refs.kalixTreeGrid.getData()
        }
      },
      onAddClick() {
        // if (this.applicationName === undefined || this.applicationId === undefined || this.applicationCode === undefined) {
        //   this.$KalixMessage.error('请选择一个应用！')
        //   return
        // }
        let that = this
        this.$refs.kalixTreeGrid.getKalixDialog('add', (_kalixDialog) => {
          this.kalixDialog = _kalixDialog
          setTimeout(() => {
            this.addFormModel.applicationName = this.applicationName
            this.addFormModel.applicationId = this.applicationId
            this.parentPermission = this.applicationCode
            if (this.currentRow === undefined) {
              this.addFormModel.parentName = '根功能'
              this.addFormModel.parentId = '-1'
            } else {
              this.addFormModel.parentName = this.currentRow.name
              this.addFormModel.parentId = this.currentRow.id
              this.parentPermission = this.currentRow.permission
            }
            this.addFormModel.isLeaf = '1'
            this.addFormModel.permission = this.parentPermission + ':' + this.addFormModel.code
            console.log('this.addFormModel=============', this.addFormModel)
            this.kalixDialog.$refs.kalixBizDialog.open('添加', false, this.addFormModel)
            if (typeof (that.kalixDialog.init) === 'function') {
              that.kalixDialog.init(this.dialogOptions) // 需要传参数，就在dialog里面定义init方法
            }
          }, 20)
        })
      },
      onEditClick(row) {
        let that = this
        this.$refs.kalixTreeGrid.getKalixDialog('edit', (_kalixDialog) => {
          this.kalixDialog = _kalixDialog
          setTimeout(() => {
            this.editFormModel = row
            this.editFormModel.applicationName = this.applicationName
            // this.formModel.isLeaf = row.leaf
            if (row.dataPermission !== true) {
              row.dataPermission = false
            }
            this.editFormModel.dataPermission = row.dataPermission + ''
            console.log('this.editFormModel==============', this.editFormModel)
            this.kalixDialog.$refs.kalixBizDialog.open('编辑', true, this.editFormModel)
            if (typeof (that.kalixDialog.init) === 'function') {
              that.kalixDialog.init(this.dialogOptions) // 需要传参数，就在dialog里面定义init方法
            }
          }, 20)
        })
      },
      onDeleteClick(row) {
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.axios.request({
            method: 'DELETE',
            url: this.replyUrl + '?id=' + row.id,
            params: {},
            data: {
              id: row.id
            }
          })
        }).then(response => {
          this.$refs.kalixTreeGrid.getData()
          this.$KalixMessage.success(response.data.msg)
        }).catch(() => {
        })
      },
      getSelectRow(val) {
        console.log('getSelectRow========', val)
        this.currentRow = val
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "~@/assets/stylus/color.styl"
  .kalix-article
    position relative
    height 100%
    overflow hidden
    box-sizing border-box

  .reply-row
    height 100%
    .reply-col
      height 100%
      box-sizing border-box
  .reply-wrapper
    margin -10px 0
    .kalix-wrapper
      bottom 0 !important
</style>
