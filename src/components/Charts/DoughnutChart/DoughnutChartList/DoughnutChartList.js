import React from 'react'
import { container, label } from './DoughnutChartList.scss'

const DoughnutChartList = ({ data }) => {
  const list = data.map((item, idx) =>
    <div key={idx} className={`ui small ${item.colorName} ${label} label`}>
      {item.label}
    </div>)

  return (
    <div className={container}>{list}</div>
  )
}

export default DoughnutChartList
