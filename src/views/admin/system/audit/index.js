import Audit from './audit.vue'
import AuditSearch from './auditSearch.vue'
import AuditView from './auditView.vue'

const components = [
  Audit,
  AuditSearch,
  AuditView
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
export default main
