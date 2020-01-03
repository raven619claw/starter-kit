import React from 'react'
import loadable from '@loadable/component'

const RouteComponentLoader = <div>loading...</div>

export const LoadableListMobileContainer = loadable(
  () => import('client/MobileContainers/List'),
  {
    fallback: RouteComponentLoader
  }
)

export const LoadableHomeMobileContainer = loadable(
  () => import('client/MobileContainers/Home'),
  {
    fallback: RouteComponentLoader
  }
)
