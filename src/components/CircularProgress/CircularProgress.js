import React from 'react'
import {circularProgress} from './CircularProgress.css'

const CircularProgress = ({style}) => {
  return <div style={style} className={circularProgress}>Chargement...</div>
}

export default CircularProgress
