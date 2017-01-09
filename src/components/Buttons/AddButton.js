import React from 'react'
import { add } from './AddButton.css'

const AddButton = ({ text, action, style }) => {
  return <button className={`${add} ${style}`} onClick={() => action()}><i className="plus icon"></i>{text}</button>
}

export default AddButton
