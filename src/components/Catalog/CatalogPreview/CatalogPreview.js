import React from 'react'
import Counter from '../../Statistics/Counter/Counter'
import Percent from '../../Statistics/Percent/Percent'

const CatalogPreview = ({metrics}) => {
  if (metrics) {
    const styles = {
      container: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      stat: {
        margin: '2em',
      }
    }
    return (
      <div style={styles.container}>
        <Percent style={styles.stat} value={metrics.partitions['openness'] ? metrics.partitions['openness'].yes : 0} total={metrics.totalCount} label="open data" icon="unlock alternate icon" size="small" />
        <Percent style={styles.stat} value={metrics.partitions['download'] ? metrics.partitions['download'].yes : 0} total={metrics.totalCount} label="downloadable" icon="download" size="small" />
        <Counter style={styles.stat} value={metrics.totalCount} size="small" label="Records" />
      </div>
    )
  }
  return <div></div>
}

export default CatalogPreview
