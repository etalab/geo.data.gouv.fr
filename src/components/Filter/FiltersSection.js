import React from 'react'
import { browserHistory } from 'react-router'
import Facet from '../Facets/Facet'

const styles = {
  group: {
    marginBottom: '1em',
  },
  facets: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}

const FiltersSection = ({keywords, organizations, catalogs, style}) => {
  const goToSearch = (filter) => () => browserHistory.push({ pathname: '/records', query: {...filter} })
  const sections = [
    {name: 'organization', title: 'Organisations', filters: organizations},
    {name: 'catalog', title: 'Catalogues', filters: catalogs.map( catalog => catalog.name)},
    {name: 'keyword', title: 'Mots-clés', filters: keywords},
  ]

  return (
    <div style={style.section}>
      {
        sections.map(section => (
          <div key={section.title} style={styles.group}>
            <h3 style={style.title}>{section.title}</h3>
            <div style={styles.facets}>
              {
                section.filters.map((filter, idx) =>
                  <Facet style={{margin: '2px 5px'}} key={idx} value={filter} addFilter={goToSearch({[section.name]: filter})}/>
                )
            }
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default FiltersSection
