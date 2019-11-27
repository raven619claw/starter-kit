import React, { Component } from 'react'
import { style } from './styles'
import './index.scss'

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  render() {
    return (
      <div className="color-red" css={style}>
        React
      </div>
    )
  }
}
