import React from 'react'
import { Global } from '@emotion/core'
import style from './styles'
export default () => (
  // for some weird reason this accepts styles prop instead of css
  // https://emotion.sh/docs/globals
  <Global styles={style} />
)
