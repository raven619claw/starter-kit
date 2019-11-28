require('dotenv').config()
import path from 'path'
import express from 'express'
import cors from 'cors'
import manifestHelpers from 'express-manifest-helpers'
import bodyParser from 'body-parser'
import { PORT } from 'config/constants'
import { paths, logMessage } from 'config/helper'
import Loadable from 'react-loadable'
import setupCustomMiddlewares from 'server/middleware'

const app = express()
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
Loadable.preloadAll().then(() => {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    logMessage(`App is running: 🌎 http://localhost:${PORT || 8500}`)
  })
})

export default app
