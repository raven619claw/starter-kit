import React from 'react'
import loadable from '@loadable/component'

const RouteComponentLoader = <div>loading...</div>

export const LoadableError404Container = loadable(
  () => import('client/CommonContainers/Error404'),
  {
    fallback: RouteComponentLoader
  }
)
