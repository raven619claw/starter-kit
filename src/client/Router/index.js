import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routeNames, routeMapping } from 'client/Router/RouteMappings'
import { routePaths } from 'shared/urlConfig'

export const getComponent = (componentName, deviceType) =>
  routeMapping()[componentName][deviceType] // maybe pass data here to add some logic as wht to render

export const Routes = deviceType => [
  {
    path: routePaths.home,
    component: getComponent(routeNames.home, deviceType),
    name: routeNames.home,
    exact: true
  },
  {
    path: routePaths.list,
    component: getComponent(routeNames.list, deviceType),
    name: routeNames.list,
    exact: true
  }
]
export default ({ deviceType }) => (
  <Switch>
    {Routes(deviceType).map(route => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Route {...route} key={route.name} />
    ))}
  </Switch>
)
