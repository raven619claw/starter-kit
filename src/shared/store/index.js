import { init } from '@rematch/core'
import * as models from './models'

const createStore = () =>
  init({
    models
  })
export default createStore
