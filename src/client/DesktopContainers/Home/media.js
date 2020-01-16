/* eslint-disable global-require */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import IconLoader from 'client/CommonComponents/SVGLoader'

export const Alert = props => (
  <IconLoader {...props} src={require('assets/svg/alert.svg').default} />
)
export const Test = props => (
  <IconLoader {...props} src={require('assets/svg/test.svg').default} />
)
