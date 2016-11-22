import React from 'react'
import { Link } from 'react-router'

const CatalogsSection = ({catalogs}) => {
  const styles = {
    downloads: {
      display: 'flex',
      flexDirection: 'column',
    },
    catalogs: {
      display: 'flex',
      flexDirection: 'column',
    }
  }
  return (
    <div style={styles.downloads}>
      <h3>Catalogues</h3>
      <div style={styles.catalogs}>
        {catalogs.map( (catalog, idx) =>
          <Link key={idx} to={`/catalogs/${catalog.id}`}>
            {catalog.name}
          </Link>)}
      </div>
    </div>
      )
}

export default CatalogsSection
