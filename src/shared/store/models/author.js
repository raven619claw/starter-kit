export default {
  state: {
    firstName: 'John',
    lastName: 'Doe'
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    updateName(state, payload) {
      return { ...state, ...payload }
    }
  }
}
