import React from 'react'
import DoughnutChart from '../../Charts/DoughnutChart/DoughnutChart'
import Chart from '../../Charts/Chart'
import Counter from '../../Statistics/Counter/Counter'
import Percent from '../../Statistics/Percent/Percent'

const styles = {
  wrapper: {
    padding: '2em',
  },
  section: {
    display: 'flex',
    justifyContent: 'space-around',
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
    fontSize: '1.2em',
    fontWeight: 400,
    marginBottom: '1em',
  },
}

const StatisticsSection = ({metrics}) => {
return (
  <div style={styles.wrapper}>
    <h2 style={styles.h2}>Indicateurs concernant la totalité du catalogue</h2>
    <div style={styles.section}>

      <div style={styles.chart}>
        <Counter size="large" value={metrics.records.totalCount} title="Enregistrements"/>
      </div>

      <div style={styles.chart}>
        <Chart
          description={'Répartition des types d\'enregistrements'}
          chart={<DoughnutChart data={metrics.records.partitions.recordType} />} />
      </div>

      <div style={styles.chart}>
        <Chart
          description={'Répartition des types de meta donnée'}
          chart={<DoughnutChart data={metrics.records.partitions.metadataType} />} />
      </div>
    </div>

    <h2 style={styles.h2}>Indicateurs concernant les jeux de données</h2>
      <div style={styles.section}>
        <div style={styles.chart}>
          <Percent value={metrics.datasets.partitions['openness'] ? metrics.datasets.partitions['openness'].yes : 0} total={metrics.datasets.totalCount} size="large" icon="unlock alternate icon" title="Pourcentage de données ouvertes" />
        </div>

        <div style={styles.chart}>
          <Percent value={metrics.datasets.partitions['download'] ? metrics.datasets.partitions['download'].yes : 0} total={metrics.datasets.totalCount} size="large" icon="download" title="Pourcentage de jeu de données téléchargeable" />
        </div>

        <div style={styles.chart}>
          <Chart
            description={'Répartition des types de donnée'}
            chart={<DoughnutChart data={metrics.datasets.partitions.dataType} />} />
        </div>
      </div>
    </div>
  )
}

export default StatisticsSection
