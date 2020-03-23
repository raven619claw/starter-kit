// eslint-disable-next-line global-require
global.DOMParser = new (require('jsdom').JSDOM)().window.DOMParser
require('dotenv').config()
require('full-icu')
import path from 'path'
import express from 'express'
import cors from 'cors'
import manifestHelpers from 'express-manifest-helpers'
import bodyParser from 'body-parser'
import { PORT } from 'config/constants'
import { paths, logMessage } from 'config/helper'
import setupCustomMiddlewares from 'server/middleware'
import setupServerIntl from 'server/service/setupServerIntl'

const app = express()
app.get('/favicon.ico', (req, res) => res.sendStatus(204))
app.use(cors())
app.use(paths.publicPath, express.static(path.join(paths.clientBuild)))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const manifestPath = `${paths.clientBuild}/assetsManifest.json`
app.use(
  manifestHelpers({
    manifestPath,
    cache: false
  })
)
setupCustomMiddlewares(app)
const startAppListen = async () => {
  // setup all intl stuff in this
  // during build it will load the translations from the API and set in JSON
  // and in the renderer use dynamic import to load the translations
  // server loading for translations left to the developer
  await setupServerIntl()
  app.listen(PORT, () => {
    // TODO: remove this logger and use winston
    // eslint-disable-next-line no-console
    logMessage(`App is running: 🚀  http://localhost:${PORT || 8500}`)
  })
}
startAppListen()
