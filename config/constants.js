const env = require('dotenv').config().parsed;

module.exports = {
  ...env,
  PROD: process.env.NODE_ENV === 'production',
  DEV: process.env.NODE_ENV !== 'production',
  WATCH: process.env.WATCH,
  HOT_RELOAD: process.env.HOT_RELOAD,
  INSPECT: process.env.INSPECT
};
