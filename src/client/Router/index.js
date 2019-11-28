import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'

const LoadableListContainer = Loadable({
  loader: () =>
    import(/* webpackChunkName: "List" */ 'client/DesktopContainers/List'),
  loading: () => <div>loading...</div>
})

const LoadableHomeContainer = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Home" */ 'client/DesktopContainers/Home'),
  loading: () => <div>loading...</div>
})

export const getComponent = (componentName, deviceType) => {
  switch (componentName) {
    case 'home':
      if (deviceType === 'desktop') {
        return LoadableHomeContainer
      }
      return LoadableHomeContainer
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
    component: LoadableListContainer,
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
