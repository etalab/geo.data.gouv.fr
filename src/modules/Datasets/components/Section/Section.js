import React from 'react'

import { section } from './Section.css'

const Section = ({ title, children }) => {
  return (
    <div className={section}>
      <h3>{title}</h3>
      {children}
    </div>
  )
}

export default Section
