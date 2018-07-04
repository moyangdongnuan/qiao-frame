<template lang="pug">
  kalix-dialog.user-add(title='修改' bizKey="content" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
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
    components: {
      KalixFontCascader
    },
    name: 'QiaoLocationEdit',
    data() {
      return {
        targetURL: QiaoLocationURL,
        formModel: Object.assign({}, FormModel),
        cascaderUrl: '/camel/rest/districts/getDistrictForLocation',
        defaultOptions: [],
        defaultOptionsTwo: [],
        rules: {
          title: [{required: true, message: '请输标题', trigger: 'blur'}],
          subtitle: [{required: true, message: '请输次标题', trigger: 'blur'}],
          content: [{required: true, message: '请输内容', trigger: 'blur'}],
          sequence: [{required: true, message: '请输入排序号', trigger: 'blur'}]
        }
      }
    },
    methods: {
      init(dialogOption) {
        console.log('==dialogOption==', dialogOption)
        this.$http
          .get(QiaoLocationURL + '/' + dialogOption, {})
          .then(res => {
            console.log('----treeData------', res)
          })
      },
      getStartCity(data) {
        this.formModel.startProvince = data.toString()
        this.formModel.startCity = data[1]
        console.log('---getStartCity--', this.formModel.startProvince, this.formModel.startCity)
      },
      getEndCity(data) {
        this.formModel.endProvince = data.toString()
        this.formModel.endCity = data[1]
        console.log('---getEndCity--', data)
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
