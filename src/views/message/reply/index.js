import Reply from './reply.vue'
import ReplyAdd from './replyAdd.vue'
import ReplySearch from './replySearch.vue'
import ReplyEdit from './replyEdit.vue'
import ReplyAuditing from './replyAuditing.vue'

const components = [
  Reply,
  ReplyAdd,
  ReplyEdit,
  ReplySearch,
  ReplyAuditing
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}

export default main
