<!--
描述：族人修改
开发人：wangpeng
开发日期：2018年6月20日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="clansman" ref="kalixBizDialog" v-bind:formModel.sync="formModel"  v-bind:targetURL="targetURL")
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
        appName="education"  placeholder="请选择学历"  v-bind:defaultSelectLabel="educationDefaultLabel"
        v-bind:defaultSelect="true" label="label" id="label"  v-bind:paramObj="educationParamObj")
      el-form-item(label="婚姻状况" prop="matrimony" label-width="120px" )
        kalix-select(v-model="formModel.matrimony" v-bind:requestUrl="dictURL"
        appName="matrimony"  placeholder="请选择婚姻状况"  v-bind:defaultSelectLabel="matrimonyDefaultLabel"
        v-bind:defaultSelect="true" label="label" id="label" v-bind:paramObj="matrimonyParamObj")
      el-form-item(label="排行" prop="sequence" label-width="120px" )
        kalix-select(v-model="formModel.sequence" v-bind:requestUrl="dictURL"
        appName="sequence"  placeholder="请选择排行"  v-bind:defaultSelectLabel="sequenceDefaultLabel"
        v-bind:defaultSelect="true" label="label" id="label" v-bind:paramObj="sequenceParamObj")
      el-form-item(label="世代" prop="generations" label-width="120px")
        kalix-select(v-model="formModel.generations" v-bind:requestUrl="dictURL"
        appName="generations"  placeholder="请选择世代"  v-bind:defaultSelectLabel="generationsDefaultLabel"
        v-bind:defaultSelect="true" label="label" id="label" v-bind:paramObj="generationsParamObj")
      el-form-item(label="字辈" prop="gradeid" label-width="120px")
        kalix-select(v-model="formModel.gradeid" v-bind:requestUrl="generationURL"
        v-bind:appName="appName"  placeholder="请选择字辈"
        v-bind:defaultSelect="true" label="label" id="value" v-bind:defaultSelectLabel="gradeIdDefaultLabel")
      el-form-item(label="身高" prop="stature" label-width="120px" )
        el-input(v-model="formModel.stature")
      el-form-item(label="体重" prop="weight" label-width="120px" )
        el-input(v-model="formModel.weight")
      el-form-item(label="官爵" prop="duty" label-width="120px" )
        el-input(v-model="formModel.duty")
      el-form-item(label="健康状况" prop="health" label-width="120px" )
        el-input(v-model="formModel.health")
      el-form-item(label="外貌" prop="appearance" label-width="120px" )
        el-input(v-model="formModel.appearance")
      el-form-item(label="荣誉" prop="honor" label-width="120px" )
        el-input(v-model="formModel.honor")
      el-form-item(label="爱好" prop="hobby" label-width="120px" )
        el-input(v-model="formModel.hobby")
      el-form-item(label="出生日期" prop="birth" label-width="120px" )
        el-date-picker(v-model="formModel.birth")
      el-form-item(label="家庭地址" prop="homeaddress" label-width="120px" )
        kalix-font-cascader(v-on:change="getValue" v-bind:defaultOptions="defaultOptions")
      el-form-item(label="详细地址" prop="detailedAddress" label-width="120px" )
        el-input(v-model="formModel.detailedAddress")
      el-form-item(label="死亡日期" prop="datetime" label-width="120px" )
        el-date-picker(v-model="formModel.datetime")
      el-form-item(label="埋葬地" prop="necropolis" label-width="120px" )
        kalix-font-cascader(v-on:change="getValueTwo" v-bind:defaultOptions="defaultOptionsTwo")
      el-form-item(label="详细地址" prop="necropolisAddress" label-width="120px" )
        el-input(v-model="formModel.necropolisAddress")
      el-form-item(label="图片" prop="imgurl" label-width="120px" )
        kalix-clansman-upload(:action="action" v-on:filePath="getFilePath" :fileList="fileList" fileType="img"
        tipText="只能上传jpg/png文件，且不超过2MB")
      el-form-item(label="视频" prop="videourl" label-width="120px" )
        kalix-clansman-upload(:action="action" v-on:filePath="getVideoFilePath" :fileList="videoFileList" fileType="video"
        tipText="只能上传mp4/avi文件，且不超过2MB")
      el-form-item(label="音频" prop="voiceurl" label-width="120px" )
        kalix-clansman-upload(:action="action" v-on:filePath="getVoiceFilePath" :fileList="voiceFileList" fileType="voice"
        tipText="只能上传mp4/avi文件，且不超过2MB")

</template>

<script type="text/ecmascript-6">
  import {QiaoClansmanURL, QiaoGenerationURL, DictURL, baseURL} from '../config.toml'
  import KalixClansmanUpload from '../../../components/fileUpload/upload'
  import KalixFontCascader from '../../../components/cascader/ThreeCascader'
  export default {
    name: 'ClansmanEdit',
    components: {KalixFontCascader, KalixClansmanUpload},
    data() {
      return {
        action: baseURL + '/camel/rest/upload',
        formModel: Object.assign({}),
        targetURL: QiaoClansmanURL,
        generationUrl: '',
        generation: '',
        fileList: [],
        videoFileList: [],
        voiceFileList: [],
        dictURL: DictURL,
        defaultOptions: [],
        defaultOptionsTwo: [],
        generationsParamObj: {type: '世代'},
        sequenceParamObj: {type: '排行'},
        matrimonyParamObj: {type: '婚姻'},
        educationParamObj: {type: '学历'},
        labelWidth: '110px',
        educationDefaultLabel: '',
        matrimonyDefaultLabel: '',
        sequenceDefaultLabel: '',
        generationsDefaultLabel: '',
        gradeIdDefaultLabel: '',
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
        }
      }
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
      getValue(data) {
        this.formModel.homeaddress = data.toString()
        console.log('---this.data---', data)
      },
      getValueTwo(data) {
        this.formModel.necropolis = data.toString()
        console.log('---this.data---', data)
      },
      change(data) {
        console.log('-- redio --', data)
        this.formModel.sex = data
      },
      getFilePath(filePath, fileName) {
        this.formModel.imgurl = filePath
        this.formModel.imgName = fileName
      },
      getVideoFilePath(filePath, fileName) {
        console.log('--getFilePath---', fileName)
        this.formModel.videourl = filePath
        this.formModel.videoName = fileName
      },
      getVoiceFilePath(filePath, fileName) {
        console.log('--getFilePath---', fileName)
        this.formModel.voiceurl = filePath
        this.formModel.voiceName = fileName
      },
      init(dialogOption) {
        console.log('---dialogOption----', dialogOption)
        this.formModel = dialogOption
        this.generationUrl = QiaoGenerationURL + '/getGenerationForSelect?genealogyId=' + dialogOption.genealogynameid
        this.educationDefaultLabel = dialogOption.education
        this.matrimonyDefaultLabel = dialogOption.matrimony
        this.sequenceDefaultLabel = dialogOption.sequence
        this.generationsDefaultLabel = dialogOption.generations
        this.gradeIdDefaultLabel = dialogOption.gradeid
        console.log('====this.defaultOptionTwo===', this.defaultOptionsTwo)
        if (dialogOption.imgName !== null) {
          let file = {
            name: dialogOption.imgName,
            url: dialogOption.imgurl
          }
          this.fileList.push(file)
        }
        if (dialogOption.videoName !== null) {
          let videoFile = {
            name: dialogOption.videoName,
            url: dialogOption.videourl
          }
          this.videoFileList.push(videoFile)
        }
        if (dialogOption.voiceName !== null) {
          let voiceFile = {
            name: dialogOption.voiceName,
            url: dialogOption.voiceurl
          }
          this.voiceFileList.push(voiceFile)
        }
        this.getAppName(dialogOption.id)
        this.defaultOptions = dialogOption.homeaddress.split(',')
        this.defaultOptionsTwo = dialogOption.necropolis.split(',')
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
