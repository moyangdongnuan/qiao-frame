<template lang="pug">
  div.kalix-article
    keep-alive
      el-row.duty-row(:gutter="0")
        el-col.duty-col(:span="8" style="padding:8px 0 8px 8px;")
          kalix-qiao-tree(v-bind:bizDialog="bizDialog" v-bind:requestUrl="treeDefaultRequestUrl" v-on:setNodeId="getNodeId")
        el-col.duty-col(:span="16")
         <!--kalix-qiao-form(value="" organizationId="")-->
          kalix-tree-grid-1.duty-wrapper(bizKey="clansman" title="族人管理"
          style="padding-top:0"
          ref="kalixTreeGrid"
          v-bind:targetURL="treeUrl"
          v-bind:isToolBarSelf="true"
          v-bind:toolbarBtnList="treeToolbarBtnList"
          v-bind:onToolBarSelfClick="onToolBarClick"
          v-bind:bizDialog="clansmanBizDialog"
          v-bind:columns='columns'
          v-bind:isRowButtonSelf="true"
          v-bind:btnSelfClick="btnClick"
          v-bind:jsonStr="jsonStr"
          v-bind:noSearchParam:sync="noSearchParam"
          v-bind:isColumnfixed="false" bizSearch="QiaoReplySearch"
          v-bind:optActions="optActions"
          )
</template>

<script>
  import {QiaoGenealogyTreeURL, QiaoClansmanURL} from '../config.toml'
  import QiaoTree from '../../../components/tree/ZSTree'
  import KalixTreeGrid1 from '../../../components/forum/treeGrid'
  import ClansmanModel from './clansman_model'

  export default {
    name: 'kalix-qiao-genealogy',
    isFixedColumn: true,
    watch: {
      flag(val) {
        this.treeUrl = QiaoClansmanURL + '/getClansmanByGenealogyId?genealogyId=' + val
      }
    },
    methods: {
      getNodeId(data) {
        console.log('---getNodeId--', data)
        this.flag = data
      },
      btnClick(val, actionType) {
        console.log('--btnClick--', val, actionType)
        if (actionType === 'edit') {
          let that = this
          this.$refs.kalixTreeGrid.getKalixDialog('edit', (_kalixDialog) => {
            this.kalixDialog = _kalixDialog
            setTimeout(() => {
              this.kalixDialog.$refs.kalixBizDialog.open('修改', false, this.addFormModel)
              if (typeof (that.kalixDialog.init) === 'function') {
                that.kalixDialog.init(val) //  需要传参数，就在dialog里面定义init方法
              }
            }, 20)
          })
        } else if (actionType === 'addChildren') {
          let that = this
          this.$refs.kalixTreeGrid.getKalixDialog('addChildren', (_kalixDialog) => {
            this.kalixDialog = _kalixDialog
            setTimeout(() => {
              this.kalixDialog.$refs.kalixBizDialog.open('添加配偶子女', false, this.addFormModel)
              if (typeof (that.kalixDialog.init) === 'function') {
                that.kalixDialog.init(this.flag, val.id) //  需要传参数，就在dialog里面定义init方法
              }
            }, 20)
          })
        }
      },
      onToolBarClick(btnId) {
        console.log('-----onToolBarClicka-------', btnId)
        if (btnId === 'refresh') {
          this.$refs.kalixTreeGrid.getData()
        } else {
          let that = this
          this.$refs.kalixTreeGrid.getKalixDialog('add', (_kalixDialog) => {
            this.kalixDialog = _kalixDialog
            setTimeout(() => {
              this.kalixDialog.$refs.kalixBizDialog.open('添加', false, this.addFormModel)
              if (typeof (that.kalixDialog.init) === 'function') {
                that.kalixDialog.init(this.flag, -1) //  需要传参数，就在dialog里面定义init方法
              }
            }, 20)
          })
        }
      }
    },
    computed: {
    },
    data() {
      return {
        flag: 0,
        treeUrl: '',
        dialogOptions: {},
        isFixedColumn: true,
        treeDefaultRequestUrl: QiaoGenealogyTreeURL,
        targetURL: '',
        orgId: -1,
        orgName: '',
        bizDialog: [
          {id: 'view', dialog: 'GenealogyView'},
          {id: 'edit', dialog: 'GenealogyEdit'},
          {id: 'add', dialog: 'GenealogyAdd'},
          {id: 'generation', dialog: 'generation'}
        ],
        clansmanBizDialog: [
          {id: 'addChildren', dialog: 'clansmanAdd'},
          {id: 'edit', dialog: 'clansmanEdit'},
          {id: 'add', dialog: 'clansmanAdd'},
          {id: 'addUser', dialog: 'GenealogyAddUser'}
        ],
        noSearchParam: true,
        itemBasePath: QiaoClansmanURL,
        toolbarBtnList: [
          {id: 'add', isShow: false},
          {id: 'refresh', isShow: true, icon: 'icon-refresh', title: '刷新'}
        ],
        treeToolbarBtnList: [
          {id: 'refresh', isShow: true, icon: 'icon-refresh', title: '刷新'}
        ],
        targetUrl: QiaoClansmanURL,
        menuItems: [],
        addFormModel: Object.assign({}, ClansmanModel),
        editFormModel: Object.assign({}, ClansmanModel),
        auditingFormModel: Object.assign({}, ClansmanModel),
        postId: '0',
        froumTitle: undefined,
        parentId: undefined,
        kalixDialog: undefined,
        currentRow: undefined,
        isIconSelf: true,
        jsonStr: '',
        optActions: {
          title: '操作',
          type: 'action',
          actions: [{
            type: 'addChildren',
            text: '家人',
            icon: 'el-icon-edit'
          }, {
            type: 'content',
            text: '记事',
            icon: 'el-icon-edit'
          }, {
            type: 'edit',
            text: '编辑',
            icon: 'el-icon-edit'
          }, {
            type: 'delete',
            text: '删除',
            icon: 'el-icon-delete'
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
          title: '族人姓名',
          key: 'name',
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
        }],
        tableHeight: 0 //  列表组件高度
        // bizSearch: 'AdminDutySearch'
      }
    },
    mounted() {
    },
    components: {
      KalixTreeGrid1,
      kalixQiaoTree: QiaoTree
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
