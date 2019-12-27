import {
  LoadableHomeContainer,
  LoadableListContainer
} from 'client/Router/DesktopRouteComponents'

import {
  LoadableHomeMobileContainer,
  LoadableListMobileContainer
} from 'client/Router/MobileRouteComponents'

import { HOME, LIST } from 'shared/constants'

export const routeNames = {
  LIST,
  HOME
}
export const routeMapping = () => ({
  home: {
    desktop: LoadableHomeContainer, // add logic here to render something else based on logics
    mobile: LoadableHomeMobileContainer,
    tablet: LoadableHomeMobileContainer
  },
  list: {
    desktop: LoadableListContainer,
    mobile: LoadableListMobileContainer,
    tablet: LoadableListMobileContainer
  }
})
