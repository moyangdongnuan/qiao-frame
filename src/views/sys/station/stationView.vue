<template lang="pug">
  kalix-dialog.user-add(title='查看' bizKey="station" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="站长图片" prop="imgurl" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.imgurl" readonly)
      el-form-item(label="站长信息" prop="introduce" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.introduce" readonly)
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'

  export default {
    name: 'QiaoStationView',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '120px'
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
