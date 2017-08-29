import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Chart from 'common/components/Chart'
import Percent from 'common/components/Statistics/Percent/Percent'

import withContainer from '../withContainer'
import colors from '../colors'

import styles from './DoughnutChart.scss'

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

export const DoughnutChart = ({ data, t }) => {
  const formatedData = formatData(data || {}, t)

  if (formatedData.labels.length === 0) {
    return (
      <h1>{t('components.DoughnutChart.noData')}</h1>
    )
  }

  if (formatedData.labels.length === 1) {
    return (
      <Percent
        value={100}
        total={100}
        label={formatedData.labels[0]}
        icon='database icon'
        size='large'
      />
    )
  }

  return (
    <div className={styles.container}>
      <Chart
        chartType='Doughnut'
        className='doughnut computer'
        data={formatedData}
        width={360}
      />
    </div>
  )
}

DoughnutChart.propTypes = {
  data: PropTypes.object,
  t: PropTypes.func.isRequired
}

export default withContainer(translate('Common')(DoughnutChart))
