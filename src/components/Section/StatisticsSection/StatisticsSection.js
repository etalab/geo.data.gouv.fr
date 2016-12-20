import React from 'react'
import DoughnutChart from '../../Charts/DoughnutChart/DoughnutChart'
import Chart from '../../Charts/Chart'
import Counter from '../../Statistics/Counter/Counter'
import Percent from '../../Statistics/Percent/Percent'
import { container, section, chart } from './StatisticsSection.css'

const StatisticsSection = ({metrics}) => {
return (
  <div className={container}>
    <h2>Indicateurs concernant la totalité du catalogue</h2>
    <div className={section}>

      <div className={chart}>
        <Counter size="large" value={metrics.records.totalCount} title="Enregistrements"/>
      </div>

      <div className={chart}>
        <Chart
          description={'Répartition des types d\'enregistrements'}
          chart={<DoughnutChart data={metrics.records.partitions.recordType} />} />
      </div>

      <div className={chart}>
        <Chart
          description={'Répartition des types de meta donnée'}
          chart={<DoughnutChart data={metrics.records.partitions.metadataType} />} />
      </div>
    </div>

    <h2>Indicateurs concernant les jeux de données</h2>
      <div className={section}>
        <div className={chart}>
          <Percent value={metrics.datasets.partitions['openness'] ? metrics.datasets.partitions['openness'].yes : 0} total={metrics.datasets.totalCount} size="large" icon="unlock alternate icon" title="Pourcentage de données ouvertes" />
        </div>

        <div className={chart}>
          <Percent value={metrics.datasets.partitions['download'] ? metrics.datasets.partitions['download'].yes : 0} total={metrics.datasets.totalCount} size="large" icon="download" title="Pourcentage de jeu de données téléchargeable" />
        </div>

        <div className={chart}>
          <Chart
            description={'Répartition des types de donnée'}
            chart={<DoughnutChart data={metrics.datasets.partitions.dataType} />} />
        </div>
      </div>
    </div>
  )
}

export default StatisticsSection
