<template lang="pug">
  table-station(title="站长信息管理组件" bizkey="station" ref="tableStation"  v-bind:formModel.sync="formModel")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="站长图片")
        el-input(v-model="formModel.imgurl")
      el-form-item(label="站长信息")
        mavon-editor(v-model="formModel.introduce")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import TableStation from '../../../components/cascader/tableStation'
  export default {
    name: 'kalix-qiao-station',
    components: {TableStation},
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        item: []
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.axios.request({
          method: 'GET',
          url: `/camel/rest/stations`,
          params: {}
        }).then(res => {
          this.formModel = res.data.data[0]
          console.log('this.formModel:---', this.formModel)
        })
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
