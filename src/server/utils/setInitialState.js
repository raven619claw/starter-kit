import { getDeviceType } from 'server/utils/renderHelpers'
export default ({ req, theme }) => {
  const { isRTL = false, userAgent } = req.clientEnv
  const deviceType = getDeviceType(userAgent)
  return {
    url: req.url,
    theme,
    count: 1,
    deviceEnv: {
      isRTL,
      deviceType
    }
  }
}
