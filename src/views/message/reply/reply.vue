<!--
描述：系统应用-功能管理
开发人：sunli
开发日期：2018年06月01日
-->

<template lang="pug">
  div.kalix-article
    keep-alive
      el-row.duty-row(:gutter="0")
        el-col.duty-col(:span="6" style="padding:8px 0 8px 8px;")
          kalix-reply-tree(v-on:replyTreeClick="onReplyTreeClick")
        el-col.duty-col(:span="18")
          kalix-tree-grid-1.duty-wrapper(bizKey="reply" title="回复管理"
          style="padding-top:0"
          ref="kalixTreeGrid"
          v-bind:targetURL="treeUrl"
          v-bind:isToolBarSelf="true"
          v-bind:toolbarBtnList="treeToolbarBtnList"
          v-bind:onToolBarSelfClick="onToolBarClick"
          v-bind:bizDialog="bizDialog"
          v-bind:columns='columns'
          v-bind:customRender="showCheckText"
          v-on:selectedRow="getSelectRow"
          v-bind:isRowButtonSelf="true"
          v-bind:btnSelfClick="btnClick"
          v-bind:jsonStr="jsonStr"
          v-bind:noSearchParam:sync="noSearchParam"
          v-bind:isColumnfixed="false" bizSearch="QiaoReplySearch"
          v-bind:optActions="optActions"
          )
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Message from '../../../common/message'
  import {replyMenuURL, replyItemBaseURL, QiaoReplyURL, ReplyCategoryURL} from '../config.toml'
  import KalixReplyTree from '../../../components/cascader/replyTree'
  import KalixTreeGrid from '../../../components/forum/treeGrid'

  export default {
    name: 'kalix-qiao-reply',
    data() {
      return {
        name: '',
        noSearchParam: true,
        itemBasePath: replyItemBaseURL,
        toolbarBtnList: [
          {id: 'add', isShow: false},
          {id: 'refresh', isShow: true, icon: 'icon-refresh', title: '刷新'}
        ],
        treeToolbarBtnList: [
          {id: 'refresh', isShow: true, icon: 'icon-refresh', title: '刷新'}
        ],
        targetUrl: replyMenuURL,
        treeUrl: QiaoReplyURL + '/getReplyByPostId?postId=-1',
        // QiaoReplyURL: QiaoReplyURL,
        menuItems: [],
        addFormModel: Object.assign({}, FormModel),
        editFormModel: Object.assign({}, FormModel),
        auditingFormModel: Object.assign({}, FormModel),
        postId: undefined,
        froumTitle: undefined,
        parentId: undefined,
        kalixDialog: undefined,
        currentRow: undefined,
        isIconSelf: true,
        jsonStr: '',
        bizDialog: [
          {id: 'add', dialog: 'replyAdd'},
          {id: 'edit', dialog: 'replyEdit'}
        ],
        optActions: {
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
          }, {
            type: 'auditing',
            text: '审核',
            icon: 'el-icon-auditing'
          }],
          width: '150'
        },
        columns: [{
          type: 'hidden',
          key: 'id',
          width: '0'
        }, {
          type: 'hidden',
          key: 'parentId',
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
          key: 'categoryName',
          width: '120'
        }, {
          type: 'hidden',
          key: 'category',
          width: '0'
        }, {
          type: 'hidden',
          key: 'postId',
          width: '0'
        }]
      }
    },
    components: {
      KalixReplyTree,
      KalixTreeGrid1: KalixTreeGrid
    },
    computed: {},
    mounted() {
      this.jsonStr = `{ '%username%': ''}`
    },
    methods: {
      onReplyTreeClick(data) {
        this.postId = data.value
        this.forumTitle = data.label
        this.parentContent = data.content
        this.jsonStr = `{'%username%': ''}`
        this.treeUrl = QiaoReplyURL + '/getReplyByPostId?postId=' + data.value
        this.dialogOptions = {
          postId: data.value,
          forumTitle: data.label
        }
      },
      showCheckText(_data) {
        this.showCheck(_data)
      },
      showCheck(_data) {
        if (_data) {
          _data.forEach((e) => {
            e.categoryName = e.category === '0' ? '未审核' : '已审核'
            if (e.children) {
              this.showCheck(e.children)
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
        if (btnId === 'auditing') {
          this.onAuditingClick(row)
        }
      },
      onRefreshClick() {
        if (this.treeUrl !== undefined) {
          this.$refs.kalixTreeGrid.getData()
        }
      },
      onAddClick() {
        if (this.forumTitle === undefined || this.postId === undefined) {
          Message.error('请选择要回复的帖子！')
          return
        }
        let that = this
        this.$refs.kalixTreeGrid.getKalixDialog('add', (_kalixDialog) => {
          this.kalixDialog = _kalixDialog
          setTimeout(() => {
            this.addFormModel.forumTitle = this.forumTitle
            this.addFormModel.postId = this.postId
            if (this.currentRow === undefined) {
              this.addFormModel.parentName = '根目录'
              this.addFormModel.parentId = '-1'
              this.addFormModel.parentContent = this.parentContent
            } else {
              this.addFormModel.parentName = this.currentRow.username
              this.addFormModel.parentId = this.currentRow.id
              this.addFormModel.parentContent = this.currentRow.content
            }
            this.addFormModel.isLeaf = '0'
            this.addFormModel.category = '0'
            this.kalixDialog.$refs.kalixBizDialog.open('添加', false, this.addFormModel)
            if (typeof (that.kalixDialog.init) === 'function') {
              that.kalixDialog.init(this.dialogOptions) //  需要传参数，就在dialog里面定义init方法
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
            this.editFormModel.forumTitle = this.forumTitle
            this.editFormModel.parentContent = this.editFormModel.content
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
            url: QiaoReplyURL + '/' + row.id,
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
      onAuditingClick(row) {
        this.$confirm('确定要审核吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.$http
            .get(ReplyCategoryURL + '?id=' + row.id, {})
            .then(res => {
              console.log('-----this.initOpt------', res.data)
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
  .kalix-article
    position relative
    height 100%
    overflow hidden
    box-sizing border-box

    .duty-row
      height 100%
      .duty-col
        height 100%
        box-sizing border-box

    .duty-wrapper
      margin 9px 0
      .kalix-wrapper
        bottom 0 !important
</style>
