import React from 'react'

import { switcher, slider } from './ToggleSwitch.css'

const ToggleSwitch = ({ action, active = false }) => {
  return (
    <label className={switcher}>
      <input type="checkbox" defaultChecked={active}/>
      <div className={slider} onClick={() => action()}></div>
    </label>
  )
}

export default ToggleSwitch
