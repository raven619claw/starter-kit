import {
  LoadableHomeContainer,
  LoadableListContainer
} from 'client/Router/DesktopRouteComponents'

import {
  LoadableHomeMobileContainer,
  LoadableListMobileContainer
} from 'client/Router/MobileRouteComponents'

import { LoadableError404Container } from 'client/Router/CommonRouteComponents'
import { HOME, LIST, ERROR404 } from 'shared/constants'

export const routeNames = {
  LIST,
  HOME,
  ERROR404
}
export const routeMapping = () => ({
  [HOME]: {
    desktop: LoadableHomeContainer, // add logic here to render something else based on logics
    mobile: LoadableHomeMobileContainer,
    tablet: LoadableHomeMobileContainer
  },
  [LIST]: {
    desktop: LoadableListContainer,
    mobile: LoadableListMobileContainer,
    tablet: LoadableListMobileContainer
  },
  [ERROR404]: {
    desktop: LoadableError404Container,
    mobile: LoadableError404Container,
    tablet: LoadableError404Container
  }
})
