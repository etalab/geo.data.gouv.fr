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
      <h3>Catalogs</h3>
      <div style={styles.catalogs}>
        {catalogs.map( (catalog, idx) =>
          <Link key={idx} to={`/catalogs/${catalog}`}>
            {catalog}
          </Link>)}
      </div>
    </div>
      )
}

export default CatalogsSection
