import React from 'react'

import { Doughnut } from 'react-chartjs-2'

import Percent from '../../Statistics/Percent/Percent'
import { colors } from '../../../tools.js'

import { container } from './DoughnutChart.css'

export function formatData(data) {
  const labels = Object.keys(data)
    .sort((a, b) => {
      return data[a] < data[b]
    })

  return {
    labels,
    datasets: [
      {
        data: labels.map(label => data[label]),
        backgroundColor: colors.slice(0, labels.length),
      }
    ]
  }
}

const DoughnutChart = ({ data }) => {
  const formatedData = formatData(data || {})

  if (formatedData.labels.length === 0) {
    return <h1>Aucune donnée</h1>
  }

  if (formatedData.labels.length === 1) {
    return <Percent value={100} total={100} label={formatedData.labels[0]} icon="database icon" size="large" />
  }

  return (
    <div className={container}>
      <Doughnut className="doughnut computer" data={formatedData} width={360} />
    </div>
  )
}

export default DoughnutChart
