<template lang="pug">
  el-cascader(v-bind:options="options" v-model="selectedOptions" style="width:100%;" v-on:change="change")
</template>
<script type="text/ecmascript-6">
  import Cache from '../../common/cache'

  export default {
    name: 'kalix-cascader',
    props: {
      requestUrl: { // 查全部请求路径
        type: String, default: ''
      },
      queryOneUrl: { // 默认选中查询
        type: String, default: ''
      },
      value: null, // 默认选中子菜单id
      appName: { // 缓存name
        type: String, default: ''
      },
      disabled: { // 是否可用
        type: Boolean, default: false
      },
      defaultSelect: { // 是否开启默认选中
        type: Boolean, default: false
      }
    },
    data() {
      return {
        initOpt: [],
        defaultOptions: []
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
      },
      selectedOptions: function () { // 默认选中选项的value ['101', '201']
        return this.defaultOptions
      }
    },
    methods: {
      initOptions() {
        if (this.defaultSelect) {
          let _data = {
            model_id: this.value
          }
          this.$http
            .get(this.queryOneUrl, {params: _data})
            .then(res => {
              this.defaultOptions = JSON.parse(res.data.data)
            })
        }
        this.defaultOptions = []
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
        this.$emit('getMenuId', value[value.length - 1])
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
