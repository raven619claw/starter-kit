import { init } from '@rematch/core'
import { deviceEnvModel, countModel, themeModel } from './models'

let store = null
let storeCreated = false

const createStore = ({ deviceEnv, count = 0, theme }) => {
  store = init({
    models: {
      deviceEnv: deviceEnvModel(deviceEnv),
      count: countModel(count),
      theme: themeModel(theme)
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
  // TODO: add check and node logs here
  console.error('STORE NOT CREATED YET')
}
