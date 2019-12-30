import { init } from '@rematch/core'
import { deviceEnvModel, countModel } from './models'

const createStore = ({ deviceEnv, count = 0 }) =>
  init({
    models: {
      deviceEnv: deviceEnvModel(deviceEnv),
      count: countModel(count)
    }
  })
export default createStore
