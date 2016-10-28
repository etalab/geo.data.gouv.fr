import React from 'react'
import CircularProgress from '../CircularProgress/CircularProgress'

const Loader = ({component, value}) => {
  const loader =  <CircularProgress size={1} />
  return value ? component : loader
}

export default Loader
