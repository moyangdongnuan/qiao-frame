<!--
描述：族人-新增
开发人：wangpeng
开发日期：2018年6月19日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="location" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="起始城市" prop="" label-width="120px" )
        kalix-font-cascader(:requestUrl="cascaderUrl" appName="location" v-on:change="getStartCity" v-bind:defaultOptions="defaultOptions")
      el-form-item(label="终止城市" prop="" label-width="120px" )
        kalix-font-cascader(:requestUrl="cascaderUrl" appName="location" v-on:change="getEndCity" v-bind:defaultOptions="defaultOptionsTwo")

</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoLocationURL} from '../config.toml'
  import KalixFontCascader from '../../../components/cascader/ThreeCascader'

  export default {
    name: 'QiaoLocationAdd',
    components: {KalixFontCascader},
    data() {
      return {
        targetURL: QiaoLocationURL,
        cascaderUrl: '/camel/rest/districts/getDistrictForLocation',
        defaultOptions: [],
        defaultOptionsTwo: [],
        formModel: Object.assign({}, FormModel),
        rules: {
          name: [{required: true, message: '请输入名称', trigger: 'blur'}]
        }
      }
    },
    created() {
    },
    computed: {
    },
    methods: {
      getStartCity(data) {
        this.formModel.startProvince = data.toString()
        this.formModel.startCity = data[1]
        console.log('---getStartCity--', this.formModel.startProvince, this.formModel.startCity)
      },
      getEndCity(data) {
        this.formModel.endProvince = data.toString()
        this.formModel.endCity = data[1]
        console.log('---getEndCity--', data)
      },
      init(dialogOption) {
        console.log('====dialogOption====', dialogOption)
        this.formModel.genealogyId = dialogOption
      }
    }
  }
</script>
