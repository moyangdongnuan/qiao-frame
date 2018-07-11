<template lang="pug">
  welcome(ref="welcome")
    div.bottom(slot="dialogULSlot")
      ul
        li
          img(src="/static/images/front.jpg")
          p 前台管理
        li
          img(src="/static/images/column.jpg")
          p 栏目管理
        li
          img(src="/static/images/menu.jpg")
          p 菜单管理
        li
          img(src="/static/images/content.jpg")
          p 内容管理
      ul
        li
          img(src="/static/images/front.jpg")
          p 家谱编修
        li
          img(src="/static/images/column.jpg")
          p 家谱录入
        li
          img(src="/static/images/menu.jpg")
          p 迁徙记录
        li
          img(src="/static/images/content.jpg")
          p 家谱导出
        li
          img(src="/static/images/content.jpg")
          p 地图
      ul
        li
          img(src="/static/images/system.jpg")
          p 系统管理
        li
          img(src="/static/images/dict.jpg")
          p 数据字典
        li
          img(src="/static/images/district.jpg")
          p 地区编码
        li
          img(src="/static/images/station.jpg")
          p 站长信息
        li
          img(src="/static/images/advert.jpg")
          p 广告管理
        li
          img(src="/static/images/blogroll.jpg")
          p 友情链接
        li
          img(src="/static/images/setting.jpg")
          p 公司信息
      ul
        li
          img(src="/static/images/forums.jpg")
          p 论坛管理
        li
          img(src="/static/images/forum.jpg")
          p 留言管理
        li
          img(src="/static/images/reply.jpg")
          p 回复管理
</template>

<script>
    import Welcome from '../../../components/welcome/welcome'
    export default {
      name: 'Welcomeqiao',
      components: {Welcome}
    }
</script>

<style scoped lang="stylus" type="text/stylus">
    ul
      margin-bottom 25px
</style>
