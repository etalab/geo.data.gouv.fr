import React from 'react'

import style from './LicenseRule.css'

const LicenseRule = ({ title, rules }) => {
  return (
    <div className={`${style.container} ${style[title]}`}>
      <h5>{title}</h5>
      <ul>
        {rules.map((rule, idx) => <li key={idx}>{rule}</li>)}
      </ul>
    </div>
  )
}

export default LicenseRule
