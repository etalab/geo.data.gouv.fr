import React from 'react'
import DoughnutChart from '../../Charts/DoughnutChart/DoughnutChart'
import Chart from '../../Charts/Chart'
import Percent from '../../Statistics/Percent/Percent'

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
  h2: {
    fontSize: '1.4rem',
  },
}

const StatisticsSection = ({metrics}) => {
return (
  <div>
    <h2 style={styles.h2}>Indicateurs concernant la totalité du catalogue</h2>
    <div style={styles.section}>
      <div style={styles.chart}>
        <Chart
          title={'Record Type'}
          description={'Distribution of record types'}
          chart={<DoughnutChart data={metrics.records.partitions.recordType} />} />
      </div>

      <div style={styles.chart}>
        <Chart
          title={'Metadata Type'}
          description={'Distribution of metadata types'}
          chart={<DoughnutChart data={metrics.records.partitions.metadataType} />} />
      </div>
    </div>

    <h2 style={styles.h2}>Indicateurs concernant les jeux de données</h2>
      <div style={styles.section}>
        <div style={styles.chart}>
          <Percent value={metrics.datasets.partitions['openness'] ? metrics.datasets.partitions['openness'].yes : 0} total={metrics.datasets.totalCount} size="large" icon="unlock alternate icon" title="Percentage of open datasets" />
        </div>

        <div style={styles.chart}>
          <Percent value={metrics.datasets.partitions['download'] ? metrics.datasets.partitions['download'].yes : 0} total={metrics.datasets.totalCount} size="large" icon="download" title="Percentage of downloadable datasets" />
        </div>

        <div style={styles.chart}>
          <Chart
            title={'Data Type'}
            description={'Distribution of data types'}
            chart={<DoughnutChart data={metrics.datasets.partitions.dataType} />} />
        </div>
      </div>
    </div>
  )
}

export default StatisticsSection
