import Station from './station.vue'
import StationAdd from './stationAdd.vue'
import StationEdit from './StationEdit.vue'
import StationView from './StationView.vue'

const components = [
  Station,
  StationAdd,
  StationEdit,
  StationView
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}

export default main
