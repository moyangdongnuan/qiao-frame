<template lang="pug">
    welcome(ref="welcome")
      div.bottom(slot="dialogULSlot")
        ul()
          li(id="User" v-on:click="jumpClick($event)")
            img(src="/static/images/auth.jpg")
            p 权限管理
          li(id="Orgchart" v-on:click="jumpClick($event)")
            img(src="/static/images/org.jpg")
            p 组织结构
          li(id="Application" v-on:click="jumpClick($event)")
            img(src="/static/images/system.jpg")
            p 系统管理
</template>

<script>
    import Welcome from '../../../components/welcome/welcome'
    export default {
      name: 'Welcomeadmin',
      components: {Welcome},
      data() {
        return {
          Id: ''
        }
      },
      methods: {
        jumpClick(e) {
          // event.target // 是你当前点击的元素
          // e.currentTarget // 是你绑定事件的元素
          this.Id = e.currentTarget.id
          console.log('-----------------jumpClick--e----------', e.currentTarget.id)
          this.$router.push({path: '/admin/' + this.Id})
        }
      }
    }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
