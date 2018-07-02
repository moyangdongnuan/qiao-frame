import Genealogy from './genealogy.vue'
import GenealogyAdd from './genealogyAdd.vue'
import GenealogyAddUser from './genealogyAddUser.vue'
import ClansmanSearch from './clansmanSearch.vue'
import GenealogyView from './genealogyView.vue'
import GenealogyEdit from './genealogyEdit.vue'
import ClansmanAdd from './clansmanAdd.vue'
import ClansmanEdit from './clansmanEdit.vue'
import Generation from './generation.vue'
import Record from './record.vue'

const components = [
  Genealogy,
  GenealogyAdd,
  GenealogyAddUser,
  ClansmanSearch,
  GenealogyView,
  GenealogyEdit,
  ClansmanAdd,
  Generation,
  Record,
  ClansmanEdit
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
export default main
