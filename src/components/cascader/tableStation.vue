<!--
  描述：前台系统管理-站长信息管理
  开发人：sunli
  开发日期：2018年7月3日
-->
<template lang="pug">
    div.kalix-wrapper
      div.kalix-wrapper-hd {{title}}
      div.kalix-wrapper-bd
        div.kalix-table-container
          el-form(ref="dialogForm" v-bind:model="formModel")
            slot(name="dialogFormSlot")
          div.dialog-footer(slot="footer")
            // el-button(v-on:click="onCancelClick") 取消
            el-button(type="primary" v-on:click="submitClick") 提交
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'tableStation',
    props: {
      formModel: { // dialog中的form的数据模型，由父组件传递
        type: Object,
        required: true
      },
      rules: { // form的校验规则
        type: Object
      },
      targetURL: { // 业务数据提交的url,包括add，delete，update
        type: String
      },
      title: { // 标题
        type: String,
        required: true
      },
      submitBefore: { // 提交前执行  submitBefore(baseDialog,function Submit)
        type: Function
      },
      submitAfter: { // 提交后执行  submitBefore(baseDialog)
        type: Function
      },
      submitCustom: { // 自定义提交事件  submitBefore(baseDialog)
        type: Function
      }
    },
    methods: {
      submitClick() {
        if (this.submitCustom && typeof (this.submitCustom) === 'function') {
          this.submitCustom(this)
        } else if (this.submitBefore && typeof (this.submitBefore) === 'function') {
          this.submitBefore(this, () => {
            this.submitAction()
          })
        } else {
          this.submitAction()
        }
      },
      submitAction() { // 提交
        this.$refs.dialogForm.validate((valid) => {
          console.log('valid====================', valid)
          if (valid) {
            this.axios.request({
              method: this.isEdit ? 'PUT' : 'POST',
              url: this.isEdit ? `${this.targetURL}/${this.formModel.id}` : this.targetURL,
              data: this.formModel,
              params: {}
            }).then(response => {
              if (response.data.success) {
                // Message.success(response.data.msg)
                this.visible = false
                this.$alert('提交成功').then(response => {
                  window.location.reload() // 页面加载
                })
              } else {
                this.$alert('提交失败,请重新编辑！')
              }
            })
          } else {
            console.log('==========请检查输入项=======')
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  .kalix-wrapper
    margin 0px
    position absolute
    bottom 20px
    top 20px
    left 20px
    box-sizing border-box
    right 20px
    background-color #ffffff
    .kalix-wrapper-hd
      background-color #a8967d
      color #ffffff
      line-height 44px
      padding 0 15px
      text-align left
    .kalix-wrapper-bd
      .kalix-table-container
        position absolute
        margin 0 12px
        overflow hidden
        bottom 54px
        right 0
        left 0
        top 101px
        text-align left
      .kalix-table-pagination
        position absolute
        text-align left
        padding 8px 12px
        width 100%
        left 0
        bottom 0
        align-items center
        box-sizing border-box
        .btn-wrapper
          padding 2px 0 2px 20px
        .el-button
          .iconfont
            font-size 14px
        .kalix-table-pagination_item
          & + .kalix-table-pagination_item
            margin-left 20px
      .no-list
        position absolute
        left 0
        top 0
        z-index 9
        box-sizing border-box
        border 1px solid #dfe6ec
        height 100%
        width 100%
        color #5e7382
        font-size 14px
        text-align center
        background-color #fff
        display flex
        box-pack center
        justify-content center
        box-align center
        flex-align center
        align-items center
</style>
