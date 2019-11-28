import React from 'react'
import Loadable from 'react-loadable'

const RouteComponentLoader = () => <div>loading...</div>

export const LoadableListContainer = Loadable({
  loader: () =>
    import(/* webpackChunkName: "List" */ 'client/DesktopContainers/List'),
  loading: RouteComponentLoader
})

export const LoadableHomeContainer = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Home" */ 'client/DesktopContainers/Home'),
  loading: RouteComponentLoader
})
