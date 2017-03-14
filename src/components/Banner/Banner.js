import React from 'react'

import { banner, warning, error } from './Banner.css'

const Banner = ({ msg, close, status = 'warning' }) => {
  return (
    <div className={`${banner} ${status === 'warning' ? warning : error}`}>
      <i className="warning sign icon"></i>{msg}
      <div onClick={() => close()}><i className="remove icon"></i></div>
    </div>
  )
}

export default Banner
