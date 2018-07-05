<template lang="pug">
  div.kalix-article
    keep-alive
      el-row.duty-row(:gutter="0")
        el-col.duty-col(:span="8" style="padding:8px 0 8px 8px;")
          kalix-qiao-tree(v-bind:bizDialog="bizDialog" v-bind:requestUrl="treeDefaultRequestUrl" v-on:setNodeId="getNodeId")
        el-col.duty-col(:span="16")
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
          v-bind:isColumnfixed="false" bizSearch="ClansmanSearch"
          v-bind:optActions="optActions"
          )
</template>

<script>
  import {QiaoGenealogyTreeURL, QiaoClansmanURL, QiaoGenerationURL} from '../config.toml'
  import QiaoTree from '../../../components/tree/ZSTree'
  import KalixTreeGrid1 from '../../../components/forum/treeGrid'
  import ClansmanModel from './clansman_model'
  import Message from '../../../common/message'
  import Cache from '../../../common/cache'

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
        } else if (actionType === 'delete') {
          this.$confirm('是否确认删除<' + val.name + '>及其下所有族人信息?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            return this.$http
              .get('/camel/rest/clansmans/deleteOneAndChildrens?id=' + val.id, {})
              .then(res => {
                this.$refs.kalixTreeGrid.getData()
                console.info('----treeData------', res)
              })
          }).then(response => {
            this.$refs.kalixTreeGrid.getData()
          }).catch(() => {
          })
        } else {
          let that = this
          this.$refs.kalixTreeGrid.getKalixDialog('record', (_kalixDialog) => {
            this.kalixDialog = _kalixDialog
            setTimeout(() => {
              this.kalixDialog.$refs.kalixBizDialog.open('添加族人记事', false, this.addFormModel)
              if (typeof (that.kalixDialog.init) === 'function') {
                that.kalixDialog.init(val.id) //  需要传参数，就在dialog里面定义init方法
              }
            }, 20)
          })
        }
      },
      onToolBarClick(btnId) {
        if (btnId === 'refresh') {
          this.$refs.kalixTreeGrid.getData()
        } else {
          this.getAppName(this.flag)
          if (this.flag === 0) {
            Message.warning('请先选择添加族人所属家谱')
            return false
          }
          const DictKey = `${this.generation.toUpperCase()}-KEY`
          if (!Cache.get(DictKey)) {
            this.$http
              .get(QiaoGenerationURL + '/getGenerationForSelect?genealogyId=' + this.flag, {})
              .then(res => {
                if (res.data.totalCount > 0) {
                  Cache.save(DictKey, JSON.stringify(res.data.data))
                  this.openForAdd()
                } else {
                  Message.warning('请先为家谱添加字辈信息')
                  return false
                }
              })
          } else {
            this.openForAdd()
          }
        }
      },
      openForAdd() {
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
      },
      getAppName(index) {
        console.log('--getAppName---', index)
        this.generation = ''
        index = index + ''
        for (let i = 0; i < index.length; i++) {
          let k = parseInt(index[i])
          this.generation += this.jsonMsg[k]
        }
        console.log('--getAppName---', this.generation)
      }
    },
    computed: {
    },
    data() {
      return {
        flag: '',
        treeUrl: '',
        generation: '',
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
          {id: 'record', dialog: 'record'}
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
        postId: '',
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
            type: 'record',
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
          key: 'clansmanId',
          width: '0'
        }, {
          title: '族人姓名',
          key: 'name',
          width: '150'
        }, {
          title: '性别',
          key: 'sex',
          width: '120'
        }, {
          title: '添加时间',
          key: 'creationDate',
          width: '150'
        }],
        jsonMsg: {
          0: 'a',
          1: 'b',
          2: 'c',
          3: 'd',
          4: 'e',
          5: 'f',
          6: 'g',
          7: 'h',
          8: 'i',
          9: 'j'
        },
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
