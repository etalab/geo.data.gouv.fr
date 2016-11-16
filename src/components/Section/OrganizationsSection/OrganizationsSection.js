import React from 'react'
import Facet from '../../Facets/Facet'

const styles = {
  type: {
    fontSize: '1.2em',
    fontWeight: 400,
    marginBottom: '1em',
  },
  group: {
    marginBottom: '1em',
  },
  facets: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}

const OrganizationsSection = ({metrics}) => {
  const organizations = metrics.records.counts.organizations
  const keywords = metrics.records.counts.keywords

  return (
    <div>
      <h2 style={styles.type}>Organization</h2>
      <div style={styles.facets}>
        {
          Object.keys(organizations).map((organization, idx) =>
            <Facet style={{margin: '2px 5px'}} key={idx} value={organization} count={organizations[organization]}/>
          )
      }
      </div>

      <h2 style={styles.type}>Keywords</h2>
      <div style={styles.facets}>
        {
          Object.keys(keywords).map((keyword, idx) =>
            <Facet style={{margin: '2px 5px'}} key={idx} value={keyword} count={keywords[keyword]}/>
          )
        }
      </div>
    </div>
  )
}

export default OrganizationsSection
