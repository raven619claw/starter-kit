import React from 'react'
import Loadable from 'react-loadable'

const RouteComponentLoader = () => <div>loading...</div>

export const LoadableListMobileContainer = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "ListMobile" */
      /* webpackMode: "lazy" */
      /* webpackPrefetch: true */
      'client/MobileContainers/List'
    ),
  loading: RouteComponentLoader
})

export const LoadableHomeMobileContainer = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "HomeMobile" */
      /* webpackMode: "lazy" */
      /* webpackPrefetch: true */
      'client/MobileContainers/Home'
    ),
  loading: RouteComponentLoader
})
