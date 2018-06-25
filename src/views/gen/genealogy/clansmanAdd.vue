<!--
描述：族人-新增
开发人：wangpeng
开发日期：2018年6月19日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="clansman" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="族人姓名" prop="name" label-width="120px" )
        el-input(v-model="formModel.name")
      el-form-item(label="字号" prop="monicker" label-width="120px" )
        el-input(v-model="formModel.monicker")
      el-form-item(label="性别" prop="sex" label-width="120px" )
      el-form-item(label="婚姻状况" prop="matrimony" label-width="120px" )
        el-input(v-model="formModel.matrimony")
      el-form-item(label="排行" prop="sequence" label-width="120px" )
        el-input(v-model="formModel.sequence")
      el-form-item(label="世代" prop="generations" label-width="120px")
        el-input(v-model="formModel.generations")
      el-form-item(label="字辈" prop="gradeid" label-width="120px")
        kalix-select(v-model="formModel.gradeid" v-bind:requestUrl="generationURL"
        v-bind:appName="appName"  placeholder="请选择字辈"
        v-bind:defaultSelect="false" v-on:input="setGroup" label="label" id="value")

</template>

<script type="text/ecmascript-6">
  import FormModel from './clansman_model'
  import {QiaoClansmanURL, QiaoGenerationURL} from '../config.toml'

  export default {
    name: 'clansmanAdd',
    data() {
      return {
        targetURL: QiaoClansmanURL,
        generationUrl: '',
        generation: '',
        formModel: Object.assign({}, FormModel),
        rules: {
          name: [{required: true, message: '请输入名称', trigger: 'blur'}]
        },
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
        labelWidth: '110px'
      }
    },
    created() {
    },
    computed: {
      // 计算属性的 getter
      generationURL: function () {
        // `this` 指向 vm 实例
        return this.generationUrl
      },
      appName: function () {
        return this.generation
      }
    },
    methods: {
      init(flag, fatherId) {
        console.log('====dialogOption====', flag, fatherId)
        this.formModel.fatherid = fatherId
        this.formModel.genealogynameid = flag
        this.generationUrl = QiaoGenerationURL + '/getGenerationForSelect?genealogyId=' + flag
        this.getAppName(flag)
      },
      setGroup(data) {
        console.log('---setGroup--', data)
        // this.formModel.gradeid = data
      },
      getAppName(index) {
        this.generation = ''
        index = index + ''
        for (let i = 0; i < index.length; i++) {
          let k = parseInt(index[i])
          this.generation += this.jsonMsg[k]
        }
        console.log('--getAppName---', this.generation)
      }
    }
  }
</script>
