<!--
  描述：form组件的二次封装
  开发人：zhangzhe
  开发日期：2018年6月1日
-->
<template lang="pug">
  el-form(ref="form" v-bind:model="form" label-width="80px")
    el-form-item(label="活动名称")
      el-input(v-model="form.name")
    el-form-item(label="活动区域")
      el-select(v-model="form.region" placeholder="请选择活动区域")
        el-option(label="区域一" value="shanghai")
        el-option(label="区域二" value="beijing")
    el-form-item(label="活动时间")
      el-col(v-bind:span="11")
        el-date-picker(type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;")
      el-col.line(v-bind:span="2") -
      el-col(v-bind:span="11")
        el-time-picker(type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;")
    el-form-item(label="即时配送")
      el-switch(v-model="form.delivery")
    el-form-item(label="活动性质")
      el-checkbox-group(v-model="form.type")
        el-checkbox(label="美食/餐厅线上活动" name="type")
        el-checkbox(label="地推活动" name="type")
        el-checkbox(label="线下主题活动" name="type")
        el-checkbox(label="单纯品牌曝光" name="type")
    el-form-item(label="特殊资源")
      el-radio-group(v-model="form.resource")
        el-radio(label="线上品牌商赞助")
        el-radio(label="线下场地免费")
    el-form-item(label="活动形式")
      el-input(type="textraea" v-model="form.desc")
    el-form-item
      el-button(type="primary" v-on:click="onSubmit") 立即创建
      el-button(type="primary" v-on:click="onReset") 取消
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'qiao-form',
    activated() {
      console.log('orgTree component is activated')
      this.$KalixEventBus.$on('refreshData', this.getData)
    },
    deactivated() {
      console.log('orgTree component is deactivated')
      this.$KalixEventBus.$off('refreshData')
    },
    props: {
      value: null,
      organizationId: {
        default: -1
      }
    },
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      },
      onReset() {
        console.log('Reset!')
      }
    },
    watch: {
      filterText(val) {
        this.$refs.orgTree.filter(val)
      },
      orgId(val) {
        this.targetURL = `/camel/rest/orgs/${this.orgId}/dutys`
      }
    },
    components: {},
    computed: {}

  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .ss
    background-color #FF0000
</style>
