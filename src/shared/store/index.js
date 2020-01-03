import { init } from '@rematch/core'
import { deviceEnvModel, countModel } from './models'

let store = null
let storeCreated = false

const createStore = ({ deviceEnv, count = 0 }) => {
  store = init({
    models: {
      deviceEnv: deviceEnvModel(deviceEnv),
      count: countModel(count)
    }
  })
  storeCreated = true
  return store
}

export default createStore

export const getStore = () => {
  if (storeCreated) {
    return store
  }
  console.error('STORE NOT CREATED YET')
}
