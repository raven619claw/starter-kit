import { hot } from 'react-hot-loader/root'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'client/hooks/rematchHooks'
import Router from 'client/Router'
import { Link } from 'react-router-dom'
// this might seem counter productive to need two imports to get route urls
// but in long term would help organise and keep single source for route paths
import { routePaths } from 'shared/urlConfig'
import {
  HOME,
  LIST,
  TABLET_THRESHOLD,
  MOBILE_THRESHOLD,
  TABLET,
  MOBILE,
  DESKTOP
} from 'shared/constants'
import parser from 'ua-parser-js'
import Theme from 'client/CommonComponents/Theme'
import { style } from './style'
import './style.scss'

// this is the entry file to the react app
// keeping this as a class compoent for example purposes

const mapDispatchToProps = ({ deviceEnv: { updateDeviceInfo } }) => ({
  updateDeviceInfo
})

const mapStateToProps = ({ deviceEnv: { deviceType } }) => ({
  deviceType
})

const App = () => {
  const { updateDeviceInfo } = useDispatch(mapDispatchToProps)
  const { deviceType } = useSelector(mapStateToProps)
  // memo this
  // can move this to it's own hook but seems over engg.
  // as this won't be used anywhere else
  useEffect(() => {
    const resizeEvent = () => {
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
        // update store
        updateDeviceInfo({ deviceType: updatedDeviceType })
      }
    }
    window.addEventListener('resize', resizeEvent, {
      passive: true
    })
    return () => window.removeEventListener('resize', resizeEvent)
  }, [deviceType, updateDeviceInfo])
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
          <li>
            <Link to="random_link">404 Page</Link>
          </li>
        </ul>
      </nav>
      <Router deviceType={deviceType} />
    </div>
  )
}

export default Theme(hot(App))
