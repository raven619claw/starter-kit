import React, { Component } from 'react'
import Router from 'client/Router'
import { Link } from 'react-router-dom'
// this might seem counter productive to need two imports to get route urls
// but in long term would help organise and keep single source for route paths
import { routePaths } from 'shared/urlConfig'
import { HOME, LIST } from 'shared/constants'
import { style } from './styles'
import './index.scss'

// this is the entry file to the react app
// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  render() {
    const { deviceType } = this.props
    return (
      <div className="color-red" css={style}>
        <nav>
          <ul>
            <li>
              <Link to={routePaths[HOME]}>Home</Link>
            </li>
            <li>
              <Link to={routePaths[LIST]}>List</Link>
            </li>
          </ul>
        </nav>
        <Router deviceType={deviceType} />
      </div>
    )
  }
}
