import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routeNames, routeMapping } from 'client/Router/RouteMappings'
import { routePaths } from 'shared/urlConfig'
const { HOME, LIST, ERROR404 } = routeNames
export const getComponent = (componentName, deviceType) =>
  routeMapping()[componentName][deviceType] // maybe pass data here to add some logic as wht to render

export const Routes = deviceType => [
  {
    path: routePaths[HOME],
    component: getComponent(HOME, deviceType),
    name: HOME,
    exact: true
  },
  {
    path: routePaths[LIST],
    component: getComponent(LIST, deviceType),
    name: LIST,
    exact: true
  },
  {
    path: routePaths[ERROR404],
    component: getComponent(ERROR404, deviceType),
    name: ERROR404,
    exact: true
  },
  {
    // no path last component on router to handle all rest requests on 404
    component: getComponent(ERROR404, deviceType),
    name: ERROR404,
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
