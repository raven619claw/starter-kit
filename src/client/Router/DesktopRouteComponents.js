import React from 'react'
import Loadable from 'react-loadable'

const RouteComponentLoader = ({ pastDelay }) =>
  pastDelay ? <div>loading...</div> : null

export const LoadableListContainer = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "List" */
      /* webpackPrefetch: true */
      'client/DesktopContainers/List'
    ),
  loading: RouteComponentLoader,
  delay: 300
})

export const LoadableHomeContainer = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "Home" */
      /* webpackPrefetch: true */
      'client/DesktopContainers/Home'
    ),
  loading: RouteComponentLoader,
  delay: 300
})
