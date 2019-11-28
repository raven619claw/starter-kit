import React from 'react'
import Loadable from 'react-loadable'

const RouteComponentLoader = () => <div>loading...</div>

export const LoadableListMobileContainer = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ListMobile" */ 'client/MobileContainers/List'),
  loading: RouteComponentLoader
})

export const LoadableHomeMobileContainer = Loadable({
  loader: () =>
    import(/* webpackChunkName: "HomeMobile" */ 'client/MobileContainers/Home'),
  loading: RouteComponentLoader
})
