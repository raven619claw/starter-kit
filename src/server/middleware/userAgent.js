import parser from 'ua-parser-js'

export default (req, res, next) => {
  req.userAgent = parser(req.headers['user-agent'])
  next()
}
