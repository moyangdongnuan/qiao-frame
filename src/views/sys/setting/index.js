import Setting from './setting.vue'

const components = [
  Setting
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}

export default main
