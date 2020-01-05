import { HOME, LIST, ERROR404 } from 'shared/constants'

// the routePath names should always be same as the routenames
// all this is done to ensure that one change in shared/constants is needed only for renaming routes
const home = '/'
const list = '/list'
const error404 = '/404'
export default {
  [HOME]: home,
  [LIST]: list,
  [ERROR404]: error404
}
