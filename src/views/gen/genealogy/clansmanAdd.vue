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
        el-radio-group(v-model="formModel.sex" v-on:change="change")
          el-radio(label="男") 男
          el-radio(label="女") 女
      el-form-item(label="学历" prop="education" label-width="120px" )
        kalix-select(v-model="formModel.education" v-bind:requestUrl="dictURL"
        appName="education"  placeholder="请选择学历"
        v-bind:defaultSelect="false" label="label" id="label" v-bind:paramObj="educationParamObj")
      el-form-item(label="婚姻状况" prop="matrimony" label-width="120px" )
        kalix-select(v-model="formModel.matrimony" v-bind:requestUrl="dictURL"
        appName="matrimony"  placeholder="请选择婚姻状况"
        v-bind:defaultSelect="false" label="label" id="label" v-bind:paramObj="matrimonyParamObj")
      el-form-item(label="排行" prop="sequence" label-width="120px" )
        kalix-select(v-model="formModel.sequence" v-bind:requestUrl="dictURL"
        appName="sequence"  placeholder="请选择排行"
        v-bind:defaultSelect="false" label="label" id="label" v-bind:paramObj="sequenceParamObj")
      el-form-item(label="世代" prop="generations" label-width="120px")
        kalix-select(v-model="formModel.generations" v-bind:requestUrl="dictURL"
        appName="generations"  placeholder="请选择世代"
        v-bind:defaultSelect="false" label="label" id="label" v-bind:paramObj="generationsParamObj")
      el-form-item(label="字辈" prop="gradeid" label-width="120px")
        kalix-select(v-model="formModel.gradeid" v-bind:requestUrl="generationURL"
        v-bind:appName="appName"  placeholder="请选择字辈"
        v-bind:defaultSelect="false" label="label" id="value")
      el-form-item(label="图片" prop="imgurl" label-width="120px" )
        kalix-clansman-upload(:action="action" v-on:filePath="getFilePath" fileType="img")
</template>

<script type="text/ecmascript-6">
  import FormModel from './clansman_model'
  import {QiaoClansmanURL, QiaoGenerationURL, DictURL, baseURL} from '../config.toml'
  import ElUploadDrag from 'element-ui/packages/upload/src/upload-dragger'
  import KalixClansmanUpload from '../../../components/fileUpload/upload'

  export default {
    name: 'clansmanAdd',
    components: {KalixClansmanUpload, ElUploadDrag},
    data() {
      return {
        targetURL: QiaoClansmanURL,
        action: baseURL + '/camel/rest/upload', // http://localhost:8181/camel/rest/upload
        generationUrl: '',
        generation: '',
        dictURL: DictURL,
        generationsParamObj: {type: '世代'},
        sequenceParamObj: {type: '排行'},
        matrimonyParamObj: {type: '婚姻'},
        educationParamObj: {type: '学历'},
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
      generationURL: function () {
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
      change(data) {
        console.log('-- redio --', data)
        this.formModel.sex = data
      },
      getFilePath(filePath, fileName) {
        console.log('--getFilePath---', fileName)
        this.formModel.imgurl = filePath
        this.formModel.imgName = fileName
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
