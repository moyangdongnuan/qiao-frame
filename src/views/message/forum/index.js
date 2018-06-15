import Forum from './forum.vue'
import ForumAdd from './forumAdd.vue'
import ForumEdit from './forumEdit.vue'
import ForumSearch from './forumSearch.vue'
import ForumView from './forumView.vue'

const components = [
  Forum,
  ForumAdd,
  ForumEdit,
  ForumSearch,
  ForumView
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}

export default main
