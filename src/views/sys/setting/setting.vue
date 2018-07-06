<template lang="pug">
  table-station(title="公司信息管理" bizkey="setting" ref="tableStation"  v-bind:targetURL="targetURL"  v-bind:formModel.sync="formModel")
    div.el-form(slot="dialogFormSlot")
      input(v-model="formModel.id" type="hidden")
      el-form-item(label="公司地址" prop="site")
        el-input(v-model="formModel.site")
      el-form-item(label="电话" prop="phone")
        el-input(v-model="formModel.phone")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoSettingURL} from '../config.toml'
  import TableStation from '../../../components/cascader/tableStation'
  export default {
    name: 'kalix-qiao-setting',
    components: {TableStation},
    data() {
      return {
        targetURL: QiaoSettingURL,
        formModel: Object.assign({}, FormModel),
        item: [],
        rules: {
          site: [{required: true, message: '请输入公司地址', trigger: 'blur'}],
          phone: [{required: true, message: '请输入电话', trigger: 'blur'}]
        }
      }
    },
    mounted() {
      this.getData()
    },
    watch: {
      targetURL(oldVal, newVal) {
        console.log('oldVal----------------', oldVal)
        console.log('newVal----------------', newVal)
        this.$confirm('确定要离开吗? 系统可能不会保存您所做的更改！', '提示', {
          confirmButtonText: '离开',
          cancelButtonText: '留下',
          type: 'warning'
        }).then(() => {
          return this.axios.request({
            url: newVal
          })
        }).catch(() => {
        })
      }
    },
    methods: {
      getData() {
        this.axios.request({
          method: 'GET',
          url: `/camel/rest/settings`,
          params: {}
        }).then(res => {
          this.formModel = res.data.data[0]
        })
      },
      init(dialogOption) {
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
