import AuditConfig from './auditconfig.vue'
import AuditConfigAdd from './auditconfigAdd.vue'
import AuditConfigEdit from './auditconfigEdit.vue'
import AuditConfigSearch from './auditconfigSearch.vue'
import AuditConfigView from './auditconfigView.vue'

const components = [
  AuditConfig,
  AuditConfigAdd,
  AuditConfigEdit,
  AuditConfigSearch,
  AuditConfigView
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
export default main
