import Location from './location'
import QiaoLocationAdd from './locationAdd'
import QiaoLocationEdit from './locationEdit'

const components = [
  Location,
  QiaoLocationEdit,
  QiaoLocationAdd
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}

export default main
