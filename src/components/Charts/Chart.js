import React from 'react'
import { container } from './Chart.css'

const Chart = ({chart, description}) => {
  return (
    <div className={container}>
      <h3>{description}</h3>
      {chart}
    </div>
  )
}

export default Chart
