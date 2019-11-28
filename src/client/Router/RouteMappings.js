import {
  LoadableHomeContainer,
  LoadableListContainer
} from 'client/Router/DesktopRouteComponents'

import {
  LoadableHomeMobileContainer,
  LoadableListMobileContainer
} from 'client/Router/MobileRouteComponents'

export const routeNames = {
  home: 'home',
  list: 'list'
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
