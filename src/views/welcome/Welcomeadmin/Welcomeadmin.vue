<template lang="pug">
    welcome(ref="welcome")
      div.bottom(slot="dialogULSlot")
        ul()
          li(id="auth" v-on:click="jumpClick")
            img(src="/static/images/auth.jpg")
            p 权限管理
          li(id="org")
            img(src="/static/images/org.jpg")
            p 组织结构
          li(id="system")
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
          id: ''
        }
      },
      methods: {
        jumpClick() {
          this.$router.push({path: '/admin/User'})
          console.log('-----------------jumpClick--id----------')
        }
      }
    }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
