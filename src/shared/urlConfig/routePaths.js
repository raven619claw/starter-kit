import { HOME, LIST } from 'shared/constants'

// the routePath names should always be same as the routenames
// all this is done to ensure that one change in shared/constants is needed only for renaming routes
const home = '/'
const list = '/list'
export default {
  [HOME]: home,
  [LIST]: list
}
