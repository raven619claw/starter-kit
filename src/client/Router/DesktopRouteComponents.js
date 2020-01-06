import React from 'react'
import loadable from '@loadable/component'
import RouteComponentLoader from 'client/CommonComponents/RouteComponentLoader'

export const LoadableListContainer = loadable(
  () => import('client/DesktopContainers/List'),
  {
    fallback: <RouteComponentLoader />
  }
)

export const LoadableHomeContainer = loadable(
  () => import('client/DesktopContainers/Home'),
  {
    fallback: <RouteComponentLoader />
  }
)
