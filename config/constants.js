const env = require('dotenv').config().parsed

// these constants should relate to any config which needs to ne dynamic based on env
// such as endpoints and dev config
module.exports = {
  ...env,
  PROD: process.env.NODE_ENV === 'production',
  DEV: process.env.NODE_ENV !== 'production',
  WATCH: process.env.WATCH,
  HOT_RELOAD: process.env.HOT_RELOAD,
  INSPECT: process.env.INSPECT,
  IGNORE_MODERN: process.env.IGNORE_MODERN
}
