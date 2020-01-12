import React, { useState, useEffect } from 'react'
import {
  fulfillClientNeeds,
  fulfillClientUnmountNeeds
} from 'client/utils/fulfillClientNeeds'
import { getStore } from 'shared/store'
let isServerRendered = true

// not used as of now
// need more handling
const deleteData = async ({ unMountNeeds }) => {
  const store = getStore()
  await fulfillClientUnmountNeeds({
    store,
    unMountNeedItems: unMountNeeds
  })
}
const loadData = async ({ setState, needs }) => {
  setState({ loaded: false, isError: false, err: null })
  const store = getStore()
  try {
    await fulfillClientNeeds({
      store,
      needs
    })
    setState({ loaded: true, isError: false, err: null })
    window.scrollTo(0, 0)
  } catch (error) {
    setState({ loaded: true, isError: true, err: error })
  }
}

export default WrappedComponent => {
  const { needs, unMountNeeds, forceClientNeedsRefetch } = WrappedComponent
  const ContainerHOC = props => {
    const [{ loaded, isError, err }, setState] = useState({
      loaded: true,
      isError: false,
      err: null
    })
    useEffect(() => {
      ;(!isServerRendered || forceClientNeedsRefetch) &&
        needs &&
        loadData({ setState, needs })
      isServerRendered = false
      return () => unMountNeeds && deleteData({ unMountNeeds })
      // only call effect when location object changes
      // as that is the only time we want the data to auto change
    }, [])

    return (
      <WrappedComponent
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        dataFetched={loaded}
        dataFetchErr={isError}
        dataErrObject={err}
      />
    )
  }

  ContainerHOC.needs = needs
  return ContainerHOC
}
