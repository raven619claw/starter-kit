import { init } from '@rematch/core'

import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory, createMemoryHistory } from 'history'
import { deviceEnvModel, countModel, themeModel } from './models'

const createEnvHistory = url => {
  if (__SERVER__) {
    return createMemoryHistory({
      initialEntries: [url]
    })
  }
  if (__BROWSER__) {
    return createBrowserHistory()
  }
}

let store = null
let storeCreated = false
let history = null
let historyCreated = false
const createStore = ({ deviceEnv, count = 0, theme, url }) => {
  history = createEnvHistory(url)
  const reducers = { router: connectRouter(history) }
  store = init({
    models: {
      deviceEnv: deviceEnvModel(deviceEnv),
      count: countModel(count),
      theme: themeModel(theme)
    },
    redux: {
      reducers,
      middlewares: [routerMiddleware(history)],
      devtoolOptions: {
        disabled: __PROD__
      }
    }
  })
  storeCreated = true
  historyCreated = true
  return store
}

export default createStore

export const getHistory = () => {
  if (historyCreated) {
    return history
  }
  // TODO: add check and node logs here
  console.error('HISTORY NOT CREATED YET')
}

export const getStore = () => {
  if (storeCreated) {
    return store
  }
  // TODO: add check and node logs here
  console.error('STORE NOT CREATED YET')
}
