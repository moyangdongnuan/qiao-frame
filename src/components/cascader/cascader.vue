<template lang="pug">
  el-cascader(v-bind:options="options" v-model="selectedOptions" style="width:80%;" v-on:change="change")
</template>
<script type="text/ecmascript-6">
  import Cache from '../../common/cache'
  //  import Message from '../message'
  export default {
    name: 'kalix-cascader',
    props: {
      requestUrl: {
        type: String, default: ''
      },
      value: null,
      appName: {
        type: String, default: ''
      },
      disabled: {
        type: Boolean, default: false
      }
    },
    data() {
      return {
        selectedOptions: [],
        initOpt: []
      }
    },
    created() {
      this.initOptions()
    },
    mounted() {
    },
    computed: {
      options: function () {
        // `this` points to the vm instance
        return this.initOpt
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
        this.$emit('getMenuId', value[value.length - 1])
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
