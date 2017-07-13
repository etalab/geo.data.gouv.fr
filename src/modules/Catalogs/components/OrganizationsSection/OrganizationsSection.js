import React from 'react'
import { browserHistory } from 'react-router'

import Facet from '../../../../components/Facets/Facet'

import { group, facets } from './OrganizationsSection.scss'

const OrganizationsSection = ({metrics, catalog}) => {
  const { organizations, keywords } = metrics.records.counts

  const goToSearch = (filter) => () => browserHistory.push({ pathname: '/search', query: {...filter, catalog: catalog.name} })
  const sections = [{name: 'organization', title: 'Organisations', filters: organizations}, {name: 'keyword', title: 'Mots-clés', filters: keywords}]

  return (
    <div>
      {
        sections.map(section => (
          <div key={section.title} className={group}>
            <h2>{section.title}</h2>
            <div className={facets}>
              {
                Object.keys(section.filters).map((filter, idx) =>
                  <Facet style={{margin: '2px 5px'}} key={idx} name={section.title} value={filter} addFilter={goToSearch({[section.name]: filter})} count={section.filters[filter]}/>
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
