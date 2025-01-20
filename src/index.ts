import './assets/index.css'
import { App } from 'vue'
import RaiDrop from './components/RaiDrop.vue'

export default {
  install(app: App) {
    app.component('RaiDrop', RaiDrop)
  }
}

export { RaiDrop }
