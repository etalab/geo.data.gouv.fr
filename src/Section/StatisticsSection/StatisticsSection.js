import React from 'react'
import PieChart from '../../Charts/PieChart/PieChart'
import BarChart from '../../Charts/BarChart/BarChart'
import Percent from '../../Statistics/Percent/Percent'

const StatisticsSection = ({metrics}) => {
    return (
      <div className="ui equal width center aligned stackable grid">
        <div className="eight wide column">
          <Percent metrics={metrics} label="openness" icon="users" description="Percentage of open source data." />
        </div>

        <div className="eight wide column">
          <Percent metrics={metrics} label="download" icon="download" description="Percentage of successfully downloaded data." />
        </div>

        <div className="eight wide column">
          <PieChart data={metrics.partitions.recordType} />
        </div>

        <div className="eight wide column">
          <BarChart data={metrics.partitions.dataType} />
        </div>
      </div>
    )
}

export default StatisticsSection
