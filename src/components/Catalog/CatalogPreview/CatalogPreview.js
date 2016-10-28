import React from 'react'
import Counter from '../../Statistics/Counter/Counter'
import Percent from '../../Statistics/Percent/Percent'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1em',
  },
}

const CatalogPreview = ({metrics, style}) => {
  if (metrics) {
    return (
      <div style={styles.container}>
        <Percent value={metrics.partitions['openness'] ? metrics.partitions['openness'].yes : 0} total={metrics.totalCount} label="Open data" icon="unlock alternate icon" size="small" />
        <Percent value={metrics.partitions['download'] ? metrics.partitions['download'].yes : 0} total={metrics.totalCount} label="Downloadable" icon="download" size="small" />
        <Counter value={metrics.totalCount} size="small" label="Records" />
      </div>
    )
  }
  return <div></div>
}

export default CatalogPreview
