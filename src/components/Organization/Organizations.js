import React from 'react'
import Organization from './Organization'
import { container } from './Organizations.css'

const Organizations = ({ organizations }) => {
  return (
    <div className={container}>
      {organizations.map((organization, idx) => <Organization key={idx} organization={organization} />)}
    </div>
  )
}

export default Organizations
