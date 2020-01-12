import React from 'react'
import { Global } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import styleContainer from './styles'
export default () => {
  const theme = useTheme()
  const { style } = styleContainer(theme)
  // for some weird reason this accepts styles prop instead of css
  // https://emotion.sh/docs/globals
  return <Global styles={style} />
}
