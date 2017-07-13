import React from 'react'
import {circularProgress} from './CircularProgress.scss'

const CircularProgress = ({style}) => {
  return <div style={style} className={circularProgress}>Chargement...</div>
}

export default CircularProgress
