import React from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { translate } from 'react-i18next'

import Loader from '../loader'

const Pie = dynamic(import('react-chartjs-2').then(m => m.Pie), {
  ssr: false,
  loading: Loader
})

const colors = [
  '#2185D0',
  '#00B5AD',
  '#21BA45',
  '#FBBD08',
  '#A333C8',
  '#e03997',
  '#F2711C',
  '#DB2828',
  '#a5673f',
  '#DDDDDD',
  '#000000'
]

export const formatData = (data, t) => {
  const labels = Object.keys(data).sort((a, b) => data[a] < data[b])

  return {
    labels: labels.map(label => t(`components.DoughnutChart.${label}`, {
      defaultValue: label
    })),
    datasets: [
      {
        data: labels.map(label => data[label]),
        backgroundColor: colors.slice(0, labels.length)
      }
    ]
  }
}

export const Chart = ({ data, t }) => {
  const formatedData = formatData(data || {}, t)

  if (!formatedData.labels.length) {
    return (
      <h1>{t('components.DoughnutChart.noData')}</h1>
    )
  }

  return (
    <Pie
      data={formatedData}
      legend={null}
      options={{
        maintainAspectRatio: false
      }}
    />
  )
}

Chart.propTypes = {
  data: PropTypes.object,
  t: PropTypes.func.isRequired
}

export default translate()(Chart)
