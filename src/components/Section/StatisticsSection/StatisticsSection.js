import React from 'react'
import DoughnutChart from '../../Charts/DoughnutChart/DoughnutChart'
import Chart from '../../Charts/Chart'
import Percent from '../../Statistics/Percent/Percent'

const StatisticsSection = ({metrics}) => {
  const styles = {
    section: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    column:{
      display: 'flex',
      flexDirection: 'column',
    },
    chart: {
      margin: '3em',
    },
  }
    return (
      <div style={styles.section}>
        <div style={styles.chart}>
          <Percent value={metrics.partitions['openness'] ? metrics.partitions['openness'].yes : 0} total={metrics.totalCount} size="large" icon="unlock alternate icon" title="Percentage of open datasets" />
        </div>

        <div style={styles.chart}>
          <Percent value={metrics.partitions['download'] ? metrics.partitions['download'].yes : 0} total={metrics.totalCount} size="large" icon="download" title="Percentage of downloadable datasets" />
        </div>

        <div style={styles.chart}>
          <Chart
            title={'Record Type'}
            description={'Distribution of record types'}
            chart={<DoughnutChart data={metrics.partitions.recordType} />} />
        </div>

        <div style={styles.chart}>
          <Chart
            title={'Metadata Type'}
            description={'Distribution of metadata types'}
            chart={<DoughnutChart data={metrics.partitions.metadataType} />} />
        </div>

        <div style={styles.chart}>
          <Chart
            title={'Data Type'}
            description={'Distribution of data types'}
            chart={<DoughnutChart data={metrics.partitions.dataType} />} />
        </div>

      </div>
    )
}

export default StatisticsSection
