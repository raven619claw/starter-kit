import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomeDesktop from 'client/DesktopContainers/Home'
// import HomeMobile from 'client/MobileContainers/Home'
import List from 'client/DesktopContainers/List'

export const getComponent = (componentName, deviceType) => {
  switch (componentName) {
    case 'home':
      if (deviceType === 'desktop') {
        return HomeDesktop
      }
      return HomeDesktop
  }
}

export const Routes = deviceType => [
  {
    path: '/',
    component: getComponent('home', deviceType),
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
export default ({ deviceType }) => (
  <Switch>
    {Routes(deviceType).map(route => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Route {...route} key={route.name} />
    ))}
  </Switch>
)
