import React from 'react'
import MediaQuery from 'react-responsive'
import DoughnutChart from '../../Charts/DoughnutChart/DoughnutChart'
import { Bar } from 'react-chartjs'
import Chart from '../../Charts/Chart'
import Histogram from '../../Charts/Histogram/Histogram'
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
          <Percent value={metrics.partitions['openness'] ? metrics.partitions['openness'].yes : 0} total={metrics.totalCount} label="open data" icon="unlock alternate icon" description="Percentage of open datasets" />
        </div>

        <div style={styles.chart}>
          <Percent value={metrics.partitions['download'] ? metrics.partitions['download'].yes : 0} total={metrics.totalCount} label="downloadable" icon="download" description="Percentage of downloadable datasets" />
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

        <MediaQuery style={styles.chart} maxWidth={550} >
          <Chart
            title={'Data Type'}
            description={'Distribution of data types'}
            chart={<Histogram chartType={Bar} data={metrics.partitions.dataType} width={260} height={180} />} />
        </MediaQuery>

        <MediaQuery style={styles.chart} minWidth={551}>
          <Chart
            title={'Data Type'}
            description={'Distribution of data types'}
            chart={<Histogram chartType={Bar} data={metrics.partitions.dataType} width={420} height={260} />} />
        </MediaQuery>

      </div>
    )
}

export default StatisticsSection
