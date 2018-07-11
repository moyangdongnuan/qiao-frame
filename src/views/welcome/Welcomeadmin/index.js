import Welcomeadmin from './Welcomeadmin.vue'

const components = [
  Welcomeadmin
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}

export default main
