import Genealogy from './genealogy.vue'
import GenealogyAdd from './genealogyAdd.vue'
import GenealogyAddUser from './genealogyAddUser.vue'
import GenealogySearch from './genealogySearch.vue'
import GenealogyView from './genealogyView.vue'
import GenealogyEdit from './genealogyEdit.vue'

const components = [
  Genealogy,
  GenealogyAdd,
  GenealogyAddUser,
  GenealogySearch,
  GenealogyView,
  GenealogyEdit
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
export default main
