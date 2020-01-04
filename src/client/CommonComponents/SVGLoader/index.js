import React, { useState, useEffect } from 'react'
import atob from 'shared/utils/atob'
import { style } from './style'

export default props => {
  const { src, lazyLoad, ...propsToAppendToElement } = props
  const [externalSvg, setExternalSvg] = useState(null)
  let isExternalLink = false
  if (src.substr(0, 4) !== 'data') {
    isExternalLink = true
  }
  useEffect(() => {
    const loadSvgIcon = async () => {
      // TODO: replace fetch with axios or something
      const blob = await fetch(src)
      const svgElement = await blob.text()
      setExternalSvg(svgElement)
    }
    isExternalLink && loadSvgIcon()
  }, [])

  if ((__SERVER__ && (lazyLoad || isExternalLink)) || !src || !src.match) {
    return null
  }
  let html = ''
  if (__BROWSER__ && isExternalLink) {
    html = externalSvg
  } else {
    const match = src.match(/data:image\/svg[^,]*?(;base64)?,(.*)/)
    if (match) {
      html = match[1] ? atob(match[2]) : decodeURIComponent(match[2])
    }
  }

  if (!html) {
    return null
  }
  // make sure the svg file does not have its own fill or stroke properties
  // otherwise the props will not be overwritten by class
  // dont pass everyprop here only the onclick otherwise they will show up in DOM
  // spread the prop just to include the onClick
  // use propsToAppendToEl to delete any prop you dont want showing in DOM
  // initially the icon will set height width according to its own svg
  // to override and set it to the container then pass matchContainer prop
  // use matchContainer to set both height and width
  // to match only one use heightAuto, widthAuto, matchWidth, matchHeight

  return (
    <div
      css={style}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...propsToAppendToElement}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
