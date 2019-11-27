import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from 'client/DesktopContainers/Home'
import List from 'client/DesktopContainers/List'

export const RoutesDesktop = [
  {
    path: '/',
    component: Home,
    name: 'home',
    exact: true
  },
  {
    path: '/list',
    component: List,
    name: 'list',
    exact: true
  }
]
export default () => (
  <Switch>
    {RoutesDesktop.map(route => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Route {...route} key={route.name} />
    ))}
  </Switch>
)
