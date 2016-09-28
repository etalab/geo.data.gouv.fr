import React from 'react'
import PieChart from '../../Charts/PieChart/PieChart'
import BarChart from '../../Charts/BarChart/BarChart'
import Percent from '../../Statistics/Percent/Percent'

const StatisticsSection = ({metrics}) => {
  const styles = {
    column: {
      padding: 10,
    },
  }
    return (
      <div className="ui center aligned stackable grid">
        <div style={styles.column} className="four wide column">
          <Percent metrics={metrics} label="openness" icon="unlock alternate icon" description="Percentage of open source data." />
        </div>

        <div style={styles.column} className="four wide column">
          <Percent metrics={metrics} label="download" icon="download" description="Percentage of successfully downloaded data." />
        </div>

        <div style={styles.column} className="four wide column">
          <PieChart data={metrics.partitions.recordType} />
        </div>

        <div style={styles.column} className="eight wide column">
          <BarChart data={metrics.partitions.dataType} />
        </div>
      </div>
    )
}

export default StatisticsSection
