import Function from './function.vue'
import FunctionAdd from './functionAdd.vue'
import FunctionEdit from './functionEdit.vue'

const components = [
  Function,
  FunctionAdd,
  FunctionEdit
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}

export default main
