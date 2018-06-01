<!--
描述：系统应用-功能管理
开发人：yangz
开发日期：2018年01月25日
-->

<template lang="pug">
  div.kalix-article
    keep-alive
      el-row.duty-row(:gutter="0")
        el-col.duty-col(:span="8" style="padding:16px 0 8px 8px;")
          kalix-reply-tree(v-on:replyTreeClick="onReplyTreeClick")
        el-col.duty-col(:span="16")
          kalix-tree-grid.duty-wrapper(bizKey="reply" title="回复管理"
            ref="kalixTreeGrid"
            v-bind:isToolBarSelf="true" v-bind:toolbarBtnList="treeToolbarBtnList" v-bind:onToolBarSelfClick="onToolBarClick"
            v-bind:bizDialog="bizDialog" v-bind:columns='columns' v-bind:targetURL="treeUrl"
            v-bind:customRender="showPermissionText" v-on:selectedRow="getSelectRow"
            v-bind:isRowButtonSelf="true" v-bind:btnSelfClick="btnClick" v-bind:isColumnfixed="false")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Message from '../../../common/message'
  import {replyURL, replyMenuURL, replyItemBaseURL} from '../config.toml'
  import KalixReplyTree from '../../../components/cascader/replyTree'

  export default {
    name: 'kalix-qiao-reply',
    data() {
      return {
        itemBasePath: replyItemBaseURL,
        toolbarBtnList: [
          {id: 'add', isShow: false},
          {id: 'refresh', isShow: true, icon: 'icon-refresh', title: '刷新'}
        ],
        treeToolbarBtnList: [
          {id: 'refresh', isShow: true, icon: 'icon-refresh', title: '刷新'}
        ],
        targetUrl: replyMenuURL,
        treeUrl: replyURL + '?postId=117757',
        replyUrl: replyURL,
        menuItems: [],
        addFormModel: Object.assign({}, FormModel),
        editFormModel: Object.assign({}, FormModel),
        postId: undefined,
        posttitle: undefined,
        parentId: undefined,
        kalixDialog: undefined,
        currentRow: undefined,
        isIconSelf: true,
        bizDialog: [
          {id: 'add', dialog: 'replyAdd'},
          {id: 'edit', dialog: 'replyEdit'}
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
          type: 'hidden',
          key: 'postId',
          width: '0'
        }, {
          type: 'hidden',
          key: 'postId',
          width: '0'
        }, {
          title: '回复人姓名',
          key: 'username',
          width: '150'
        }, {
          title: '回复内容',
          key: 'content',
          width: '120'
        }, {
          title: '回复时间',
          key: 'creationDate',
          width: '120'
        }, {
          title: '审核状态',
          key: 'category',
          width: '120'
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
      KalixReplyTree
      // KalixReplyTreeGrid
      // KalixNavMenu: BaseNavMenu,
      // KalixTreeGrid: TreeGrid
    },
    computed: {
    },
    methods: {
      onReplyTreeClick(data) {
        console.log('org data is ', data.value)
        this.treeUrl = replyURL + '?postId=' + data.value
      },
      getMenuItems(data) {
        this.menuItems = data.children
      },
      getMenuItem(val) {
        this.treeUrl = this.itemBasePath + val.id
        this.forumtitle = val.title
        this.postId = val.id
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
        if (this.forumtitle === undefined || this.postId === undefined) {
          Message.error('请选择要回复的帖子！')
          return
        }
        let that = this
        this.$refs.kalixTreeGrid.getKalixDialog('add', (_kalixDialog) => {
          this.kalixDialog = _kalixDialog
          setTimeout(() => {
            this.addFormModel.forumtitle = this.forumtitle
            this.addFormModel.postId = this.postId
            if (this.currentRow === undefined) {
              this.addFormModel.parentName = '根功能'
              this.addFormModel.parentId = '-1'
            } else {
              this.addFormModel.parentName = this.currentRow.name
              this.addFormModel.parentId = this.currentRow.id
            }
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
            this.editFormModel.forumtitle = this.forumtitle
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
          Message.success(response.data.msg)
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
  @import "../../../assets/stylus/baseTable.styl"
  @import "../../../assets/stylus/color.styl"
  .kalix-search
    position relative
    margin 5px
    border 1px solid border-color_1
    box-sizing border-box
    .kalix-search-hd
      background-color #5fa2dd
      color txt-color_1
      line-height 44px
      padding 0 15px
      text-align left
    .kalix-search-bd
      position absolute
      border-top 1px solid border-color_1
      font-size 0
      padding 5px 15px
      text-align left
      top 44px
      left 0
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      .search-container
        display flex
      .kalix-tree-wrapper
        position: absolute;
        top 60px
        right 10px
        bottom 10px
        left 10px
        padding-right 16px
        box-sizing border-box
        overflow auto

    .el-button
      .iconfont
        font-size 14px

  .kalix-article
    position relative
    height 100%
    overflow hidden
    box-sizing border-box
    .kalix-search,
    .kalix-wrapper
      height 100%
      margin 0
      box-sizing border-box
    .kalix-search
      margin-top 0 !important
    .kalix-wrapper
      margin-bottom 0 !important
      position relative
      top 0
      .kalix-wrapper-hd
        height 44px
      .kalix-wrapper-bd
        position absolute
        top 44px
        bottom 0
        left 0
        width 100%
        box-sizing border-box
        padding 12px
        .kalix-table-container
          position relative
          top 0
          height 100%
          margin 0

    .duty-row
      height 100%
      .duty-col
        height 100%
        box-sizing border-box

    .duty-wrapper
      margin 8px 0
      .kalix-wrapper
        bottom 0 !important
</style>
