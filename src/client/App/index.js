import React, { Component } from 'react'
import Router from 'client/Router'
import { Link } from 'react-router-dom'
import { style } from './styles'
import './index.scss'

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  render() {
    const { deviceType } = this.props
    return (
      <div className="color-red" css={style}>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/list">List</Link>
            </li>
          </ul>
        </nav>
        <Router deviceType={deviceType} />
      </div>
    )
  }
}
