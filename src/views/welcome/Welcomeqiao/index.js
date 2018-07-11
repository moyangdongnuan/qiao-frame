import Welcomeqiao from './Welcomeqiao.vue'

const components = [
  Welcomeqiao
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}

export default main
