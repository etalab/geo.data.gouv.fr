import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {Line} from 'react-chartjs-2'

const formatData = (data, t) => {
  return {
    labels: Object.keys(data).map(item => item),
    datasets: [
      {
        label: t('details.harvests.chart.label'),
        lineTension: 0.2,
        backgroundColor: '#2185D0',
        data: Object.keys(data).map(item => data[item])
      }
    ]
  }
}

const Histogram = ({data, t}) => (
  <Line
    data={formatData(data, t)}
    legend={null}
    options={{
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }}
  />
)

Histogram.propTypes = {
  data: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired
}

export default translate('catalogs')(Histogram)
