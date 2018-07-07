<template lang="pug">
  el-cascader(v-bind:options="options" style="width:100%;" v-on:change="change" v-model="defaultOption")
</template>
<script type="text/ecmascript-6">
  import Cache from '../../common/cache'

  export default {
    name: 'kalix-font-cascader',
    props: {
      requestUrl: { // 查全部请求路径
        type: String, default: '/camel/rest/districts/getDistrictForCascader'
      },
      queryOneUrl: { // 默认选中查询
        type: String, default: ''
      },
      value: null, // 默认选中子菜单id
      appName: { // 缓存name
        type: String, default: 'district'
      },
      disabled: { // 是否可用
        type: Boolean, default: false
      },
      defaultSelect: { // 是否开启默认选中
        type: Boolean, default: false
      },
      defaultOptions: {
        type: Array,
        default() {
          return []
        }
      },
      cascaderType: { // 三级联动所属字段
        type: String, default: ''
      }
    },
    data() {
      return {
        initOpt: [],
        defaultOption: []
      }
    },
    created() {
      this.initOptions() // 加载执行
    },
    mounted() {
    },
    computed: {
      options: function () { // 所有选项集合
        // `this` points to the vm instance
        return this.initOpt
      }
    },
    watch: {
      defaultOptions () {
        console.log('===default==Options==', this.defaultOptions)
        this.defaultOption = this.defaultOptions
      }
    },
    methods: {
      initOptions() {
        const DictKey = `${this.appName.toUpperCase()}-KEY`
        if (!Cache.get(DictKey)) {
          this.$http
            .get(this.requestUrl, {})
            .then(res => {
              this.initOpt = JSON.parse(res.data.data)
              Cache.save(DictKey, JSON.stringify(this.initOpt))
            })
        } else {
          this.initOpt = JSON.parse(Cache.get(DictKey))
        }
      },
      change(value) {
        this.$emit('change', value)
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
