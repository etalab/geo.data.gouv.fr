import React from 'react'
import { Link } from 'react-router'
import { theme } from '../../tools'
import '../Table/Table.css'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: '1em',
    boxShadow: theme.boxShadowZ1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1em',
  },
  data: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1em',
  }
}

const PublishedDatasets = ({ datasets, title, style }) => {
  return (
      <div style={styles.container}>
        <div style={{...style, ...styles.header}}>
          <div>{title}</div>
          <div>{datasets.length}</div>
        </div>
        <div>
          {datasets.map((data, idx) =>
            <div key={idx} style={styles.data}>
              <Link to={`/datasets/${data._id}`}>{data.title}</Link>
              {data.remoteUrl ? <a href={data.remoteUrl} target="blank">Fiche data.gouv.fr</a> : null}
            </div>
          )}
        </div>
      </div>
  )
}

export default PublishedDatasets
