<template lang="pug">
  div.welcome
    div.title 当前位置
      span &gt;
      b(v-if="name === 'qiao'") 乔氏家谱
      b(v-if="name === 'admin'") 系统应用
    div.head
      ul
        li
          img(src="/static/images/userIcon.jpg")
        li {{username}}  , 欢迎登录乔氏家谱智库后台管理系统！
    div.content
      div.top 常用功能
      div(ref="dialogUL")
        slot(name="dialogULSlot")
    div.foot
      div.top 提示信息
      div.bottom
        p 本程序仅提供使用，任何违法互联网规定行为，自行负责。
        p 程序使用，技术支持请联系管理员
</template>

<script type="text/ecmascript-6">
  import Cache from 'kalix-vue-lib-qiao/src/common/cache'

  export default {
    name: 'Welcome',
    data() {
      return {
        name: null,
        username: this.$KalixCatch.get('user_name')
      }
    },
    mounted() {
      this.fetchData()
    },
    watch: {'$route': 'fetchData'},
    methods: {
      fetchData() {
        if (this.$route.name === 'login' || this.$route.name === 'workflow') {
          return
        }
        this.name = this.$route.params.app || this.name
        this.getDict()
        // console.log(this.$route.params.name);
      },
      getDict() {
        if (this.name) {
          const DictURL = `/camel/rest/${this.name}/dicts`
          const DictKey = `${this.name.toUpperCase()}-DICT-KEY`
          if (!Cache.get(DictKey)) {
            const data = {
              page: 1,
              start: 0,
              limit: 200,
              sort: '[{\'property\': \'value\', \'direction\': \'ASC\'}]'
            }
            this.axios.get(DictURL, {
              params: data
            }).then(response => {
              if (response.data) {
                Cache.save(DictKey, JSON.stringify(response.data.data))
                console.log(`dict cached under key ${DictKey}`, response.data)
              }
            })
          }
        }
      }
    },
    components: {},
    computed: {}
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .welcome
    margin 40px
    .title
      span
        margin-left 10px
      b
        margin-left 10px
        color: #74d3ba
    .head
      border 1px solid #e6e6e6
      margin-top 25px
      padding 15px 25px
      background-color #f5f5f5
      font-weight bold
      li
        display inline-block
    // margin-top -20px
    .content
      // padding 20px
      border 1px solid #e6e6e6
      margin-top 25px
      background-color #f5f5f5
      .top
        background-color #efefef
        padding 5px 30px
        font-weight 600
        border-bottom  1px solid #e6e6e6
      .bottom
        padding 30px
        color #646464
        font-size 14px
        li
          display inline-block
          margin-right 40px
          width 70px
          cursor: pointer
          text-align center
    .foot
      // padding 20px
      border 1px solid #e6e6e6
      margin-top 25px
      background-color #f5f5f5
      .top
        background-color #efefef
        padding 5px 30px
        font-weight 600
        border-bottom  1px solid #e6e6e6
      .bottom
        padding 30px
        color #646464
        font-size 14px
</style>
