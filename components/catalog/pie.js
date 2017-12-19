import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {Pie} from 'react-chartjs-2'

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

const formatData = (data, t) => {
  const labels = Object.keys(data).sort((a, b) => data[a] < data[b])

  return {
    labels: labels.map(label => t(`details.statistics.pie.${label}`, {
      defaultValue: label
    })),
    datasets: [
      {
        data: labels.map(label => data[label]),
        backgroundColor: colors
      }
    ]
  }
}

export const PieChart = ({data, t}) => {
  const formatedData = formatData(data, t)

  if (formatedData.labels.length < 1) {
    return (
      <div>{t('details.statistics.noData')}</div>
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

PieChart.propTypes = {
  data: PropTypes.object,
  t: PropTypes.func.isRequired
}

PieChart.defaultProps = {
  data: {}
}

export default translate('catalogs')(PieChart)
