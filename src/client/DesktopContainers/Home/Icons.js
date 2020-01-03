/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import IconLoader from 'client/CommonComponents/SVGLoader'
import SVG from 'assets/svg/alert.svg'
import SVGTest from 'assets/svg/test.svg'

export const Alert = props => <IconLoader {...props} src={SVG} />
export const Test = props => <IconLoader {...props} src={SVGTest} />
