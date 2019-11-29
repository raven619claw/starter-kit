import parser from 'ua-parser-js'

export default (req, res, next) => {
  req.clientEnv = {
    userAgent: parser(req.headers['user-agent']),
    isRTL: req.query.rtl
  }
  next()
}
