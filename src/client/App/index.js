import React, { Component } from 'react'
import Router from 'client/Router'
import { Link } from 'react-router-dom'
// this might seem counter productive to need two imports to get route urls
// but in long term would help organise and keep single source for route paths
import { routePaths } from 'shared/urlConfig'
import autobind from 'react-auto-bind'
import {
  HOME,
  LIST,
  TABLET_THRESHOLD,
  MOBILE_THRESHOLD,
  TABLET,
  MOBILE,
  DESKTOP
} from 'shared/constants'
import { connect } from 'react-redux'
import parser from 'ua-parser-js'
import { style } from './style'

import './style.scss'

// this is the entry file to the react app
@connect(
  ({ deviceEnv: { deviceType } }) => ({
    deviceType
  }),
  ({ deviceEnv: { updateDeviceInfo } }) => ({
    updateDeviceInfo
  })
)
class App extends Component {
  constructor(props) {
    super(props)
    autobind(this)
  }

  componentDidMount() {
    const resizeEvent = () => {
      const { deviceType, updateDeviceInfo } = this.props
      const { innerWidth } = window
      let updatedDeviceType =
        parser(window.navigator.userAgent).device.type || DESKTOP
      if (updatedDeviceType === DESKTOP) {
        if (innerWidth <= TABLET_THRESHOLD) {
          updatedDeviceType = TABLET
        }
        if (innerWidth <= MOBILE_THRESHOLD) {
          updatedDeviceType = MOBILE
        }
      }
      if (updatedDeviceType !== deviceType) {
        updateDeviceInfo({ deviceType: updatedDeviceType })
        // update store
      }
    }
    window.removeEventListener('resize', resizeEvent)
    window.addEventListener('resize', resizeEvent, {
      passive: true
    })
  }

  render() {
    const { deviceType } = this.props
    return (
      <div className="color-red" css={style}>
        <nav>
          <ul>
            <li>
              <Link to={routePaths[HOME]}>{HOME}</Link>
            </li>
            <li>
              <Link to={routePaths[LIST]}>{LIST}</Link>
            </li>
          </ul>
        </nav>
        <Router deviceType={deviceType} />
      </div>
    )
  }
}

export default App
