import React from 'react'
import { remove } from './RemoveButton.scss'

const RemoveButton = ({ text, action, style }) => {
  return <button className={`${remove} ${style}`} onClick={() => action()}><i className='trash icon' />{text}</button>
}

export default RemoveButton
