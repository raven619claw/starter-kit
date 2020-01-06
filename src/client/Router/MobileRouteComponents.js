import loadable from '@loadable/component'
import RouteComponentLoader from 'client/CommonComponents/RouteComponentLoader'

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
