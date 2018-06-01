import Reply from './reply.vue'
import ReplyAdd from './replyAdd.vue'
import ReplyEdit from './replyEdit.vue'

const components = [
  Reply,
  ReplyAdd,
  ReplyEdit
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}

export default main
