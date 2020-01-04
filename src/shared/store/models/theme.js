export default initialState => ({
  state: {
    ...initialState
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    updateDeviceTheme(state, payload) {
      return { ...state, ...payload }
    }
  }
})
