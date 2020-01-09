import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  fulfillClientNeeds,
  fulfillClientUnmountNeeds
} from 'client/utils/fulfillClientNeeds'
import { getStore } from 'shared/store'
let isServerRendered = true
export default WrappedComponent => {
  const { needs, unMountNeeds, forceClientNeedsRefetch } = WrappedComponent
  const ContainerHOC = props => {
    const [{ loaded, isError, err }, setState] = useState({
      loaded: true,
      isError: false,
      err: null
    })
    const location = useLocation()

    useEffect(() => {
      // not used as of now
      // need more handling
      const deleteData = async () => {
        const store = getStore()
        await fulfillClientUnmountNeeds({
          store,
          location,
          unMountNeedItems: unMountNeeds
        })
      }
      const loadData = async () => {
        setState({ loaded: false, isError: false, err: null })
        const store = getStore()
        try {
          await fulfillClientNeeds({
            store,
            location,
            needs
          })
          setState({ loaded: true, isError: false, err: null })
          window.scrollTo(0, 0)
        } catch (error) {
          setState({ loaded: true, isError: true, err: error })
        }
      }
      ;(!isServerRendered || forceClientNeedsRefetch) && needs && loadData()
      isServerRendered = false
      return () => unMountNeeds && deleteData()
      // only call effect when location object changes
      // as that is the only time we want the data to auto change
    }, [location])

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
