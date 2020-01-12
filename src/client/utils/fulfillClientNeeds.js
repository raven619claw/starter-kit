// handles both the SSR rendered component
// as well as the CSR route changes

// fulfillClientNeeds works the same way fetchComponentData  works in SSR
// has a BROWSER check just to make sure it does not run in SSR
// also handles to endLoadTime for CSR and SSR route handling
// make sure to use isFetching and loaded props from store entity so that it is not run on every route change
// for a perfect reference see SavedHotels/Index container
// because of this now you dont need to call APIs in componentDidMount of that route

export const fulfillClientNeeds = ({ store, needs: needItems = [] }) => {
  if (!__BROWSER__) {
    return new Promise(resolve => {
      resolve()
    })
  }
  const needs = []
  // const globalStore = store.getState()
  if (Object.prototype.toString.call(needItems) === '[object Array]') {
    needs.push(...needItems)
  } else {
    needs.push(needItems)
  }
  const promises = needs.map(need =>
    need({
      store
    })
  )

  return Promise.all(promises)
}
// DEV: this is kinda experimental and not verified.
// do not use
export const fulfillClientUnmountNeeds = ({ store, unMountNeedItems = [] }) => {
  const unMountNeeds = []
  // const globalStore = store.getState()
  if (Object.prototype.toString.call(unMountNeedItems) === '[object Array]') {
    unMountNeeds.push(...unMountNeedItems)
  } else {
    unMountNeeds.push(unMountNeedItems)
  }
  const promises = unMountNeeds.map(unMountNeed =>
    unMountNeed({
      store
    })
  )
  return Promise.all(promises)
}

// this is not used as of now
// just leaving it here for any future case
// this is used instead of the cb in getComponent in routes files
// this will be passed to the getComponent in React Router to handle loading of needs while rendering the component
// The needs of the route container are resolved the same way as in SSR
// to stop if from running in SSR BROWSER check is there
// can pass waitForApi to halt the route render till APIs are resolved
// export const renderComponent = ({ store, module, cb, waitForApi }) => {
// fulfillClientNeeds({  store, needItems: module.default.needs || [] }).then(() => {
// check if env is browser and waitForAPI is there then render only after promise.all resolves
// if (__BROWSER__ && waitForApi) {
// cb(null, module.default);
// }
// Handle catch for this
// });
// can reason as to which should come before the cb or fulfillClientNeeds
// for now fulfillClientNeeds is up as its just async calls
// if on server or if on client dont have to wait for API then call cb
//   if (!__BROWSER__ || !waitForApi) {
//     cb(null, module.default);
//   }
// };

// export default renderComponent;
