import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const styles = {
  loader: {
    position: 'absolute',
    top: '42%',
    left: '42%',
  }
}
const ContentLoader = ({style=styles.loader, size=2}) => {
  return <CircularProgress style={style} size={size} />
}

export default ContentLoader
