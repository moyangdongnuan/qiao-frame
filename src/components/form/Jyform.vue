<!--
  描述：form组件的二次封装
  开发人：zhangzhe
  开发日期：2018年6月1日
-->
<template lang="pug">
  el-form(ref="form" v-bind:model="form" label-width="80px")
    div.s-flex
      div.s-flex-item
        el-form-item(label="姓名")
          el-input(v-model="form.name")
      div.s-flex-item
        el-form-item(label="性别")
          el-input(v-model="form.sex")
      div.s-flex-item
        el-form-item(label="婚姻")
      el-select(v-model="form.matrimony" placeholder="请选择活动区域")
        el-option(label="未婚" value="weihun")
        el-option(label="已婚" value="yihun")
        el-option(label="离婚" value="lihun")
        el-option(label="再婚" value="zaihun")
    div.s-flex
      div.s-flex-item
        el-form-item(label="配偶")
          el-input(v-model="form.spouseid")
      div.s-flex-item
        el-form-item(label="父亲")
          el-input(v-model="form.fatherid")
      div.s-flex-item
        el-form-item(label="母亲")
          el-input(v-model="form.motherid")
    div.s-flex
      div.s-flex-item
        el-form-item(label="排行")
          el-select(v-model="form.sequence" placeholder="请选择排行")
            el-option(label="行一" value="hangyi")
            el-option(label="行二" value="hanger")
            el-option(label="行三" value="hangsan")
            el-option(label="行四" value="hangsi")
            el-option(label="行五" value="hangwu")
            el-option(label="行六" value="hangliu")
            el-option(label="行七" value="hangqi")
            el-option(label="行八" value="hangba")
            el-option(label="行九" value="hangjiu")
            el-option(label="行十" value="hangshi")
            el-option(label="行十一" value="hangshiyi")
            el-option(label="行十二" value="hangshier")
            el-option(label="行十三" value="hangshisan")
            el-option(label="行十四" value="hangshisi")
      div.s-flex-item
        el-form-item(label="世代")
          el-select(v-model="form.generations" placeholder="请选择世代")
            el-option(label="***世" value="shi")
      div.s-flex-item
        el-form-item(label="字辈")
          el-select(v-model="form.gradeid" placeholder="请选择字辈")
            el-option(label="***字辈" value="shi")
    div.s-flex
      div.s-flex-item
        el-form-item(label="字号")
          el-input(v-model="form.monicker")
      div.s-flex-item
        el-form-item(label="出生日期")
          el-input(v-model="form.birth")
      div.s-flex-item
        el-form-item(label="纪念日期")
          el-input(v-model="form.time")
    div.s-flex
      div.s-flex-item
        el-form-item(label="体重")
          el-input(v-model="form.weight")
      div.s-flex-item
        el-form-item(label="外貌")
          el-input(v-model="form.appearance")
      div.s-flex-item
        el-form-item(label="身高")
          el-input(v-model="form.stature")
    div.s-flex
      div.s-flex-item
        el-form-item(label="官爵")
          el-select(v-model="form.duty" placeholder="请选择官爵")
            el-option(label="***官爵" value="guanjue")
      div.s-flex-item
        el-form-item(label="荣誉")
          el-input(v-model="form.honor")
      div.s-flex-item
        el-form-item(label="健康情况")
          el-input(v-model="form.health")
    div.s-flex
      div.s-flex-item
        el-form-item(label="教育")
          el-select(v-model="form.education" placeholder="请选择教育")
            el-option(label="***教育" value="jiaoyu")
      div.s-flex-item
        el-form-item(label="姐妹")
          el-input(v-model="form.sistersid")
      div.s-flex-item
        el-form-item(label="兄弟")
          el-input(v-model="form.brothersid")
    div.s-flex
      div.s-flex-item
        el-form-item(label="家庭住址")
          el-input(v-model="form.homeaddress")
      div.s-flex-item
        el-form-item(label="儿女")
          el-input(v-model="form.childrenid")
      div.s-flex-item
        el-form-item(label="爱好")
          el-input(v-model="form.hobby")
    el-form-item(label="纪念地址")
      el-input(v-model="form.site")
    el-form-item()
      el-button(type="primary" v-on:click="onSubmit") 立即创建
      el-button(type="primary" v-on:click="onReset") 重置
      el-button(type="primary" v-on:click="onOpen") 打开
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'qiao-form',
    activated() {
      console.log('orgTree component is activated')
      // this.$KalixEventBus.$on('refreshData', this.getData)
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
      // this.getData()
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      },
      onReset() {
        console.log('Reset!')
      },
      onOpen() {
        console.log('Open!')
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
</style>
