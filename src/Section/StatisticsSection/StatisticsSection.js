import React from 'react'
import PieChart from '../../Charts/PieChart/PieChart'
import BarChart from '../../Charts/BarChart/BarChart'
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
          <Percent metrics={metrics} label="openness" icon="unlock alternate icon" description="Percentage of open source data." />
        </div>

        <div style={styles.chart}>
          <Percent metrics={metrics} label="download" icon="download" description="Percentage of successfully downloaded data." />
        </div>

        <div style={styles.chart}>
          <PieChart data={metrics.partitions.recordType} title={'Record Type'} description={'Distribution of record types'} />
        </div>

        <div style={styles.chart}>
          <PieChart data={metrics.partitions.metadataType} title={'Metadata Type'} description={'Distribution of metadata types'} />
        </div>

        <div style={styles.column}>
          <div style={styles.chart}>
            <BarChart data={metrics.partitions.dataType} />
          </div>
        </div>
      </div>
    )
}

export default StatisticsSection
