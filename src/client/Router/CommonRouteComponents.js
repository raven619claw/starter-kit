import React from 'react'
import loadable from '@loadable/component'
import RouteComponentLoader from 'client/CommonComponents/RouteComponentLoader'

export const LoadableError404Container = loadable(
  () => import('client/CommonContainers/Error404'),
  {
    fallback: <RouteComponentLoader />
  }
)
