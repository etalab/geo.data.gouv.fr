import React from 'react'
import { browserHistory } from 'react-router'

import Facet from '../../../../components/Facets/Facet'

import { group, facets } from './FiltersSection.css'

const FiltersSection = ({keywords, catalogs}) => {
  const goToSearch = (filter) => () => browserHistory.push({ pathname: '/search', query: {...filter} })
  const sections = [
    {name: 'catalog', title: 'Catalogues', filters: catalogs.map( catalog => catalog.name)},
    {name: 'keyword', title: 'Mots-clés', filters: keywords},
  ]

  return (
    <div>
      {
        sections.map(section => (
          <div key={section.title} className={group}>
            <h3>{section.title}</h3>
            <div className={facets}>
              {
                section.filters.map((filter, idx) =>
                  <Facet key={idx} value={filter} addFilter={goToSearch({[section.name]: filter})}/>
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
