import produce from 'immer'
export default initialState => ({
  state: 0 + initialState, // initial state
  reducers: {
    // handle state changes with pure functions
    increment: produce((draftState, payload) => draftState + payload)
    // USE PRODUCE from immer only when you want to selectively update the state
    // if u want to spread the payload as it is on the old state dont use immer
  },
  effects: dispatch => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      // u can use the dispatch prop to call different reducer
      dispatch.count.increment(payload)
      // if not calling other reducers then use this
      // this.increment(payload)
      // and return effects as an object
    }
  })
})
