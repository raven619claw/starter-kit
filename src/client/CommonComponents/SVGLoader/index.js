import React, { useState, useEffect } from 'react'
import atob from 'shared/utils/atob'
import axios from 'axios'
import PropTypes from 'prop-types'
import { style } from './style'

// cache this in service worker or something
const imageCache = {}
const SVGLoader = props => {
  const { src, lazyLoad, className, ...propsToAppendToElement } = props
  const [externalSvg, setExternalSvg] = useState(null)
  let isExternalLink = false
  if (src.substr(0, 4) !== 'data') {
    isExternalLink = true
  }
  useEffect(() => {
    const loadSvgIcon = async () => {
      if (imageCache[src]) {
        setExternalSvg(imageCache[src])
      } else {
        const { data } = (await axios.get(src)).data
        imageCache[src] = data
        setExternalSvg(imageCache[src])
      }
    }
    isExternalLink && loadSvgIcon()
  }, [isExternalLink, src])

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
  return (
    <div
      className={className}
      css={style}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...propsToAppendToElement}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

SVGLoader.propTypes = {
  src: PropTypes.string.isRequired,
  lazyLoad: PropTypes.bool,
  className: PropTypes.string,
  svgcss: PropTypes.object
}

SVGLoader.defaultProps = {
  lazyLoad: false,
  className: '',
  svgcss: {}
}

export default SVGLoader
