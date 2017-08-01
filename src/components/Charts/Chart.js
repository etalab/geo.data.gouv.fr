import React from 'react'
import { container } from './Chart.scss'

const Chart = ({ chart, description }) => {
  return (
    <div className={container}>
      <h3>{description}</h3>
      {chart}
    </div>
  )
}

export default Chart
