import React from 'react'
import './style.scss'
import ContainerHOC from 'client/CommonComponents/ContainerHOC'
import { style } from './style'

const ListContainer = () => (
  <div css={style} className="class1">
    List Desktop
  </div>
)

export default ContainerHOC(ListContainer)
