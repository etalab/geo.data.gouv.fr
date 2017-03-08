import React from 'react'

import { simpleButton } from './Button.css'

const Button = ({ text, action }) => {
  return <button className={simpleButton} onClick={() => action()}>{text}</button>
}

export default Button
