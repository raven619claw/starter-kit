import React from 'react'
import Loadable from 'react-loadable'

const RouteComponentLoader = ({ pastDelay }) =>
  pastDelay ? <div>loading...</div> : null

export const LoadableListMobileContainer = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "ListMobile" */
      /* webpackPrefetch: true */
      'client/MobileContainers/List'
    ),
  loading: RouteComponentLoader,
  delay: 300
})

export const LoadableHomeMobileContainer = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "HomeMobile" */
      /* webpackPrefetch: true */
      'client/MobileContainers/Home'
    ),
  loading: RouteComponentLoader,
  delay: 300
})
