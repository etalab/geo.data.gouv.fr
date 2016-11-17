import React from 'react'
import { browserHistory } from 'react-router'
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

const OrganizationsSection = ({metrics, history, catalog}) => {
  const organizations = metrics.records.counts.organizations
  const keywords = metrics.records.counts.keywords

  const goToSearch = (filter) => () => browserHistory.push({ pathname: '/datasets', query: {...filter, catalog: catalog.name} })
  const sections = [{title: 'Organizations', filters: organizations}, {title: 'Keywords', filters: keywords}]

  return (
    <div>
      {
        sections.map(section => (
          <div key={section.title} style={styles.group}>
            <h2 style={styles.type}>{section.title}</h2>
            <div style={styles.facets}>
              {
                Object.keys(section.filters).map((filter, idx) =>
                  <Facet style={{margin: '2px 5px'}} key={idx} value={filter} addFilter={goToSearch({filter})} count={section.filters[filter]}/>
                )
            }
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default OrganizationsSection
