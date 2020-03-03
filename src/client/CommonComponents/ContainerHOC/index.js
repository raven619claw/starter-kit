import React, { useState, useEffect, useRef } from 'react'
import {
  fulfillClientNeeds,
  fulfillClientUnmountNeeds
} from 'client/utils/fulfillClientNeeds'
import { getStore } from 'shared/store'

// not used as of now
// need more handling
const deleteData = async ({ unMountNeeds }) => {
  const store = getStore()
  await fulfillClientUnmountNeeds({
    store,
    unMountNeedItems: unMountNeeds
  })
}
const loadData = async ({ isMounted, setState, needs }) => {
  setState({ loaded: false, isError: false, err: null })
  const store = getStore()
  try {
    await fulfillClientNeeds({
      store,
      needs
    })
    isMounted.current && setState({ loaded: true, isError: false, err: null })
    window.scrollTo(0, 0)
  } catch (error) {
    isMounted.current && setState({ loaded: true, isError: true, err: error })
  }
}
let isServerRendered = true
const deafaultState = {
  loaded: true,
  isError: false,
  err: null
}
export default WrappedComponent => {
  const { needs, unMountNeeds, forceClientNeedsRefetch } = WrappedComponent
  const ContainerHOC = props => {
    const isMounted = useRef(false)
    const [{ loaded, isError, err }, setState] = useState(deafaultState)
    useEffect(() => {
      isMounted.current = true
      ;(!isServerRendered || forceClientNeedsRefetch) &&
        needs &&
        loadData({ isMounted, setState, needs })
      isServerRendered = false
      return () => {
        isMounted.current = false
        unMountNeeds && deleteData({ unMountNeeds })
      }
      // in future only call effect when location object changes
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
