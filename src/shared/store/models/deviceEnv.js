import { DESKTOP } from 'shared/constants'

export default initialState => ({
  state: {
    deviceType: DESKTOP,
    isRTL: 'false',
    ...initialState
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    updateDeviceInfo(state, payload) {
      return { ...state, ...payload }
    }
  }
})
