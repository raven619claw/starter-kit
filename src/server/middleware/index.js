import serverRenderer from 'server/middleware/serverRenderer'
import errorHandler from 'server/middleware/errorHandler'
import userAgent from 'server/middleware/userAgent'

export default app => {
  app.use(userAgent)
  app.use(serverRenderer)
  app.use(errorHandler)
}
