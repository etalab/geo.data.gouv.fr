import React from 'react'

import CheckItem from './CheckItem'

import style from './Check.css'

const Check = ({ title, isValid, msg, children }) => {
  return (
    <div className={style.check}>
      <h3><CheckItem name={title} valid={isValid} /></h3>
      <div className={style.content}>
        { msg ? <div>{msg}</div> : null }
        {children}
      </div>
    </div>
  )
}

export default Check
