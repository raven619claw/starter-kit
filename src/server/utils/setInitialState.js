import { getDeviceType } from 'server/utils/renderHelpers'
export default ({ req }) => {
  const { isRTL = false, userAgent } = req.clientEnv
  const deviceType = getDeviceType(userAgent)
  return {
    count: 1,
    deviceEnv: {
      isRTL,
      deviceType
    }
  }
}
