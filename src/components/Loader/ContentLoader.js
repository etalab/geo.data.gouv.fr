import React from 'react'
import CircularProgress from '../CircularProgress/CircularProgress'

const ContentLoader = ({ style = {}, size = 2 }) => {
  return <CircularProgress style={style} size={size} />
}

export default ContentLoader
