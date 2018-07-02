<!--
描述：族人-新增
开发人：wangpeng
开发日期：2018年6月19日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="record" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="记录类型" prop="category" label-width="120px" )
        el-input(v-model="formModel.category")
      el-form-item(label="纪念地址" prop="site" label-width="120px" )
        el-input(v-model="formModel.site")
      el-form-item(label="纪念日期" prop="time" label-width="120px" )
        el-date-picker(v-model="formModel.time")
      el-form-item(label="族人纪事描述" prop="chronicle" label-width="120px" )
        el-input(v-model="formModel.chronicle" type="textarea" maxlength="500")



</template>

<script type="text/ecmascript-6">
  import FormModel from './record_model.js'
  import {QiaoRecordURL} from '../config.toml'

  export default {
    name: 'record',
    data() {
      return {
        targetURL: QiaoRecordURL,
        formModel: Object.assign({}, FormModel),
        rules: {
          name: [{required: true, message: '请输入名称', trigger: 'blur'}]
        },
        labelWidth: '110px'
      }
    },
    created() {
    },
    methods: {
      init(clansmanId) {
        console.log('====clansmanId====', clansmanId)
        this.formModel.clansmanId = clansmanId
        this.$http
          .get('/camel/rest/records/getRecordByClansmanId?clansmanId=' + clansmanId, {})
          .then(res => {
            console.log('----getRecordByClansmanId------', res.data.data.length)
            if (res.data.data.length > 0) {
              this.formModel = res.data.data[0]
            }
          })
      }
    }
  }
</script>
