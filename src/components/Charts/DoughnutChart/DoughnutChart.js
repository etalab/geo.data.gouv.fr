import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { Doughnut } from 'react-chartjs-2'

import Percent from '../../Statistics/Percent/Percent'
import { colors } from '../../../tools.js'

import styles from './DoughnutChart.scss'

export function formatData(data, t) {
  const labels = Object.keys(data)
    .sort((a, b) => {
      return data[a] < data[b]
    })

  return {
    labels: labels.map(label => t(`components.DoughnutChart.${label}`)),
    datasets: [
      {
        data: labels.map(label => data[label]),
        backgroundColor: colors.slice(0, labels.length),
      }
    ]
  }
}

export const DoughnutChart = ({ data, t }) => {
  const formatedData = formatData(data || {}, t)

  if (formatedData.labels.length === 0) {
    return <h1>{t('components.DoughnutChart.noData')}</h1>
  }

  if (formatedData.labels.length === 1) {
    return <Percent value={100} total={100} label={formatedData.labels[0]} icon='database icon' size='large' />
  }

  return (
    <div className={styles.container}>
      <Doughnut className='doughnut computer' data={formatedData} width={360} />
    </div>
  )
}

DoughnutChart.propTypes = {
  data: PropTypes.object,
  t: PropTypes.func.isRequired
}

export default translate('Common')(DoughnutChart)
